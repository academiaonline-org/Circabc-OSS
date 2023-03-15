import { NgModule } from '@angular/core';

// tslint:disable-next-line:no-relative-imports
import { SwUpdatesService } from './sw-updates.service';

@NgModule({
  providers: [SwUpdatesService],
})
export class SwUpdatesModule {}
