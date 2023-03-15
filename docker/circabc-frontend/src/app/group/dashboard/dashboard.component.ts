import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {
  DashboardService,
  GroupDashboard,
  InterestGroup,
  InterestGroupService,
} from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';

@Component({
  selector: 'cbc-group-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit {
  public timeline!: GroupDashboard;
  public group!: InterestGroup;
  public igId!: string;
  public loading = false;

  public displayMembersBox = false;
  public displayEventsBox = false;
  public displayForumsBox = false;
  public displayWhatsnewBox = false;

  public constructor(
    private route: ActivatedRoute,
    private interestGroupService: InterestGroupService,
    private dashboardService: DashboardService,
    private uiMessageService: UiMessageService,
    private translateService: TranslateService
  ) {}

  public ngOnInit() {
    this.route.params.subscribe(async (params) => await this.loadGroup(params));
  }

  private async loadGroup(params: { [key: string]: string }) {
    this.loading = true;
    this.igId = params.id;
    this.group = await this.interestGroupService
      .getInterestGroup(this.igId)
      .toPromise();

    this.displayWhatsnewBox =
      this.group.permissions.information !== 'InfNoAccess' ||
      this.group.permissions.library !== 'LibNoAccess';
    this.displayMembersBox = this.group.permissions.directory !== 'DirNoAccess';
    this.displayForumsBox = this.group.permissions.newsgroup !== 'NwsNoAccess';
    this.displayEventsBox = this.group.permissions.event !== 'EveNoAccess';

    if (this.displayWhatsnewBox) {
      await this.loadDashboard(this.igId);
    }
    this.loading = false;
  }

  private async loadDashboard(groupId: string) {
    try {
      this.timeline = await this.dashboardService
        .getGroupDashboard(groupId)
        .toPromise();
    } catch (error) {
      this.timeline = {};
      const res = await this.translateService
        .get('error.dashboard.read')
        .toPromise();
      this.uiMessageService.addErrorMessage(res);
    }
  }
}
