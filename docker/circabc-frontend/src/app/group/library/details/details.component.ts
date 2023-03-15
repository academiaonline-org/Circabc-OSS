import { I18nSelectPipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import { AresBridgeHelperService } from 'app/core/ares-bridge-helper.service';
import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import {
  ContentService,
  DynamicPropertiesService,
  DynamicPropertyDefinition,
  GuardsService,
  KeywordDefinition,
  KeywordsService,
  Node as ModelNode,
  NodesService,
  NotificationService,
  PagedNodes,
  SpaceService,
  TopicService,
  Translations,
  User,
  Version,
} from 'app/core/generated/circabc';
import {
  InterestGroup,
  OfficeEditResult,
} from 'app/core/generated/circabc/model/models';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { OfficeService } from 'app/core/office.service';
import { SaveAsService } from 'app/core/save-as.service';
import { Quote } from 'app/core/ui-model/index';
import {
  getErrorTranslation,
  getSuccessTranslation,
  isContentPreviewable,
} from 'app/core/util';
import { ClipboardService } from 'app/group/library/clipboard/clipboard.service';
import { ListingOptions } from 'app/group/listing-options/listing-options';
import { I18nPipe } from 'app/shared/pipes/i18n.pipe';
import { environment } from 'environments/environment';

@Component({
  selector: 'cbc-node-properties',
  templateUrl: './details.component.html',
  styleUrls: ['./details-component.scss'],
  preserveWhitespaces: true,
})
export class DetailsComponent implements OnInit {
  public node!: ModelNode;
  public nodeId!: string;
  public versionLabel!: string;
  public versions!: Version[];
  public keywords!: KeywordDefinition[];
  public topics: ModelNode[] = [];
  public translationSet!: Translations;
  public showUpdateWizard!: boolean;
  public currentGroup!: ModelNode;
  public group!: InterestGroup;
  public dynamicPropertiesModel: DynamicPropertyDefinition[] = [];
  public comments!: PagedNodes;
  public currentTopic!: ModelNode;
  public futureQuote!: Quote;
  public editPost!: ModelNode;
  public showCreateTopic = false;
  public currentDeletedTopic: ModelNode | undefined;
  public currentEditedTopic: ModelNode | undefined;
  public showDeleteTopic = false;
  public showEditTopic = false;
  public showEnableMultilingualModal = false;
  public restrictedMode = true;
  public destinationId = '';
  public step = 'metadata';
  public folderSize = 0;

  public listingCommentOptions: ListingOptions = {
    page: 1,
    limit: 10,
    sort: '',
  };

  public commentPages: number[] = [];
  public totalCommentItems = 10;

  // for document preview
  public showPreview = false;
  public contentURL!: string;
  public previewDocumentId!: string;
  private dummyPreviewUrlChange = false;

  public user!: User;

  // history modal
  public historyShowModal = false;
  public processing = false;
  public checkinShowModal = false;
  public cancelCheckoutShowModal = false;
  public loading = false;
  public hasMoreVersions = false;
  public itemToClipboard: string | undefined;
  public officeEditResult: OfficeEditResult[] = [];
  private isAresBridgeEnabled = false;

  public constructor(
    private nodesService: NodesService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private contentService: ContentService,
    private loginService: LoginService,
    private permEvalService: PermissionEvaluatorService,
    private uiMessageService: UiMessageService,
    private keywordService: KeywordsService,
    private dynamicPropertiesService: DynamicPropertiesService,
    private topicService: TopicService,
    private clipboardService: ClipboardService,
    private officeService: OfficeService,
    private location: Location,
    private notificationService: NotificationService,
    private saveAsService: SaveAsService,
    private i18nPipe: I18nPipe,
    private i18nSelectPipe: I18nSelectPipe,
    private guardsService: GuardsService,
    private aresBridgeHelperService: AresBridgeHelperService,
    private spaceService: SpaceService
  ) {}

  public ngOnInit() {
    this.ngInit();
  }

  private ngInit() {
    this.route.data.subscribe(async (value: Data) => {
      this.group = value.group;
      if (this.group.id) {
        this.isAresBridgeEnabled = await this.aresBridgeHelperService.isAresBridgeEnabled(
          this.group.id
        );
      }
    });
    this.route.params.subscribe(async (params) => {
      await this.loadGroup(params);
      await this.loadNode(params);

      this.route.queryParams.subscribe((queryParams) => {
        if (
          queryParams.download &&
          queryParams.download === 'true' &&
          this.node.name
        ) {
          this.saveAsService.saveAs(this.nodeId, this.node.name);
        }
      });
    });

    if (this.user === undefined) {
      this.user = this.loginService.getUser();
    }
  }

  public async loadGroup(params: { [key: string]: string }) {
    this.loading = true;
    const id = params.id;
    if (id) {
      this.currentGroup = await this.nodesService.getNode(id).toPromise();
    }
    this.loading = false;
  }

  public async loadNode(params: { [key: string]: string }) {
    this.loading = true;
    this.nodeId = params.nodeId;
    this.versionLabel = params.versionLabel;

    this.versions = await this.contentService
      .getFirstVersions(this.nodeId)
      .toPromise();

    this.verifyMoreVersions();

    if (this.versionLabel !== undefined && !this.isLastVersionOfContent()) {
      for (const version of this.versions) {
        if (version.versionLabel === this.versionLabel) {
          if (version.node) {
            this.node = version.node;
          }
        }
      }
    } else {
      this.node = await this.nodesService.getNode(this.nodeId).toPromise();
    }

    await this.verifyParentAccess();

    if (
      this.node.properties &&
      this.node.properties.multilingual === 'true' &&
      this.node.id
    ) {
      this.translationSet = await this.contentService
        .getTranslations(this.node.id)
        .toPromise();
    }

    if (
      this.node.type &&
      this.node.type.indexOf('folder') === -1 &&
      this.node.id &&
      this.currentGroup.id
    ) {
      await this.loadKeywords(this.node.id);
      await this.loadDynamicPropertiesModel(this.currentGroup.id);
      await this.loadTopics(this.node.id);
    }

    this.extractDestinationId();

    this.officeEditResult = await this.officeService.canEdit([
      this.node.id as string,
    ]);

    if (
      this.node.properties !== undefined &&
      this.officeEditResult !== undefined &&
      this.officeEditResult.length > 0 &&
      this.officeEditResult[0].canEdit
    ) {
      this.node.properties.webDavLocation = this.officeEditResult[0]
        .documentLocation as string;
    }

    this.loading = false;
  }

  private async verifyParentAccess() {
    if (this.node.parentId) {
      try {
        const authorization = await this.guardsService
          .getGuardAccess(this.node.parentId)
          .toPromise();
        if (authorization === null || authorization === undefined) {
          this.restrictedMode = true;
        } else if (
          authorization !== undefined &&
          authorization.granted !== undefined
        ) {
          this.restrictedMode = !authorization.granted;
        }
      } catch (error) {
        if (error.status === 403) {
          this.restrictedMode = true;
        }
      }
    }
  }

  private verifyMoreVersions() {
    if (
      this.versions.length === 10 &&
      this.versions[9].versionLabel !== '1.0'
    ) {
      this.hasMoreVersions = true;
    }
  }

  public async loadAllVersions() {
    this.loading = true;
    this.versions = await this.contentService
      .getVersions(this.nodeId)
      .toPromise();

    this.verifyMoreVersions();
    this.loading = false;
  }

  public extractDestinationId() {
    this.destinationId = '';

    if (
      this.node.type &&
      this.node.type.indexOf('filelink') !== -1 &&
      this.node.properties
    ) {
      this.destinationId = this.getDestinationId(
        this.node.properties.destination
      );
    }
  }

  public async loadKeywords(id: string) {
    this.keywords = await this.keywordService.getKeywords(id).toPromise();
  }

  public async loadDynamicPropertiesModel(id: string) {
    this.dynamicPropertiesModel = await this.dynamicPropertiesService
      .getDynamicPropertyDefinitions(id)
      .toPromise();
  }

  public async loadTopics(id: string) {
    const emptyNodesArray: ModelNode[] = [];
    this.comments = { data: emptyNodesArray, total: 0 };
    this.topics = await this.contentService.getTopics(id).toPromise();
    if (this.topics.length > 0) {
      await this.loadTopic(this.topics[0].id as string);
    }
  }

  public async loadTopic(id: string | undefined) {
    if (id === undefined) {
      return;
    }
    for (const topic of this.topics) {
      if (topic.id === id) {
        this.currentTopic = topic;
      }
    }

    this.comments = await this.topicService
      .getReplies(
        id,
        this.listingCommentOptions.limit,
        this.listingCommentOptions.page,
        this.listingCommentOptions.sort
      )
      .toPromise();
  }

  public async onKeywordRemoved() {
    await this.loadKeywords(this.node.id as string);
  }

  public isLastVersionOfContent(): boolean {
    let result = false;

    if (this.versionLabel === undefined) {
      result = true;
    } else if (this.versionLabel !== undefined && this.versions !== undefined) {
      if (this.versionLabel === this.versions[0].versionLabel) {
        result = true;
      }
    }

    return result;
  }

  public async onDeletedElement(result: ActionEmitterResult) {
    if (
      result.result === ActionResult.SUCCEED &&
      (result.type === ActionType.DELETE_SPACE ||
        result.type === ActionType.DELETE_CONTENT)
    ) {
      const text = await this.translateService
        .get(getSuccessTranslation(result.type))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
      if (result.node) {
        this.clipboardService.removeItem(result.node);
      }
      if (this.versionLabel === undefined) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['../../', this.node.parentId], {
          relativeTo: this.route,
        });
      } else {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['../../../', this.node.parentId], {
          relativeTo: this.route,
        });
      }
    } else if (
      result.result === ActionResult.FAILED &&
      (result.type === ActionType.DELETE_SPACE ||
        result.type === ActionType.DELETE_CONTENT)
    ) {
      const text = await this.translateService
        .get(getErrorTranslation(result.type))
        .toPromise();
      if (text) {
        this.uiMessageService.addErrorMessage(text, false);
      }
    }
  }

  public isFile(): boolean {
    let result = false;
    if (this.node !== undefined && this.node.type !== undefined) {
      result = this.node.type.indexOf('folder') === -1;
    }
    return result;
  }

  public async onCloseUpdateWizard(result: ActionEmitterResult) {
    this.showUpdateWizard = false;
    this.ngInit();
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.UPDATE_FILE_CONTENT
    ) {
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.UPDATE_FILE_CONTENT))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
  }

  public async onKeywordAdded(res: ActionEmitterResult) {
    if (res.result === ActionResult.SUCCEED) {
      await this.loadKeywords(this.node.id as string);
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.ADD_KEYWORD))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
  }

  public get currentLang(): string {
    return this.translateService.currentLang;
  }
  public isLibManageOwnOrHigher(): boolean {
    return this.permEvalService.isLibManageOwnOrHigher(this.node);
  }

  public getPageTitle() {
    if (this.isLink()) {
      return 'label.library.details.of.url';
    } else if (this.isFile()) {
      return 'label.library.details.of.document';
    } else {
      return 'label.library.details.of.folder';
    }
  }

  public isContent(): boolean {
    if (this.node !== undefined && this.node.type) {
      return (
        this.node.type.indexOf('folder') === -1 &&
        !this.isLibraryLink(this.node)
      );
    } else {
      return false;
    }
  }

  public isFolder(node: ModelNode): boolean {
    if (node !== undefined && node.type) {
      return node.type.indexOf('folder') !== -1 && !this.isLibraryLink(node);
    } else {
      return false;
    }
  }

  public isLink(): boolean {
    if (this.node !== undefined && this.node.type && this.node.properties) {
      return this.node.properties.isUrl === 'true';
    } else {
      return false;
    }
  }

  getDestinationId(destination: string): string {
    const destinationPart = destination.split('/');
    if (destinationPart.length === 4) {
      return destinationPart[3];
    } else {
      return '';
    }
  }

  private isNodeTypeOf(
    node: ModelNode,
    item: 'filelink' | 'folderlink'
  ): boolean {
    if (node !== undefined && node.type) {
      return node.type.indexOf(item) !== -1;
    } else {
      return false;
    }
  }

  isLibraryLink(node: ModelNode): boolean {
    return this.isNodeTypeOf(node, 'filelink');
  }

  isSharedSpaceLink(node: ModelNode): boolean {
    return this.isNodeTypeOf(node, 'folderlink');
  }

  public async refreshComments(_result: ActionEmitterResult) {
    await this.loadTopic(this.currentTopic.id as string);
  }

  public async refreshCreateTopic(res: ActionEmitterResult) {
    if (
      res.result === ActionResult.SUCCEED &&
      res.type === ActionType.CREATE_TOPIC
    ) {
      await this.loadTopics(this.node.id as string);
    }
    this.showCreateTopic = false;
  }

  public async refreshDeleteTopic(res: ActionEmitterResult) {
    if (
      res.result === ActionResult.SUCCEED &&
      res.type === ActionType.DELETE_TOPIC
    ) {
      await this.loadTopics(this.node.id as string);
      this.showDeleteTopic = false;
    } else if (
      res.result === ActionResult.FAILED &&
      res.type === ActionType.DELETE_TOPIC
    ) {
      await this.loadTopic(this.currentTopic.id as string);
    } else if (
      res.result === ActionResult.CANCELED &&
      res.type === ActionType.DELETE_TOPIC
    ) {
      this.showDeleteTopic = false;
    }
  }

  public prepareQuote(post: Quote) {
    this.futureQuote = post;
  }

  public prepareEdit(post: ModelNode) {
    this.editPost = post;
  }

  public prepareDeletion(topic: ModelNode) {
    this.currentDeletedTopic = topic;
    this.showDeleteTopic = true;
  }

  public async previousCommentPage() {
    if (this.canPreviousCommentPage()) {
      if (this.listingCommentOptions.page > 1) {
        this.listingCommentOptions.page = this.listingCommentOptions.page - 1;
        await this.loadTopic(this.currentTopic.id as string);
      }
    }
  }

  public async nextCommentPage() {
    if (this.canNextCommentPage()) {
      if (
        this.listingCommentOptions.page <
        Math.floor(
          this.totalCommentItems / this.listingCommentOptions.limit + 1
        )
      ) {
        this.listingCommentOptions.page = this.listingCommentOptions.page + 1;
        await this.loadTopic(this.currentTopic.id as string);
      }
    }
  }

  public async changeCommentPage(p: number) {
    this.listingCommentOptions.page = p;
    await this.loadTopic(this.currentTopic.id as string);
  }

  public getCommentPages(): number[] {
    const result: number[] = [];

    for (
      let i = 1;
      i < this.totalCommentItems / this.listingCommentOptions.limit + 1;
      i += 1
    ) {
      result.push(i);
    }

    return result;
  }

  public hasComments(): boolean {
    let result = false;

    if (this.comments && this.comments.total) {
      if (this.comments.total > 0) {
        result = true;
      }
    }
    return result;
  }

  public hasTopics(): boolean {
    if (this.topics) {
      return this.topics.length > 0;
    }
    return false;
  }

  public isLibAdmin(): boolean {
    return this.permEvalService.isLibAdmin(this.node);
  }

  public isAccess(): boolean {
    return this.permEvalService.isLibAccess(this.node);
  }

  public isLibFullEdit(): boolean {
    return this.permEvalService.isLibFullEdit(this.node);
  }

  public async takeOwnership() {
    try {
      await this.nodesService.putOwnership(this.nodeId).toPromise();
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.TAKE_OWNERSHIP))
        .toPromise();
      this.uiMessageService.addSuccessMessage(text, true);
    } catch (error) {
      const text = await this.translateService
        .get(getErrorTranslation(ActionType.TAKE_OWNERSHIP))
        .toPromise();
      this.uiMessageService.addErrorMessage(text, true);
    }
  }

  public isLocked(): boolean {
    return (
      this.node !== undefined &&
      this.node.properties !== undefined &&
      this.node.properties.locked === 'true'
    );
  }

  public isWorkingCopy(): boolean {
    return (
      this.node !== undefined &&
      this.node.properties !== undefined &&
      this.node.properties.workingCopy === 'true'
    );
  }

  public currentUserHasAccess(): boolean {
    return (
      this.node !== undefined &&
      this.node.properties !== undefined &&
      this.node.properties.currentUserHasAccess === 'true'
    );
  }

  public async checkout() {
    this.processing = true;

    if (this.node.id !== undefined) {
      await this.contentService.postCheckout(this.node.id).toPromise();
      this.route.params.subscribe(
        async (params) => await this.loadNode(params)
      );
    }

    this.processing = false;
  }

  public async cancelCheckout() {
    this.processing = true;

    if (this.node.id !== undefined && this.node.properties !== undefined) {
      await this.contentService
        .deleteCheckout(this.node.properties.originalNodeId)
        .toPromise();
      // tslint:disable-next-line:no-floating-promises
      this.router.navigate(
        [`../../${this.node.properties.originalNodeId}/details`],
        { relativeTo: this.route }
      );
    }

    this.processing = false;
  }

  public async checkinDone() {
    if (this.node.id !== undefined && this.node.properties !== undefined) {
      // tslint:disable-next-line:no-floating-promises
      this.router.navigate(
        [`../../${this.node.properties.originalNodeId}/details`],
        { relativeTo: this.route }
      );
    }
  }

  public addToClipboard() {
    this.clipboardService.addItem(this.node, true, this.group.id);
    this.itemToClipboard = this.node.name;
  }

  public async emailMe() {
    let text: string;
    try {
      if (this.node.id !== undefined) {
        const status = await this.contentService
          .postContentEmail(this.node.id)
          .toPromise();
        if (!status.result) {
          text = await this.translateService
            .get(getErrorTranslation(ActionType.EMAIL_CONTENT), {
              content: this.node.name,
              name: `${this.user.firstname} ${this.user.lastname}`,
              email: this.user.email,
            })
            .toPromise();
          this.uiMessageService.addErrorMessage(text);
          return;
        }
        text = await this.translateService
          .get(getSuccessTranslation(ActionType.EMAIL_CONTENT), {
            content: this.node.name,
            name: `${this.user.firstname} ${this.user.lastname}`,
            email: this.user.email,
          })
          .toPromise();
        this.uiMessageService.addSuccessMessage(text);
      } else {
        text = await this.translateService
          .get(getErrorTranslation(ActionType.EMAIL_CONTENT), {
            content: this.node.name,
            name: `${this.user.firstname} ${this.user.lastname}`,
            email: this.user.email,
          })
          .toPromise();
        this.uiMessageService.addErrorMessage(text);
      }
    } catch (error) {
      text = await this.translateService
        .get(getErrorTranslation(ActionType.EMAIL_CONTENT), {
          content: this.node.name,
          name: `${this.user.firstname} ${this.user.lastname}`,
          email: this.user.email,
        })
        .toPromise();
      const jsonError = JSON.parse(error._body);
      if (jsonError) {
        this.uiMessageService.addErrorMessage(
          `${text} -> ${jsonError.message as string}`
        );
      }
    }
  }

  public isPublic() {
    return (
      this.node.properties !== undefined &&
      (this.node.properties.security_ranking === undefined ||
        this.node.properties.security_ranking === 'PUBLIC')
    );
  }

  public isMultiLingual(): boolean {
    if (this.node && this.node.properties) {
      return (
        this.node.properties.multilingual === 'true' &&
        this.translationSet !== undefined
      );
    }

    return false;
  }

  public async onCloseMakeMultiModal(result: ActionEmitterResult) {
    this.showEnableMultilingualModal = false;
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.ENABLE_MULTILINGUAL
    ) {
      this.ngInit();
    }
  }

  public canEditInOffice() {
    return (
      this.node.properties !== undefined &&
      this.node.properties.webDavLocation !== undefined
    );
  }

  public openDocInOffice() {
    if (
      this.node.properties !== undefined &&
      this.node.properties.webDavLocation !== undefined
    ) {
      this.officeService.openDocument(this.node.properties.webDavLocation);
    }
  }

  public getDocumentUrl(): string {
    if (
      this.node.properties !== undefined &&
      this.node.properties.webDavLocation !== undefined
    ) {
      return this.officeService.getDocumentUrl(
        this.node.properties.webDavLocation
      );
    }
    return '';
  }

  get securityRanking(): string {
    if (this.node.properties) {
      return this.node.properties.security_ranking;
    } else {
      return '';
    }
  }

  get size(): string | null {
    if (this.node.properties) {
      return this.node.properties.size;
    } else {
      return null;
    }
  }

  get locale(): string {
    if (this.node.properties) {
      return this.node.properties.locale;
    } else {
      return '';
    }
  }
  get mimetypeName(): string {
    if (this.node.properties) {
      return this.node.properties.mimetypeName;
    } else {
      return '';
    }
  }
  get created(): string | null {
    if (this.node.properties) {
      return this.node.properties.created;
    } else {
      return null;
    }
  }

  get modified(): string | null {
    if (this.node.properties) {
      return this.node.properties.modified;
    } else {
      return null;
    }
  }
  get modifier(): string {
    if (this.node.properties) {
      return this.node.properties.modifier;
    } else {
      return '';
    }
  }
  get creator(): string {
    if (this.node.properties) {
      return this.node.properties.creator;
    } else {
      return '';
    }
  }
  get author(): string {
    if (this.node.properties) {
      return this.node.properties.author;
    } else {
      return '';
    }
  }

  get url(): string {
    if (this.node.properties) {
      return this.node.properties.url;
    } else {
      return '';
    }
  }

  get encoding(): string {
    if (this.node.properties) {
      return this.node.properties.encoding;
    } else {
      return '';
    }
  }

  get status(): string {
    if (this.node.properties) {
      return this.node.properties.status;
    } else {
      return '';
    }
  }

  get reference(): string {
    if (this.node.properties) {
      return this.node.properties.reference;
    } else {
      return '';
    }
  }
  get nodeVersionLabel(): string {
    if (this.node.properties) {
      return this.node.properties.versionLabel;
    } else {
      return '';
    }
  }
  get issueDate(): string | null {
    if (this.node.properties) {
      return this.node.properties.issue_date;
    } else {
      return null;
    }
  }
  get expirationDate(): string | null {
    if (this.node.properties) {
      return this.node.properties.expiration_date;
    } else {
      return null;
    }
  }

  get saveNumber(): string | null {
    return this.getRepositoriesInfoProperty('property_save_number=');
  }

  get registrationNumber(): string | null {
    return this.getRepositoriesInfoProperty('property_registration_number=');
  }

  private getRepositoriesInfoProperty(
    propertyName: 'property_registration_number=' | 'property_save_number='
  ): string | null {
    let result: string | null = null;
    if (this.node.properties && this.node.properties.repositoriesInfo) {
      const repositoriesInfo: string = this.node.properties.repositoriesInfo;
      let startIndex = repositoriesInfo.indexOf(propertyName);
      if (startIndex > -1) {
        startIndex += propertyName.length;
        const endIndex = repositoriesInfo.indexOf(',', startIndex);
        if (endIndex > -1) {
          result = repositoriesInfo.substring(startIndex, endIndex);
        }
      }
    }
    return result;
  }

  public isDateField(dpd: DynamicPropertyDefinition): boolean {
    return dpd.propertyType === 'DATE_FIELD';
  }

  public isSelectionField(dpd: DynamicPropertyDefinition): boolean {
    return (
      dpd.propertyType === 'SELECTION' || dpd.propertyType === 'MULTI_SELECTION'
    );
  }

  public getIndex(dpd: DynamicPropertyDefinition): number {
    return dpd.index as number;
  }

  public endsWithDetails(): boolean {
    return window.location.href.endsWith('details');
  }
  get workingCopyId(): string {
    if (this.node.properties) {
      return this.node.properties.workingCopyId;
    } else {
      return '';
    }
  }
  get isNotItemToClipboardUndefined(): boolean {
    return this.itemToClipboard !== undefined;
  }

  public isVersion() {
    return (
      this.node.properties !== undefined &&
      this.node.properties.isVersion === 'true'
    );
  }

  public getVersionModifier(version: Version): string {
    if (version.node && version.node.properties) {
      return version.node.properties.modifier;
    } else {
      return '';
    }
  }

  public getVersionModifed(version: Version): string | null {
    if (version.node && version.node.properties) {
      return version.node.properties.modified;
    } else {
      return null;
    }
  }

  get isNotFolder(): boolean {
    if (this.node.type) {
      return this.node.type.indexOf('folder') === -1;
    } else {
      return true;
    }
  }
  get pivotId(): string | null {
    if (this.translationSet.pivot && this.translationSet.pivot.id) {
      return this.translationSet.pivot.id;
    } else {
      return null;
    }
  }

  get title(): string {
    if (this.node && this.node.title) {
      const title = this.i18nPipe.transform(this.node.title);
      if (title !== '') {
        return title;
      } else {
        return this.i18nSelectPipe.transform('en', this.node.title);
      }
    }
    return '';
  }

  get description(): string {
    if (this.node && this.node.description) {
      const description = this.i18nPipe.transform(this.node.description);
      if (description !== '') {
        return description;
      } else {
        return this.i18nSelectPipe.transform('en', this.node.description);
      }
    }

    return '';
  }

  public prepareEdition(topic: ModelNode) {
    this.currentEditedTopic = topic;
    this.showEditTopic = true;
  }

  public async refreshEditTopic(res: ActionEmitterResult) {
    if (
      res.result === ActionResult.SUCCEED &&
      res.type === ActionType.EDIT_TOPIC
    ) {
      await this.loadTopics(this.node.id as string);
      this.showEditTopic = false;
    } else if (
      res.result === ActionResult.FAILED &&
      res.type === ActionType.EDIT_TOPIC
    ) {
      await this.loadTopic(this.currentTopic.id as string);
    } else if (
      res.result === ActionResult.CANCELED &&
      res.type === ActionType.EDIT_TOPIC
    ) {
      this.showEditTopic = false;
    }
  }

  public canPreviousCommentPage() {
    return this.listingCommentOptions.page > 1;
  }

  public canNextCommentPage() {
    return (
      this.listingCommentOptions.page <
      Math.ceil(this.totalCommentItems / this.listingCommentOptions.limit)
    );
  }

  public humanReadableSelectionDynProp(value: string): string {
    // only if [..., ...] - in case of an array
    if (value && value.indexOf('[') !== -1 && value.indexOf(']') !== -1) {
      let result: string = value.substring(1);
      result = result.substring(0, result.length - 1);
      const parts = result.split(',');
      result = '';
      let i = 0;
      for (const part of parts) {
        const itemString = part.substring(1, part.length - 1);
        result = `${itemString}${i === 0 ? '' : ', '}${result}`;
        i = 1;
      }
      return result;
    } else if (value) {
      return value;
    } else {
      return '';
    }
  }

  public urlLength(): number {
    return (this.router.url.match(/\//g) || []).length;
  }

  public goBack() {
    this.location.back();
  }

  public async backToContainer() {
    if (
      this.node &&
      this.node.properties &&
      this.node.properties.originalContainerId
    ) {
      if (this.urlLength() === 5 && !this.restrictedMode) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(
          ['../../', this.node.properties.originalContainerId],
          {
            relativeTo: this.route,
            queryParams: {
              p: sessionStorage.getItem('libraryPage'),
              n: sessionStorage.getItem('libraryLimit'),
              s: sessionStorage.getItem('librarySort'),
            },
          }
        );
      } else if (this.urlLength() === 5 && this.restrictedMode) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['../../', this.group.libraryId], {
          relativeTo: this.route,
          queryParams: {
            p: sessionStorage.getItem('libraryPage'),
            n: sessionStorage.getItem('libraryLimit'),
            s: sessionStorage.getItem('librarySort'),
          },
        });
      } else if (this.urlLength() === 6 && !this.restrictedMode) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(
          ['../../../', this.node.properties.originalContainerId],
          {
            relativeTo: this.route,
            queryParams: {
              p: sessionStorage.getItem('libraryPage'),
              n: sessionStorage.getItem('libraryLimit'),
              s: sessionStorage.getItem('librarySort'),
            },
          }
        );
      } else if (this.urlLength() === 6 && this.restrictedMode) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['../../../', this.group.libraryId], {
          relativeTo: this.route,
          queryParams: {
            p: sessionStorage.getItem('libraryPage'),
            n: sessionStorage.getItem('libraryLimit'),
            s: sessionStorage.getItem('librarySort'),
          },
        });
      }
    }
  }

  public isPreviewable(): boolean {
    return isContentPreviewable(this.node);
  }

  public previewContent() {
    this.dummyPreviewUrlChange = !this.dummyPreviewUrlChange;
    // tslint:disable-next-line:max-line-length
    this.contentURL = `${
      environment.serverURL
    }pdfRendition?documentId=workspace://SpacesStore/${
      this.node.id
    }&response=content&ticket=${this.loginService.getTicket()}&dummy=${
      this.dummyPreviewUrlChange
    }`;
    this.previewDocumentId = this.node.id as string;
    this.showPreview = true;
  }

  public closePreview() {
    this.showPreview = false;
  }

  public async changeNotificationSubscription(value: string) {
    if (value && value !== '' && this.node.id) {
      try {
        await this.notificationService
          .putNotificationAuthority(
            this.node.id,
            this.loginService.getCurrentUsername(),
            value
          )
          .toPromise();
        this.node = await this.nodesService.getNode(this.node.id).toPromise();
      } catch (error) {
        const text = await this.translateService
          .get(getErrorTranslation(ActionType.CHANGE_SUBSCRIPTION))
          .toPromise();
        this.uiMessageService.addErrorMessage(text);
      }
    }
  }

  isSubscribedToNotifications(): boolean {
    return this.node.notifications === 'ALLOWED';
  }

  public isGuest() {
    return this.loginService.isGuest();
  }

  public isCurrentOwner() {
    if (this.node && this.node.properties) {
      return this.node.properties.owner === this.user.userId;
    } else {
      return false;
    }
  }

  public canSendToAresBridge() {
    if (!this.isAresBridgeEnabled) {
      return false;
    }
    if (!environment.aresBridgeEnabled) {
      return false;
    }
    if (environment.circabcRelease !== 'oss') {
      return this.isLibManageOwnOrHigher();
    } else {
      return false;
    }
  }

  public async sendToAresBridge() {
    this.aresBridgeHelperService.sendToAresBridge(this.node);
  }

  public async getFolderSize(folderId: string | undefined) {
    if (folderId === undefined) {
      this.folderSize = 0;
    } else {
      const result = await this.spaceService
        .getFolderSize(folderId)
        .toPromise();
      if (result.code !== undefined) {
        this.folderSize = result.code;
      }
    }
  }
}
