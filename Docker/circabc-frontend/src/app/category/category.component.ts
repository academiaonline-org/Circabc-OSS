import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result/index';
import { CategoryService, User } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getErrorTranslation, getSuccessTranslation } from 'app/core/util';

@Component({
  selector: 'cbc-category',
  templateUrl: './category.component.html',
  preserveWhitespaces: true,
})
export class CategoryComponent implements OnInit {
  public showModalCreate = false;
  public loading = false;
  public categoryId!: string;
  private admins: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      if (params && params.id) {
        this.categoryId = params.id;
        await this.loadAdmins();
      }
    });
  }

  private async loadAdmins() {
    this.admins = await this.categoryService
      .getCategoryAdministartors(this.categoryId)
      .toPromise();
  }

  public checkCurrentRouteActive(routeName: string): boolean {
    return this.router.url.includes(routeName);
  }

  public isDetailsRoute(): boolean {
    return this.checkCurrentRouteActive('details');
  }

  public isAdministratorsRoute(): boolean {
    return this.checkCurrentRouteActive('administrators');
  }

  public isActionsRoute(): boolean {
    return this.checkCurrentRouteActive('actions');
  }

  public isCustomisationRoute(): boolean {
    return this.checkCurrentRouteActive('customisation');
  }

  public isStatisticsRoute(): boolean {
    return this.checkCurrentRouteActive('ig-statistics');
  }

  public isSupportRoute(): boolean {
    return this.checkCurrentRouteActive('support');
  }

  public isGroupRequestsRoute(): boolean {
    return this.checkCurrentRouteActive('group-request');
  }

  public isInterestGroupsRoute(): boolean {
    return this.checkCurrentRouteActive('interest-groups');
  }

  public isCategoryAdmin(): boolean {
    if (!this.loginService.isGuest()) {
      const user = this.loginService.getUser();

      for (const admin of this.admins) {
        if (admin.userId === user.userId) {
          return true;
        }
      }
    }

    return false;
  }

  public async onCreateGroupClosed(res: ActionEmitterResult) {
    if (
      res.result === ActionResult.CANCELED &&
      res.type === ActionType.CREATE_INTEREST_GROUP
    ) {
      this.showModalCreate = false;
    } else if (
      res.result === ActionResult.SUCCEED &&
      res.type === ActionType.CREATE_INTEREST_GROUP
    ) {
      this.showModalCreate = false;
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.CREATE_INTEREST_GROUP))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
      if (res.node) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['group', res.node.id]);
      }
    } else if (
      res.type === ActionType.CREATE_INTEREST_GROUP_EXISTS &&
      res.result === ActionResult.FAILED
    ) {
      const text = await this.translateService
        .get(getErrorTranslation(ActionType.CREATE_INTEREST_GROUP_EXISTS))
        .toPromise();
      if (text) {
        this.uiMessageService.addErrorMessage(text, false);
      }
    } else if (
      res.type === ActionType.CREATE_INTEREST_GROUP &&
      res.result === ActionResult.FAILED
    ) {
      this.showModalCreate = false;
      const text = await this.translateService
        .get(getErrorTranslation(ActionType.CREATE_INTEREST_GROUP))
        .toPromise();
      if (text) {
        this.uiMessageService.addErrorMessage(text, true);
      }
    }
  }
}
