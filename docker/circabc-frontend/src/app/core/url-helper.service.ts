// tslint:disable:no-null-keyword
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlHelperService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      // tslint:disable-next-line:no-null-keyword
      let objectUrl: string | null = null;
      this.http.get(url, { responseType: 'blob' }).subscribe((m) => {
        objectUrl = URL.createObjectURL(m);
        observer.next(objectUrl);
      });
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          // tslint:disable-next-line:no-null-keyword
          objectUrl = null;
        }
      };
    });
  }
}
