import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  InterestGroup,
  InterestGroupService,
} from 'app/core/generated/circabc';

@Injectable()
export class GroupResolver implements Resolve<InterestGroup> {
  public constructor(private interestGroupService: InterestGroupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<InterestGroup> {
    const id = route.params.id;
    return this.interestGroupService.getInterestGroup(id);
  }
}
