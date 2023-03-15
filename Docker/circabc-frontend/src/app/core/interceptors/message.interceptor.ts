// tslint:disable:no-any
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionUrl } from 'app/action-result';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getErrorTranslation, getSuccessTranslation } from 'app/core/util';
import { environment } from 'environments/environment';

/**
 * HTTP Interceptor that show succes or error dialog when
 * POST PUT or DELETE HTTP requests are executed
 *
 * @export
 */
@Injectable()
export class MessageInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isAresBridgeRequest(req)) {
      return next.handle(req);
    }
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'DELETE'
    ) {
      const actionType = ActionUrl.getActionType(req.urlWithParams, req.method);
      if (actionType === undefined) {
        return next.handle(req);
      }
      // tslint:disable-next-line:no-console
      console.log('processing request', req);
      const translateService: TranslateService = this.injector.get<
        TranslateService
      >(TranslateService);
      const uiMessageService: UiMessageService = this.injector.get<
        UiMessageService
      >(UiMessageService);

      return next
        .handle(req)
        .pipe(
          tap((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
              // tslint:disable-next-line:no-console
              console.log('processing response', ev);
              // tslint:disable-next-line:no-floating-promises
              translateService
                .get(getSuccessTranslation(actionType))
                .toPromise()
                .then((text: string) => {
                  uiMessageService.addSuccessMessage(text, true);
                });
            }
          })
        )
        .pipe(
          catchError((response) => {
            if (response instanceof HttpErrorResponse) {
              //  in order to get error message from server use response.error.message)
              // tslint:disable-next-line:no-console
              console.log('Processing http error', response);
              const errorLabel = getErrorTranslation(actionType);
              const errorLabelStatus = `${errorLabel}.${response.status}`;
              // tslint:disable-next-line:no-floating-promises
              translateService
                .get(errorLabelStatus)
                .toPromise()
                .then((text: string) => {
                  if (errorLabelStatus !== text) {
                    uiMessageService.addErrorMessage(text, true);
                  } else {
                    translateService
                      .get(errorLabel)
                      .toPromise()
                      .then((defautText: string) => {
                        uiMessageService.addErrorMessage(defautText, true);
                      });
                  }
                });
            }
            return throwError(response);
          })
        );
    } else {
      return next.handle(req);
    }
  }

  private isAresBridgeRequest(req: HttpRequest<{}>): boolean {
    return (
      environment.aresBridgeEnabled &&
      req.url.startsWith(environment.aresBridgeServer)
    );
  }
}
