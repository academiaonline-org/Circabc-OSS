import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiMessageRendererComponent } from 'app/core/message/ui-message.renderer.component';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { UiMessageSystemComponent } from 'app/core/message/ui-message.system.component';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [UiMessageSystemComponent, UiMessageRendererComponent],
  declarations: [UiMessageSystemComponent, UiMessageRendererComponent],
  providers: [UiMessageService],
})
export class UiMessageModule {}
