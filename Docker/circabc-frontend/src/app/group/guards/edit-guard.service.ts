import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { GuardsService } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { RedirectionService } from 'app/core/redirection.service';

@Injectable()
export class NodeEditGuard implements CanActivate {
  constructor(
    private guardsService: GuardsService,
    private router: Router,
    private loginService: LoginService,
    private redirectionService: RedirectionService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    let nodeId = route.paramMap.get('nodeId');

    if (route.paramMap.get('forumId')) {
      nodeId = route.paramMap.get('forumId');
    }

    if (route.paramMap.get('topicId')) {
      nodeId = route.paramMap.get('topicId');
    }

    if (nodeId && nodeId !== '0') {
      let res;

      try {
        res = await this.guardsService.getGuardEdit(nodeId).toPromise();
      } catch (error) {
        console.error(error);
      }
      if (res === null) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['/no-content']);
      } else if (res !== undefined) {
        if (res.granted === false) {
          if (this.loginService.isGuest()) {
            this.redirectionService.mustRedirect();
          }
          // tslint:disable-next-line:no-floating-promises
          this.router.navigate(['/denied']);
        }
        if (res.granted !== undefined) {
          return res.granted;
        }
      }
    }

    return false;
  }
}
