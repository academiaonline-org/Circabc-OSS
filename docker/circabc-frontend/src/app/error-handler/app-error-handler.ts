import { ErrorHandler, Injectable, Injector } from '@angular/core';
import {} from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: Error) {
    super.handleError(error);
    const uiMessageService: UiMessageService = this.injector.get<
      UiMessageService
    >(UiMessageService);
    if (error.stack) {
      uiMessageService.addErrorMessage(error.stack, false);
    }
  }
}
