import { Injectable } from '@angular/core';
import { LoginService } from 'app/core/login.service';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EULoginService {
  public constructor(private loginService: LoginService) {}

  public euLogin() {
    if (this.loginService.isGuest()) {
      const url = `${environment.serverURL}eulogin`;
      window.location.href = url;
    }
  }
  public logout() {
    const url = `${environment.serverURL}eulogout`;
    window.location.href = url;
  }
}
