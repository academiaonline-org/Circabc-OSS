import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { InterestGroupService } from 'app/core/generated/circabc';

@Injectable()
export class GroupDeleteGuard implements CanActivate {
  constructor(
    private router: Router,
    private groupService: InterestGroupService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const groupId = route.paramMap.get('id');
    if (groupId) {
      const group = await this.groupService
        .getInterestGroup(groupId)
        .toPromise();
      if (group && group.permissions && group.permissions.IgDelete === 'true') {
        return true;
      }
    }

    this.router.navigate(['/denied']);
    return false;
  }
}
