import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';

@Component({
  selector: 'cbc-admin',
  templateUrl: './admin.component.html',
  preserveWhitespaces: true,
})
export class AdminComponent {
  public loading = false;
  public showAddHeaderModal = false;
  public showCreateCategory = false;

  constructor(private router: Router, private loginService: LoginService) {}

  public checkCurrentRouteActive(routeName: string): boolean {
    return this.router.url.includes(routeName);
  }

  public isHeadersRoute(): boolean {
    return this.checkCurrentRouteActive('headers');
  }

  public isAdmin(): boolean {
    const user: User = this.loginService.getUser();
    return user.properties !== undefined && user.properties.isAdmin === 'true';
  }

  public isCircabcAdmin(): boolean {
    const user: User = this.loginService.getUser();
    return (
      user.properties !== undefined && user.properties.isCircabcAdmin === 'true'
    );
  }

  public addHeader() {
    this.showAddHeaderModal = true;
  }

  // tslint:disable-next-line:no-empty
  public loadHeaders() {}
}
