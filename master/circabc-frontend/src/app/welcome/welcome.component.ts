import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EULoginService } from 'app/core/eulogin.service';
import { LoginService } from 'app/core/login.service';
import { RedirectionService } from 'app/core/redirection.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'cbc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  preserveWhitespaces: true,
  providers: [CookieService],
})
export class WelcomeComponent implements OnInit {
  public waitingAfterLogin = false;
  public isOSS = false;

  constructor(
    private cookieService: CookieService,
    private translateService: TranslateService,
    private euLoginService: EULoginService,
    private loginService: LoginService,
    private redirectionService: RedirectionService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (environment.circabcRelease === 'oss') {
      this.isOSS = true;
    } else {
      const username = this.cookieService.get('username');
      const ticket = this.cookieService.get('ticket');
      this.cookieService.delete('username', '/');
      this.cookieService.delete('ticket', '/');
      if (username.length > 0 && ticket.length > 0) {
        this.waitingAfterLogin = true;
        // tslint:disable-next-line:no-floating-promises
        this.loginService.loadUser(username, ticket).then((result) => {
          if (result) {
            this.redirectionService.redirect();
          } else {
            this.waitingAfterLogin = false;
          }
        });
      }
    }
  }

  public euLogin() {
    if (this.loginService.isGuest()) {
      this.euLoginService.euLogin();
    } else {
      this.router.navigate(['/me']);
    }
  }

  public euLoginCreate() {
    window.location.href =
      'https://ecas.cc.cec.eu.int:7002/cas/eim/external/register.cgi';
  }

  public get useEULogin(): boolean {
    return true;
  }

  get currentLang(): string {
    return this.translateService.currentLang;
  }

  public refreshUILang(event: string): void {
    this.translateService.use(event);
  }
}
