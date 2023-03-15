import { Inject, Injectable, Optional } from '@angular/core';

import { saveAs } from 'file-saver';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'app/core/login.service';
import { SERVER_URL } from 'app/core/variables';

@Injectable({
  providedIn: 'root',
})
export class SaveAsService {
  private serverURL!: string;

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    @Optional()
    @Inject(SERVER_URL)
    serverURL: string
  ) {
    if (serverURL) {
      this.serverURL = serverURL;
    }
  }

  public saveAs(id: string, name: string) {
    // const fileDownloadURL = `${this.serverURL}d/a/workspace/SpacesStore/${id}/${name}`;
    const fileDownloadURL = `${this.serverURL}rest/download/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileDownloadURL, true);
    // Manually set the authorization header, seems to work.
    xhr.setRequestHeader(
      'Authorization',
      `Basic ${btoa(this.loginService.getTicket())}`
    );
    xhr.responseType = 'blob';
    // tslint:disable-next-line:only-arrow-functions
    xhr.onload = (_e) => {
      saveAs(xhr.response, name);
    };
    xhr.send();
  }

  public saveUrlAs(url: string, name: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // Manually set the authorization header, seems to work.
    xhr.setRequestHeader(
      'Authorization',
      `Basic ${btoa(this.loginService.getTicket())}`
    );
    xhr.responseType = 'blob';
    // tslint:disable-next-line:only-arrow-functionsc
    xhr.onload = (_e) => {
      saveAs(xhr.response, name);
    };
    xhr.send();
  }

  public async saveUrlAsync(url: string, name: string) {
    let headers = new HttpHeaders();
    // authentication (basicAuth) required
    headers = headers.set(
      'Authorization',
      `Basic ${btoa(this.loginService.getTicket())}`
    );

    const res = await this.httpClient
      .get<Blob>(url, {
        withCredentials: true,
        headers: headers,
        responseType: 'blob' as 'json',
      })
      .toPromise();

    if (res) {
      saveAs(res, name);
    }
  }
}
