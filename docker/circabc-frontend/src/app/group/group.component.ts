import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { InterestGroup } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { VisitedGroupService } from 'app/core/visited-groups/visited-group.service';

@Component({
  selector: 'cbc-group',
  templateUrl: './group.component.html',
  preserveWhitespaces: true,
})
export class GroupComponent implements OnInit {
  public group!: InterestGroup;

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private visitedGroupService: VisitedGroupService
  ) {}

  public ngOnInit() {
    this.route.data.subscribe((value: Data) => {
      this.group = value.group;
      this.visitedGroupService.visitGroup(this.group);
    });
  }

  public isAccessingAsVisitor(): boolean {
    return this.loginService.isGuest();
  }
}
