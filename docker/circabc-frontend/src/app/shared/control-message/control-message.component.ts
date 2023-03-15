import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationService } from 'app/core/validation.service';

@Component({
  selector: 'cbc-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss'],
  preserveWhitespaces: true,
})
export class ControlMessageComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showInvalid = false;
  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-any
  public error!: {
    // tslint:disable-next-line:no-any
    [key: string]: any;
  };

  public getErrorsKeys() {
    const result = [];

    if (
      this.control !== undefined &&
      this.control !== null &&
      this.control.errors
    ) {
      if (
        this.control.dirty ||
        this.control.touched ||
        (this.showInvalid && !this.control.valid)
      ) {
        this.error = this.control.errors;
        for (const key of Object.keys(this.control.errors)) {
          if (this.error[key]) {
            result.push(ValidationService.getErrorMessageTranlationCode(key));
          }
        }
      }
    }
    return result;
  }
}
