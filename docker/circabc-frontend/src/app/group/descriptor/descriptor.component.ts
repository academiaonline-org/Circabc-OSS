import { Component, Input, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import { InterestGroup, UserService } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getSuccessTranslation } from 'app/core/util';

@Component({
  selector: 'cbc-group-desciptor',
  templateUrl: './descriptor.component.html',
  styleUrls: ['./descriptor.component.scss'],
  preserveWhitespaces: true,
})
export class DescriptorComponent implements OnInit {
  @Input()
  public group!: InterestGroup;

  public showApplicationModal = false;
  public showContactLeadersModal = false;
  public alreadyMember = false;

  constructor(
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (!this.loginService.isGuest()) {
      const userId =
        this.loginService.getUser().userId !== undefined
          ? this.loginService.getUser().userId
          : 'guest';
      if (userId !== undefined) {
        const memberships = await this.userService
          .getUserMembership(userId)
          .toPromise();
        for (const profile of memberships) {
          if (
            profile &&
            profile.interestGroup &&
            profile.interestGroup.id === this.group.id
          ) {
            this.alreadyMember = true;
          }
        }
      }
    }
  }

  public isContactLeaderAvailable(): boolean {
    return !this.loginService.isGuest();
  }

  getLang(): string {
    if (
      this.group &&
      this.group.description &&
      Object.keys(this.group.description).indexOf(
        this.translateService.currentLang
      ) !== -1
    ) {
      return this.translateService.currentLang;
    } else {
      return this.translateService.defaultLang;
    }
  }

  private getLogo(item: 0 | 1): string {
    if (this.group && this.group.logoUrl) {
      return this.group.logoUrl.split('/')[item];
    } else {
      return '';
    }
  }

  getLogoRef(): string {
    return this.getLogo(0);
  }

  getLogoName(): string {
    return this.getLogo(1);
  }

  isJoinEnabled() {
    return (
      this.group.allowApply &&
      !this.loginService.isGuest() &&
      !this.alreadyMember
    );
  }

  onRequestCanceled(_result: ActionEmitterResult) {
    this.showApplicationModal = false;
  }

  async onRequestFinished(result: ActionEmitterResult) {
    if (
      result.result === ActionResult.SUCCEED &&
      result.type === ActionType.APPLY_FOR_MEMBERSHIP
    ) {
      this.showApplicationModal = false;
      const text = await this.translateService
        .get(getSuccessTranslation(ActionType.APPLY_FOR_MEMBERSHIP))
        .toPromise();
      if (text) {
        this.uiMessageService.addSuccessMessage(text, true);
      }
    }
  }

  hasDescription(): boolean {
    if (this.group && this.group.description) {
      return this.hasMLValue(this.group.description);
    }
    return false;
  }

  hasMLValue(obj: { [key: string]: string }): boolean {
    if (obj) {
      const lang = this.getLang();
      if (obj[lang] !== undefined && obj[lang] !== '') {
        return true;
      }
    }

    return false;
  }

  public isGuest(): boolean {
    return this.loginService.isGuest();
  }

  public leaderContactRefresh(_result: ActionEmitterResult) {
    this.showContactLeadersModal = false;
  }
}
