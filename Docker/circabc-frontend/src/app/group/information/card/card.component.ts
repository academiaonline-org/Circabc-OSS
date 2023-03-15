import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { LoginService } from 'app/core/login.service';
import { CardEntry } from 'app/core/ui-model/card-entry';

@Component({
  selector: 'cbc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  preserveWhitespaces: true,
})
export class CardComponent implements OnInit {
  @Input()
  size!: number;
  @Input()
  height = 1;
  @Input()
  skin!: string;
  @Input()
  card!: CardEntry;

  // tslint:disable-next-line:no-any
  @ViewChild('cardDiv', { static: true })
  // tslint:disable-next-line:no-any
  cardDiv: any;
  // tslint:disable-next-line:no-any
  @ViewChild('cardHeader', { static: true })
  // tslint:disable-next-line:no-any
  cardHeader: any;

  public trustedwebdavUrl!: string;

  public constructor(private loginService: LoginService) {}

  public ngOnInit() {
    if (this.card.type === 'image') {
      if (this.card.properties) {
        this.cardDiv.nativeElement.style.backgroundImage = `url(${this.card.properties.img})`;
      }
      this.cardDiv.nativeElement.style.backgroundSize = 'cover';
    }

    if (this.card.type === 'text-image') {
      if (this.card.properties) {
        this.cardHeader.nativeElement.style.backgroundImage = `url(${this.card.properties.img})`;
      }
      this.cardHeader.nativeElement.style.display = 'block';
    }

    if (this.card.type === 'webdav') {
      if (this.card.properties) {
        this.trustedwebdavUrl = this.card.properties.webdavUrl;
      }
    }
  }

  public isText(): boolean {
    return this.card.type === 'text' || this.card.type === 'text-image';
  }

  public isWebdav(): boolean {
    return this.card.type === 'webdav';
  }

  public isEvent(): boolean {
    return this.card.type === 'event';
  }

  public checkTicket(): string {
    if (!this.loginService.isGuest()) {
      return `?ticket=${this.loginService.getTicket()}`;
    } else {
      return '';
    }
  }

  public getWebdavUrl(): string {
    return this.trustedwebdavUrl + this.checkTicket();
  }
}
