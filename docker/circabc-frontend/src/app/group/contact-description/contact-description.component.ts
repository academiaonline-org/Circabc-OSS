import { Component, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { InterestGroup } from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-contact-description',
  templateUrl: './contact-description.component.html',
  styleUrls: ['./contact-description.component.scss'],
  preserveWhitespaces: true,
})
export class ContactDescriptionComponent {
  @Input()
  public group!: InterestGroup;

  constructor(private translateService: TranslateService) {}

  hasContact(): boolean {
    if (this.group && this.group.contact) {
      return this.hasMLValue(this.group.contact);
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
}
