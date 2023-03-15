import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import {
  ContentService,
  ExpiredService,
  InterestGroup,
  InterestGroupService,
  Node as ModelNode,
  PagedNodes,
} from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';
import {
  changeSort,
  getErrorTranslation,
  getSuccessTranslation,
} from 'app/core/util';
import { ListingOptions } from 'app/group/listing-options/listing-options';

@Component({
  selector: 'cbc-expired-items',
  templateUrl: './expired-items.component.html',
  styleUrls: ['./expired-items.component.scss'],
  preserveWhitespaces: true,
})
export class ExpiredItemsComponent implements OnInit {
  @Input()
  groupId!: string;

  public currentIg!: InterestGroup;
  public listingOptions: ListingOptions = {
    page: 1,
    limit: 10,
    sort: 'expirationDate_DESC',
  };
  public totalItems = 10;
  public loading = false;
  public expiredNodes: PagedNodes = { data: [], total: 0 };
  public deletableNodes: ModelNode[] = [];
  public allSelected = false;
  public deleting = false;
  public mustConfirm = false;

  constructor(
    private groupService: InterestGroupService,
    private uiMessageService: UiMessageService,
    private translateService: TranslateService,
    private expiredService: ExpiredService,
    private contentService: ContentService
  ) {}

  async ngOnInit() {
    await this.loadIg();
  }

  private async loadIg() {
    this.loading = true;
    if (this.groupId) {
      this.currentIg = await this.groupService
        .getInterestGroup(this.groupId)
        .toPromise();
      this.expiredNodes = await this.expiredService
        .getExpiredDocuments(
          this.groupId,
          this.listingOptions.limit,
          this.listingOptions.page,
          this.listingOptions.sort
        )
        .toPromise();

      if (this.expiredNodes.total) {
        this.totalItems = this.expiredNodes.total;
      }
    }
    this.loading = false;
  }

  public async goToPage(page: number) {
    this.listingOptions.page = page;
    await this.changePage(this.listingOptions);
  }

  public async changePage(listingOptions: ListingOptions) {
    this.loading = true;
    this.listingOptions = listingOptions;
    if (this.groupId !== undefined) {
      this.expiredNodes = await this.expiredService
        .getExpiredDocuments(
          this.groupId,
          this.listingOptions.limit,
          this.listingOptions.page,
          this.listingOptions.sort
        )
        .toPromise();

      if (this.expiredNodes.total) {
        this.totalItems = this.expiredNodes.total;
      }
    }
    this.loading = false;
  }

  public async changeSort(sort: string) {
    this.listingOptions.sort = changeSort(this.listingOptions.sort, sort);
    await this.changePage(this.listingOptions);
  }

  public async changeLimit(limit: number) {
    this.listingOptions.limit = limit;
    this.listingOptions.page = 1;
    await this.changePage(this.listingOptions);
  }

  public isFile(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') === -1;
    } else {
      return false;
    }
  }

  public isFolder(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') !== -1;
    } else {
      return false;
    }
  }

  public isLink(node: ModelNode): boolean {
    if (node.properties && node.properties.mimetype && node.properties.url) {
      return (
        node.properties.mimetype === 'text/html' && node.properties.url !== ''
      );
    } else {
      return false;
    }
  }

  public prepareNode(node: ModelNode) {
    const idx = this.deletableNodes.indexOf(node);
    if (idx === -1) {
      this.deletableNodes.push(node);
    } else {
      this.deletableNodes.splice(idx, 1);
    }
  }

  public isPrepared(node: ModelNode): boolean {
    return this.deletableNodes.indexOf(node) !== -1;
  }

  public async deleteNodes() {
    let isError = false;

    this.deleting = true;
    this.mustConfirm = true;

    for (const node of this.deletableNodes) {
      if (node.id) {
        try {
          await this.contentService.deleteContent(node.id).toPromise();
        } catch (error) {
          isError = true;
        }
      }
    }

    if (isError) {
      const txt = await this.translateService
        .get(getErrorTranslation(ActionType.DELETE_CONTENT))
        .toPromise();
      this.uiMessageService.addErrorMessage(txt);
    } else if (!isError && this.deletableNodes.length !== 0) {
      const txt = await this.translateService
        .get(getSuccessTranslation(ActionType.DELETE_CONTENT))
        .toPromise();
      this.uiMessageService.addSuccessMessage(txt, true);
    }

    await this.changePage(this.listingOptions);

    this.deleting = false;
    this.mustConfirm = false;
  }

  public async deleteNode(node: ModelNode) {
    if (node.id) {
      try {
        await this.contentService.deleteContent(node.id).toPromise();
        const txt = await this.translateService
          .get(getSuccessTranslation(ActionType.DELETE_CONTENT))
          .toPromise();
        this.uiMessageService.addSuccessMessage(txt, true);
        await this.changePage(this.listingOptions);
      } catch (error) {
        const txt = await this.translateService
          .get(getErrorTranslation(ActionType.DELETE_CONTENT))
          .toPromise();
        this.uiMessageService.addErrorMessage(txt);
      }
    }
  }

  public toggleAllPrepared() {
    this.allSelected = !this.allSelected;
    if (this.expiredNodes && this.expiredNodes.data && this.allSelected) {
      for (const delNode of this.expiredNodes.data) {
        this.deletableNodes.push(delNode);
      }
    } else if (!this.allSelected) {
      this.deletableNodes = [];
    }
  }

  public async onDeletedElement(result: ActionEmitterResult) {
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.DELETE_SPACE
    ) {
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.DELETE_SPACE))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    } else if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.DELETE_CONTENT
    ) {
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.DELETE_CONTENT))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
    await this.changePage(this.listingOptions);
  }

  public getModifier(node: ModelNode): string {
    if (node.properties) {
      return node.properties.modifier;
    } else {
      return '';
    }
  }

  public getExpirationDate(node: ModelNode): string | null {
    if (node.properties) {
      return node.properties.expiration_date;
    } else {
      return null;
    }
  }
  public trackById(_index: number, item: { id?: string | number }) {
    return item.id;
  }
}
