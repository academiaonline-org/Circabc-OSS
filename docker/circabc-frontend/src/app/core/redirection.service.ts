import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const MUST_REDIRECT = 'mustRedirect';
@Injectable({
  providedIn: 'root',
})
export class RedirectionService {
  public constructor(private router: Router) {}
  public redirect() {
    let url = sessionStorage.getItem(MUST_REDIRECT);
    if (url !== '' && url !== null) {
      let idx = url.indexOf('://');
      if (idx !== -1) {
        url = url.substring(idx + 3);
        idx = url.indexOf(environment.baseHref);
        url = url.substring(idx + environment.baseHref.length);
      }
      sessionStorage.removeItem(MUST_REDIRECT);
      // tslint:disable-next-line:no-floating-promises
      this.router.navigateByUrl(url);
    } else {
      // tslint:disable-next-line:no-floating-promises
      this.router.navigate(['/me']);
    }
  }
  public mustRedirect() {
    sessionStorage.setItem(MUST_REDIRECT, window.location.href);
  }
}
