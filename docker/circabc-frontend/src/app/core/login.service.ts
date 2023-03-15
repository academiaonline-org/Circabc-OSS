import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User, UserService } from 'app/core/generated/circabc';
import { ALF_BASE_PATH } from 'app/core/variables';

interface TicketResponse {
  data: {
    ticket: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private alfrescoURL!: string;

  /* tslint:disable:no-null-keyword */
  private static convert2String(
    value: string | null | undefined,
    defaultValue: string = ''
  ): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return defaultValue;
    }
  }

  private static setlocalStorage(ticket: string, user: User): void {
    sessionStorage.setItem('ticket', ticket);
    sessionStorage.setItem(
      'user.userId',
      LoginService.convert2String(user.userId)
    );
    sessionStorage.setItem(
      'user.email',
      LoginService.convert2String(user.email)
    );
    sessionStorage.setItem(
      'user.avatar',
      LoginService.convert2String(user.avatar)
    );
    sessionStorage.setItem(
      'user.firstname',
      LoginService.convert2String(user.firstname)
    );
    sessionStorage.setItem(
      'user.lastname',
      LoginService.convert2String(user.lastname)
    );
    sessionStorage.setItem(
      'user.phone',
      LoginService.convert2String(user.phone)
    );
    sessionStorage.setItem(
      'user.contentFilterLang',
      LoginService.convert2String(user.contentFilterLang)
    );
    sessionStorage.setItem(
      'user.uiLang',
      LoginService.convert2String(user.uiLang)
    );
    if (user.visibility) {
      sessionStorage.setItem('user.visibility', user.visibility.toString());
    }
    sessionStorage.setItem('user.properties', JSON.stringify(user.properties));
  }

  public get httpClient(): HttpClient {
    return this.injector.get<HttpClient>(HttpClient);
  }

  public get translateService(): TranslateService {
    return this.injector.get<TranslateService>(TranslateService);
  }

  public constructor(
    private injector: Injector,
    private userService: UserService,
    @Optional()
    @Inject(ALF_BASE_PATH)
    basePath: string
  ) {
    if (basePath) {
      this.alfrescoURL = basePath;
    }
  }

  public async loadUser(username: string, ticket: string): Promise<boolean> {
    try {
      sessionStorage.setItem('ticket', ticket);
      const user: User = await this.userService.getUser(username).toPromise();
      LoginService.setlocalStorage(ticket, user);
      if (user.uiLang) {
        this.translateService.use(user.uiLang);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  public async validateTicket(): Promise<boolean> {
    const ticket = sessionStorage.getItem('ticket');
    let result = false;
    if (ticket) {
      try {
        await this.httpClient
          .get(`${this.alfrescoURL}/login/ticket/${ticket}`, {
            responseType: 'text',
          })
          .toPromise();
        result = true;
      } catch (err) {
        result = false;
        console.error(err);
      }
    }

    return result;
  }

  public async login(userPassword: {
    username: string;
    password: string;
  }): Promise<boolean> {
    const body = JSON.stringify(userPassword);
    try {
      const response = await this.httpClient
        .post<TicketResponse>(`${this.alfrescoURL}/login`, body)
        .toPromise();
      const ticket: string = response.data.ticket;
      sessionStorage.setItem('ticket', ticket);
      const user: User = await this.userService
        .getUser(userPassword.username)
        .toPromise();
      LoginService.setlocalStorage(ticket, user);
      if (user.uiLang) {
        this.translateService.use(user.uiLang);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  public async logout(): Promise<boolean> {
    const ticket = this.getTicket();
    const url = `${this.alfrescoURL}/login/ticket/${ticket}?format=json`;
    try {
      const httpHeaders = new HttpHeaders().set(
        'Authorization',
        `Basic ${btoa(ticket)}`
      );
      await this.httpClient.delete(url, { headers: httpHeaders }).toPromise();
      this.cleanAuthentication();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public isGuest(): boolean {
    const ticket = LoginService.convert2String(
      sessionStorage.getItem('ticket')
    );
    return ticket === '';
  }

  public getCurrentUsername(): string {
    const currentUsername: string = LoginService.convert2String(
      sessionStorage.getItem('user.userId')
    );
    return currentUsername === '' ? 'guest' : currentUsername;
  }

  public getUser(): User {
    const result = {
      userId: LoginService.convert2String(
        sessionStorage.getItem('user.userId')
      ),
      email: LoginService.convert2String(sessionStorage.getItem('user.email')),
      avatar: LoginService.convert2String(
        sessionStorage.getItem('user.avatar')
      ),
      firstname: LoginService.convert2String(
        sessionStorage.getItem('user.firstname')
      ),
      lastname: LoginService.convert2String(
        sessionStorage.getItem('user.lastname')
      ),
      phone: LoginService.convert2String(sessionStorage.getItem('user.phone')),
      contentFilterLang: LoginService.convert2String(
        sessionStorage.getItem('user.contentFilterLang')
      ),
      uiLang: LoginService.convert2String(
        sessionStorage.getItem('user.uiLang')
      ),
      properties: JSON.parse(
        sessionStorage.getItem('user.properties') as string
      ),
    };

    let visibility = false;
    if (sessionStorage.getItem('user.phone') === 'true') {
      visibility = true;
    }

    return { ...result, ...{ visibility } };
  }

  public cleanAuthentication(): void {
    sessionStorage.removeItem('ticket');
    sessionStorage.removeItem('user.userId');
    sessionStorage.removeItem('user.email');
    sessionStorage.removeItem('user.avatar');
    sessionStorage.removeItem('user.firstname');
    sessionStorage.removeItem('user.lastname');
    sessionStorage.removeItem('user.phone');
    sessionStorage.removeItem('user.contentFilterLang');
    sessionStorage.removeItem('user.uiLang');
    sessionStorage.removeItem('user.visibility');
    sessionStorage.removeItem('user.properties');
  }

  public getTicket(): string {
    return LoginService.convert2String(sessionStorage.getItem('ticket'));
  }
}
