import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { ActionEmitterResult, ActionType } from 'app/action-result';
import {
  AppMessageService,
  DistributionMail,
  User,
  UserService,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getSuccessTranslation } from 'app/core/util';
import { ValidationService } from 'app/core/validation.service';

@Component({
  selector: 'cbc-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  preserveWhitespaces: true,
})
export class AccountComponent implements OnInit {
  @ViewChild('nameInputFieldElement', { static: true })
  nameInputFieldElement!: ElementRef;

  public user!: User;
  public distributionMail!: DistributionMail | undefined;

  public viewing = false;
  public processing = false;
  public ready = false;

  public launchChangeAvatar = false;
  public mustConfirmAvatarDelete = false;

  public updateUserForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private location: Location,
    private appMessageService: AppMessageService
  ) {}

  async ngOnInit() {
    this.updateUserForm = this.formBuilder.group(
      {
        firstname: [''],
        lastname: [''],
        email: ['', ValidationService.emailValidator],

        title: [''],
        organisation: [''],
        postalAddress: [''],
        description: [''],
        phone: [''],
        fax: [''],
        urlAddress: ['', ValidationService.urlValidator],
        uiLanguage: [''],
        globalNotificationEnabled: [false],
        globalDistributionEnabled: [false],
        personalInformationVisible: [false],
        signature: [''],
        avatar: [''],
      },
      {
        updateOn: 'change',
      }
    );

    if (this.user === undefined) {
      this.user = this.loginService.getUser();
    }

    await this.loadUserDetails();
    this.ready = true;
    await this.fillForm();

    this.updateUserForm.controls.globalDistributionEnabled.valueChanges.subscribe(
      (data) => {
        this.subscribeDistributionList(data);
      }
    );
  }

  private async fillForm() {
    try {
      // fill form fields
      this.updateUserForm.controls.firstname.patchValue(this.user.firstname);
      this.updateUserForm.controls.lastname.patchValue(this.user.lastname);
      this.updateUserForm.controls.email.patchValue(this.user.email);
      this.updateUserForm.controls.phone.patchValue(this.user.phone);
      this.updateUserForm.controls.uiLanguage.patchValue(this.user.uiLang);
      this.updateUserForm.controls.personalInformationVisible.patchValue(
        this.user.visibility
      );
      this.updateUserForm.controls.avatar.patchValue(this.user.avatar);

      if (this.user.properties !== undefined) {
        this.updateUserForm.controls.title.patchValue(
          this.user.properties.title
        );
        this.updateUserForm.controls.description.patchValue(
          this.user.properties.description
        );
        this.updateUserForm.controls.organisation.patchValue(
          this.user.properties.organisation
        );
        this.updateUserForm.controls.signature.patchValue(
          this.user.properties.signature
        );
        this.updateUserForm.controls.fax.patchValue(this.user.properties.fax);
        this.updateUserForm.controls.postalAddress.patchValue(
          this.user.properties.postalAddress
        );
        this.updateUserForm.controls.urlAddress.patchValue(
          this.user.properties.urlAddress
        );
        this.updateUserForm.controls.globalNotificationEnabled.patchValue(
          this.user.properties.globalNotificationEnabled === 'true'
        );
      }

      if (this.distributionMail && this.distributionMail.id) {
        this.updateUserForm.controls.globalDistributionEnabled.patchValue(true);
      } else {
        this.updateUserForm.controls.globalDistributionEnabled.patchValue(
          false
        );
      }
    } catch (error) {
      const jsonError = JSON.parse(error._body);
      if (jsonError) {
        this.uiMessageService.addErrorMessage(jsonError.message);
      }
    }

    this.nameInputFieldElement.nativeElement.focus();
  }

  public cutDate(dateString: string) {
    return dateString !== undefined ? dateString.substring(0, 10) : '';
  }

  public goBack() {
    this.location.back();
  }

  public changeAvatar() {
    this.launchChangeAvatar = true;
  }

  public changeAvatarClosed() {
    this.launchChangeAvatar = false;
  }

  public async avatarUploaded(_result: ActionEmitterResult) {
    this.user = await this.userService
      .getUser(this.user.userId as string)
      .toPromise();
    await this.fillForm();
    // tslint:disable-next-line:ban
    location.reload();
  }

  public async removeAvatar() {
    this.processing = true;

    await this.userService.deleteAvatar(this.user.userId as string).toPromise();

    this.user = await this.userService
      .getUser(this.user.userId as string)
      .toPromise();
    await this.fillForm();

    this.processing = false;
    this.mustConfirmAvatarDelete = false;
    // tslint:disable-next-line:ban
    location.reload();
  }

  public async refreshFromCentralDB() {
    this.processing = true;

    this.user = await this.userService
      .getUserFromDB(this.user.userId as string)
      .toPromise();
    await this.fillForm();

    this.processing = false;
  }

  public async cancel() {
    this.user = await this.userService
      .getUser(this.user.userId as string)
      .toPromise();
    await this.fillForm();
  }

  public async update() {
    try {
      this.processing = true;

      if (this.user !== undefined && this.user.properties !== undefined) {
        // fill user fields
        this.user.firstname = this.updateUserForm.controls.firstname.value;
        this.user.lastname = this.updateUserForm.controls.lastname.value;
        this.user.email = this.updateUserForm.controls.email.value;
        this.user.phone = this.updateUserForm.controls.phone.value;
        this.user.uiLang = this.updateUserForm.controls.uiLanguage.value;
        this.user.visibility = this.updateUserForm.controls.personalInformationVisible.value;

        this.user.properties.title = this.updateUserForm.controls.title.value;
        this.user.properties.description = this.updateUserForm.controls.description.value;
        this.user.properties.organisation = this.updateUserForm.controls.organisation.value;
        this.user.properties.signature = this.updateUserForm.controls.signature.value;
        this.user.properties.fax = this.updateUserForm.controls.fax.value;
        this.user.properties.postalAddress = this.updateUserForm.controls.postalAddress.value;
        this.user.properties.urlAddress = this.updateUserForm.controls.urlAddress.value;
        this.user.properties.globalNotificationEnabled = this.updateUserForm
          .controls.globalNotificationEnabled.value
          ? 'true'
          : 'false';

        await this.userService
          .putUser(this.user.userId as string, this.user)
          .toPromise();

        await this.refreshUILang(this.updateUserForm.controls.uiLanguage.value);

        const text = await this.translateService
          .get(getSuccessTranslation(ActionType.UPDATE_ACCOUNT))
          .toPromise();
        if (text) {
          this.uiMessageService.addSuccessMessage(text, true);
        }
      } else {
        const text = await this.translateService
          .get(getSuccessTranslation(ActionType.UPDATE_ACCOUNT))
          .toPromise();
        if (text) {
          this.uiMessageService.addErrorMessage(text, true);
        }
        throw new Error('"user" is undefined.');
      }
    } finally {
      this.processing = false;
    }
  }
  get emailControl(): AbstractControl {
    return this.updateUserForm.controls.email;
  }
  get urlAddressControl(): AbstractControl {
    return this.updateUserForm.controls.urlAddress;
  }

  public async refreshUILang(lang: string) {
    this.translateService.use(lang);
    if (!this.loginService.isGuest()) {
      await this.userService
        .putUser(this.loginService.getCurrentUsername(), { uiLang: lang })
        .toPromise();
    }
  }

  private async subscribeDistributionList(value: boolean) {
    if (
      this.user &&
      this.updateUserForm &&
      value === true &&
      this.user.userId
    ) {
      try {
        const distrib: DistributionMail = {
          id: undefined,
          emailAddress: this.user.email,
        };
        await this.appMessageService
          .addDistributionEmails([distrib])
          .toPromise();

        const result = await this.appMessageService
          .getDistributionEmailSubscription(this.user.userId)
          .toPromise();
        if (result && result.id) {
          this.distributionMail = result;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      this.user &&
      this.updateUserForm &&
      value === false &&
      this.distributionMail &&
      this.distributionMail.id
    ) {
      try {
        await this.appMessageService
          .deleteDistributionEmails(this.distributionMail.id)
          .toPromise();
        this.distributionMail = undefined;
      } catch (error) {
        console.error(error);
      }
    }
  }

  private async loadUserDetails() {
    this.user = await this.userService
      .getUser(this.user.userId as string)
      .toPromise();

    if (this.user && this.user.userId) {
      const result = await this.appMessageService
        .getDistributionEmailSubscription(this.user.userId)
        .toPromise();
      if (result && result.id) {
        this.distributionMail = result;
      }
    }
  }
}
