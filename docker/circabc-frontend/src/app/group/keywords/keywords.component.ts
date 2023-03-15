import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import {
  InterestGroup,
  InterestGroupService,
  KeywordsService,
  Node as ModelNode,
  NodesService,
} from 'app/core/generated/circabc';
import { BASE_PATH } from 'app/core/generated/circabc/variables';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { SaveAsService } from 'app/core/save-as.service';
import { SelectableKeyword } from 'app/core/ui-model/index';
import { getSuccessTranslation } from 'app/core/util';

@Component({
  selector: 'cbc-keywords',
  templateUrl: './keywords.component.html',
  preserveWhitespaces: true,
})
export class KeywordsComponent implements OnInit {
  public keywords: SelectableKeyword[] = [];
  public selection: SelectableKeyword[] = [];
  public nodeId!: string;
  public currentIg!: InterestGroup;
  public currentLibrary!: ModelNode;
  public showMultipleDeleteWizard = false;
  public showCreateModal = false;
  public showImportModal = false;
  public selectedKeyword!: SelectableKeyword;
  public loading = false;
  private allSelectedValue = false;
  private basePath!: string;
  public showAddDropdown = false;

  @Output()
  readonly allSelectedChange = new EventEmitter();
  @Input()
  get allSelected() {
    return this.allSelectedValue;
  }
  set allSelected(value: boolean) {
    this.allSelectedValue = value;
    this.allSelectedChange.emit(this.allSelectedValue);
  }

  constructor(
    private keywordsService: KeywordsService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private permEvalService: PermissionEvaluatorService,
    private groupService: InterestGroupService,
    private nodesService: NodesService,
    private saveAsService: SaveAsService,
    @Optional()
    @Inject(BASE_PATH)
    basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  ngOnInit() {
    this.keywords = [];
    this.route.params.subscribe(
      async (params) => await this.loadComponent(params)
    );
  }

  // tslint:disable-next-line:no-any
  private async loadComponent(params: { [key: string]: any }) {
    this.loading = true;
    this.nodeId = params.id;
    if (this.nodeId !== undefined) {
      this.currentIg = await this.groupService
        .getInterestGroup(this.nodeId)
        .toPromise();

      if (this.currentIg.libraryId) {
        this.currentLibrary = await this.nodesService
          .getNode(this.currentIg.libraryId)
          .toPromise();
      }

      this.keywords = await this.keywordsService
        .getKeywordDefinitions(this.nodeId)
        .toPromise();
    } else {
      const res = await this.translateService
        .get('error.keywords.read')
        .toPromise();
      this.uiMessageService.addErrorMessage(res);
    }
    this.loading = false;
  }

  public toggleSelect() {
    if (this.keywords) {
      this.keywords.forEach((keyword: SelectableKeyword) => {
        !this.allSelected
          ? (keyword.selected = true)
          : (keyword.selected = false);
      });
    }
    this.allSelected = !this.allSelected;
    this.remapSelection();
  }

  public toggleSelected(keyword: SelectableKeyword) {
    this.keywords.forEach((keywordTmp) => {
      if (keywordTmp.id === keyword.id) {
        keywordTmp.selected = !keywordTmp.selected;
      }
    });

    this.remapSelection();
  }

  private remapSelection() {
    this.selection = [];

    this.keywords.forEach((keywordTmp) => {
      if (keywordTmp.selected) {
        this.selection.push(keywordTmp);
      }
    });
  }

  public async afterKeywordDeletion(result: ActionEmitterResult) {
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.DELETE_KEYWORD
    ) {
      await this.loadComponent({ id: this.nodeId });
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.DELETE_KEYWORD))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
  }

  public showDeleteAllModal() {
    this.showMultipleDeleteWizard = true;
  }

  public async refreshAfterAllDeletion(result: ActionEmitterResult) {
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.DELETE_ALL
    ) {
      await this.loadComponent({ id: this.nodeId });
      this.selection = [];
      // success message not managed by the action-url.ts patterns,
      // because in that case it appears during creation and not afterwards
      // to make it appear afterwards:
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.DELETE_KEYWORD))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }

    this.showMultipleDeleteWizard = false;
  }

  public async refreshAfterCreation(result: ActionEmitterResult) {
    this.showCreateModal = false;
    this.showImportModal = false;
    await this.loadComponent({ id: this.nodeId });
    // success message not managed by the action-url.ts patterns,
    // because in that case it appears during creation and not afterwards
    // to make it appear afterwards:
    if (
      result.result === ActionResult.SUCCEED &&
      (result.type === ActionType.CREATE_KEYWORD ||
        result.type === ActionType.UPDATE_KEYWORD)
    ) {
      const text = await this.translateService
        .get(
          getSuccessTranslation(
            result.type === ActionType.CREATE_KEYWORD
              ? ActionType.ADD_KEYWORD
              : ActionType.UPDATE_KEYWORD
          )
        )
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
  }

  public showUpdateKeyword(keyword: SelectableKeyword) {
    this.showCreateModal = true;
    this.selectedKeyword = keyword;
  }

  public isLibAdmin(): boolean {
    if (this.currentLibrary) {
      return this.permEvalService.isLibAdmin(this.currentLibrary);
    }
    return false;
  }

  public bulkDownload() {
    const url = `${this.basePath}/groups/${this.currentIg.id}/keywords/bulk`;
    const name = `Keywords.${this.currentIg.name}.xls`;
    this.saveAsService.saveUrlAs(url, name);
  }
}
