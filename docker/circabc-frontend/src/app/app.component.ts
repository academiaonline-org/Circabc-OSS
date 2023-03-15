import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cbc-app',
  templateUrl: './app.component.html',
  preserveWhitespaces: true,
})
export class AppComponent implements OnInit {
  public constructor(translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the language from the browser
    // if the browser language could not be read, it will use english as language
    const browserLang = translateService.getBrowserLang();
    if (browserLang !== null) {
      translateService.use(browserLang);
    } else {
      translateService.use('en');
    }

    // reset the system message information display
    localStorage.setItem('systemMessageAlreadyShown', '-1');
  }
  // tab sessionStorage replication
  //  https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs
  ngOnInit(): void {
    // transfers sessionStorage from one tab to another
    // tslint:disable-next-line:no-any
    const sessionStorage_transfer = (event: any) => {
      if (!event) {
        // tslint:disable-next-line:no-parameter-reassignment
        // tslint:disable-next-line
        event = window.event;
      } // ie suq
      if (!event.newValue) {
        return;
      } // do nothing if no value to work with
      if (event.key === 'getSessionStorage') {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        // the other tab should now have it, so we're done with it.
        localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
      } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
        // another tab sent data <- get it
        const data = JSON.parse(event.newValue);
        // tslint:disable-next-line:forin
        for (const key in data) {
          // tslint:disable-next-line:no-for-in
          sessionStorage.setItem(key, data[key]);
        }
      }
    };

    // listen for changes to localStorage
    if (window.addEventListener) {
      window.addEventListener('storage', sessionStorage_transfer, false);
    } else {
      // tslint:disable-next-line:no-any
      (window as any).attachEvent('onstorage', sessionStorage_transfer);
    }

    // Ask other tabs for session storage (this is ONLY to trigger event)
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', 'dummy');
      localStorage.removeItem('getSessionStorage');
    }
  }
}
