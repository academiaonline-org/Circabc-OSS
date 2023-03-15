import { ListingOptions } from 'app/group/listing-options/listing-options';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import {
  ColumnOptions,
  InterestGroup,
  Node as ModelNode,
  NodesService,
  PagedNodes,
  PreferenceConfiguration,
  SpaceService,
  User,
  UserService,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getSuccessTranslation } from 'app/core/util';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'cbc-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  preserveWhitespaces: true,
})
export class LibraryComponent implements OnInit {
  public group!: InterestGroup;
  public node!: ModelNode;
  public nodeIsFolder = true;
  public nodeIsFile = false;
  public nodeId!: string;
  public listingOptions: ListingOptions = {
    page: 1,
    limit: 10,
    sort: 'modified_DESC',
  };

  public columnOptions: ColumnOptions = {
    name: true,
    version: true,
    modification: true,
    creation: false,
    size: true,
    expiration: true,
    status: false,
    description: false,
    author: false,
  };

  public preferences: PreferenceConfiguration = {
    library: {
      column: this.columnOptions,
      listing: this.listingOptions,
    },
  };

  // tslint:disable-next-line:no-magic-numbers
  public pages: number[] = [];
  public loading = true;
  public ready = false;
  public treeView = false;
  public restrictedMode = false;
  public currentContents!: PagedNodes;

  public clipboardOpen = false;
  public amountOfItemsInClipboard = 0;
  public resetPage = false;

  private user!: User;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService,
    private nodesService: NodesService,
    private uiMessageService: UiMessageService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private permEvalService: PermissionEvaluatorService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  public async ngOnInit() {
    if (this.user === undefined) {
      this.user = this.loginService.getUser();
    }

    const cookieListing = this.loadListingConfiguration();
    if (cookieListing && this.preferences.library) {
      this.preferences.library.listing = cookieListing;
    }

    // first load column per cookie, then from the user account
    const cookieColumn = this.loadColumnConfiguration();
    if (cookieColumn && this.preferences.library) {
      this.preferences.library.column = cookieColumn;
    }

    if (!(cookieColumn || cookieListing)) {
      await this.loadUserPreferences();
    }

    this.route.queryParams.subscribe((params) => {
      if (params.p) {
        try {
          if (Number(params.p) > 0) {
            this.preferences.library.listing.page = Number(params.p);
          } else {
            this.preferences.library.listing.page = 1;
          }
        } catch (error) {
          this.preferences.library.listing.page = 1;
        }
      }

      if (params.n) {
        try {
          if (Number(params.n) > 0 || Number(params.n) === -1) {
            this.preferences.library.listing.limit = Number(params.n);
          } else {
            this.preferences.library.listing.limit = 10;
          }
        } catch (error) {
          this.preferences.library.listing.limit = 10;
        }
      }

      if (params.s) {
        this.preferences.library.listing.sort = params.s;
      }
    });

    this.treeView = localStorage.getItem('showTreeView') === 'true';
    this.route.data.subscribe((value: Data) => {
      this.group = value.group;
      if (this.group.permissions.library === 'LibNoAccess') {
        this.restrictedMode = true;
      }
    });

    this.route.params.subscribe(
      async (params) => await this.loadComponent(params)
    );
  }

  private async loadComponent(params: { [key: string]: string }) {
    this.loading = true;
    this.nodeId = params.nodeId;
    if (this.nodeId) {
      if (!this.restrictedMode || this.nodeId !== this.group.libraryId) {
        this.node = await this.nodesService.getNode(this.nodeId).toPromise();
      } else if (this.nodeId === this.group.libraryId) {
        this.node = {
          id: this.group.libraryId,
          parentId: this.group.id,
          name: 'Library',
          permissions: {
            LibNoAccess: 'ALLOWED',
          },
        };
      }

      await this.loadContent();
    } else {
      const res = await this.translateService
        .get('error.library.read')
        .toPromise();
      this.uiMessageService.addErrorMessage(res);
    }
    this.loading = false;
    this.ready = true;
  }

  public async refresh(result: ActionEmitterResult) {
    if (result.result === ActionResult.SUCCEED) {
      if (result.type === ActionType.UPLOAD_FILE) {
        const res = await this.translateService
          .get(getSuccessTranslation(ActionType.UPLOAD_FILE))
          .toPromise();
        this.uiMessageService.addSuccessMessage(res, true);
      }
    }
    await this.loadContent();
  }

  public async loadContent() {
    this.loading = true;
    try {
      sessionStorage.setItem(
        'libraryPage',
        `${this.preferences.library.listing.page}`
      );
      sessionStorage.setItem(
        'libraryLimit',
        `${this.preferences.library.listing.limit}`
      );
      sessionStorage.setItem(
        'librarySort',
        `${this.preferences.library.listing.sort}`
      );

      // get only folders
      if (!this.restrictedMode) {
        this.currentContents = await this.spaceService
          .getChildren(
            this.nodeId,
            this.translateService.currentLang,
            false,
            this.preferences.library.listing.limit,
            this.preferences.library.listing.page,
            this.preferences.library.listing.sort,
            false,
            false
          )
          .toPromise();
      } else {
        const contents = await this.spaceService
          .getRestrictedChildren(
            this.nodeId,
            this.translateService.currentLang,
            false,
            -1,
            this.preferences.library.listing.page,
            this.preferences.library.listing.sort,
            false,
            false
          )
          .toPromise();

        const listOfFolderIds = [];
        for (const content of contents.data) {
          if (this.isFolder(content)) {
            listOfFolderIds.push(content.id);
          }
        }

        this.currentContents = { data: [], total: 0 };

        for (const content of contents.data) {
          if (
            (this.isFile(content) &&
              (content.parentId === this.nodeId ||
                listOfFolderIds.indexOf(content.parentId) === -1)) ||
            (this.isFolder(content) &&
              listOfFolderIds.indexOf(content.parentId) === -1)
          ) {
            this.currentContents.data.push(content);
            this.currentContents.total = this.currentContents.total + 1;
          }
        }
      }
    } catch (error) {
      this.currentContents = { data: [], total: 0 };
    }
    this.loading = false;
  }

  public changePage(page: number) {
    this.preferences.library.listing.page = page;
    this.refreshInternal();
  }

  private refreshInternal() {
    // the navigate triggers the refresh of the page, not needing to call loadContent() again
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        p: this.preferences.library.listing.page,
        n: this.preferences.library.listing.limit,
        sort: this.preferences.library.listing.sort,
      },
    });
  }

  public changeListing(listingOptions: ListingOptions) {
    this.preferences.library.listing = listingOptions;
    this.saveListing(listingOptions);
    this.refreshInternal();
  }

  public isGroupAdmin(): boolean {
    return (
      this.group.permissions.library === 'LibAdmin' &&
      this.group.permissions.directory === 'DirAdmin' &&
      this.group.permissions.information === 'InfAdmin' &&
      this.group.permissions.newsgroup === 'NwsAdmin' &&
      this.group.permissions.event === 'EveAdmin'
    );
  }

  public isLibAdmin(): boolean {
    if (this.group.permissions.library === 'LibAdmin') {
      return true;
    }
    return this.permEvalService.isLibAdmin(this.node);
  }

  public isLibManageOwn(): boolean {
    return this.permEvalService.isLibManageOwnOrHigher(this.node);
  }

  public clipboardSidebarClosed() {
    this.clipboardOpen = false;
  }

  public itemsInClipboard(amount: number) {
    this.amountOfItemsInClipboard = amount;
  }

  isFile(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') === -1;
    } else {
      return false;
    }
  }

  isFolder(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') !== -1;
    } else {
      return false;
    }
  }

  isLibraryRoot(): boolean {
    return this.node.name === 'Library';
  }

  private async saveListing(listingOptions: ListingOptions) {
    if (this.preferences.library) {
      this.preferences.library.listing = listingOptions;
      if (this.user && this.user.userId) {
        await this.userService
          .saveUserPreferences(this.user.userId, this.preferences)
          .toPromise();
      }
    }
  }

  private async loadUserPreferences() {
    try {
      if (this.user && this.user.userId) {
        this.preferences = await this.userService
          .getUserPreferences(this.user.userId)
          .toPromise();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private loadColumnConfiguration(): ColumnOptions | undefined {
    if (this.cookieService.check('columnsOptions')) {
      const columns = this.cookieService.get('columnsOptions');
      return JSON.parse(columns) as ColumnOptions;
    }
    return undefined;
  }

  private loadListingConfiguration(): ListingOptions | undefined {
    if (this.cookieService.check('listingOptions')) {
      const listing = this.cookieService.get('listingOptions');
      return JSON.parse(listing) as ListingOptions;
    }
    return undefined;
  }
}
