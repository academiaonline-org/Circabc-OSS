import { Component, OnInit } from '@angular/core';

import { ActionEmitterResult } from 'app/action-result';
import {
  HelpCategory,
  HelpLink,
  HelpService,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';

@Component({
  selector: 'cbc-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  public categories: HelpCategory[] = [];
  public links: HelpLink[] = [];
  public linkId = '';
  public loading = false;
  public showCreateModal = false;
  public showCreateLinkModal = false;

  constructor(
    private helpService: HelpService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.loading = true;

    try {
      this.links = await this.helpService.getHelpLinks().toPromise();
    } catch (error) {
      console.error(error);
    }

    try {
      this.categories = await this.helpService.getHelpCategories().toPromise();
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }

  public isAdminOrSupport(): boolean {
    if (!this.loginService.isGuest()) {
      const user = this.loginService.getUser();
      return (
        user.properties !== undefined &&
        (user.properties.isAdmin === 'true' ||
          user.properties.isCircabcAdmin === 'true')
      );
    }

    return false;
  }

  public async refresh(_result: ActionEmitterResult) {
    this.loading = true;

    try {
      this.categories = await this.helpService.getHelpCategories().toPromise();
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }

  public async refreshLinks(_result: ActionEmitterResult) {
    this.loading = true;
    this.showCreateLinkModal = false;

    try {
      this.links = await this.helpService.getHelpLinks().toPromise();
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }

  public openForEdit(linkId: string) {
    if (linkId) {
      this.linkId = linkId;
      this.showCreateLinkModal = true;
    }
  }
}
