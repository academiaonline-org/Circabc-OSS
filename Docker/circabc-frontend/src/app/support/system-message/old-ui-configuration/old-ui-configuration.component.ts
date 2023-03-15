import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppMessageService } from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-old-ui-configuration',
  templateUrl: './old-ui-configuration.component.html',
  styleUrls: ['./old-ui-configuration.component.scss'],
  preserveWhitespaces: true,
})
export class OldUiConfigurationComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private appMessageService: AppMessageService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      enableOld: false,
      display: true,
    });

    const config = await this.appMessageService
      .getDisplayOldMessage()
      .toPromise();
    const configOldMessage = await this.appMessageService
      .getEnableOldMessage()
      .toPromise();

    this.form.controls.display.setValue(config.display);
    this.form.controls.enableOld.setValue(configOldMessage.enable);

    this.form.controls.display.valueChanges.forEach((value) => {
      // tslint:disable-next-line:no-floating-promises
      this.updateSettings(value);
    });

    this.form.controls.enableOld.valueChanges.forEach((value) => {
      // tslint:disable-next-line:no-floating-promises
      this.toggleOldMessage(value);
    });
  }

  async updateSettings(value: boolean) {
    if (value !== undefined) {
      await this.appMessageService.setDisplayOldMessage(value).toPromise();
    }
  }

  async toggleOldMessage(value: boolean) {
    if (value !== undefined) {
      await this.appMessageService.setEnableOldMessage(value).toPromise();
    }
  }
}
