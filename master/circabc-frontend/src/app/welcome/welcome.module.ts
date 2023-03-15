import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FooterComponent } from 'app/welcome/footer/footer.component';
import { WelcomeRoutingModule } from 'app/welcome/welcome-routing.module';
import { WelcomeComponent } from 'app/welcome/welcome.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [SharedModule, WelcomeRoutingModule],
  exports: [],
  declarations: [FooterComponent, WelcomeComponent],
  providers: [CookieService],
})
export class WelcomeModule {}
