import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionType } from 'app/action-result';
import { InterestGroup, MembersService } from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getErrorTranslation, getSuccessTranslation } from 'app/core/util';
import { I18nPipe } from 'app/shared/pipes/i18n.pipe';

@Component({
  selector: 'cbc-quit-group',
  templateUrl: './quit-group.component.html',
})
export class QuitGroupComponent {
  @Input()
  public show = false;

  @Input()
  public group!: InterestGroup;

  @Input()
  public username = '';

  @Output()
  public readonly showChange = new EventEmitter();

  @Output()
  public readonly membershipRemoved = new EventEmitter();

  public processing = false;

  constructor(
    private membersService: MembersService,
    private i18nPipe: I18nPipe,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService
  ) {}

  public async removeMembership() {
    this.processing = true;

    try {
      if (this.group && this.group.id) {
        await this.membersService
          .deleteMember(this.group.id, this.username)
          .toPromise();
        this.show = false;
        this.showChange.emit(this.show);
        this.membershipRemoved.emit();
        const res = await this.translateService
          .get(getSuccessTranslation(ActionType.REMOVE_MEMBERSHIP))
          .toPromise();
        this.uiMessageService.addSuccessMessage(res, true);
      }
    } catch (error) {
      const res = await this.translateService
        .get(getErrorTranslation(ActionType.REMOVE_MEMBERSHIP))
        .toPromise();
      this.uiMessageService.addErrorMessage(res, true);
    }

    this.processing = false;
  }

  public cancel() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  public getGroupLabel(): string {
    let result = '';

    if (this.group.name) {
      result = this.group.name;
    }

    if (this.group.title) {
      const title = this.i18nPipe.transform(this.group.title);

      if (title !== '') {
        result = title;
      }
    }

    return result;
  }
}
