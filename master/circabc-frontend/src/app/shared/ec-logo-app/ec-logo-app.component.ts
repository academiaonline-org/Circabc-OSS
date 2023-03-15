import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cbc-ec-logo-app',
  templateUrl: './ec-logo-app.component.html',
  styleUrls: ['./ec-logo-app.component.scss'],
})
export class EcLogoAppComponent {
  constructor(private translateService: TranslateService) {}

  public getLang(): string {
    return this.translateService.currentLang.toLocaleLowerCase();
  }
}
