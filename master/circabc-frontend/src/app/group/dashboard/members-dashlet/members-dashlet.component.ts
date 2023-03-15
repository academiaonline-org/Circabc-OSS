import { Component, Input, OnInit } from '@angular/core';
import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import { InterestGroup, MembersService } from 'app/core/generated/circabc';
import { MemberCount } from 'app/core/generated/circabc/model/memberCount';

@Component({
  selector: 'cbc-members-dashlet',
  templateUrl: './members-dashlet.component.html',
  styleUrls: ['./members-dashlet.component.scss'],
  preserveWhitespaces: true,
})
export class MembersDashletComponent implements OnInit {
  @Input()
  group!: InterestGroup;

  public loading = false;
  public restCallError = false;
  public nbMembers: number | undefined = 0;
  public nbApplicants = 0;

  constructor(
    private membersService: MembersService,
    private permEvalService: PermissionEvaluatorService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.restCallError = false;
    try {
      if (this.group.id) {
        const memberCount: MemberCount = await this.membersService
          .getMemberCount(this.group.id)
          .toPromise();
        this.nbMembers = memberCount.count;

        if (this.isDirAdmin()) {
          const applicants = await this.membersService
            .getApplicant(this.group.id)
            .toPromise();
          this.nbApplicants = applicants.length;
        }
      }
    } catch (error) {
      console.error('problem retrieving the number of members');
      this.restCallError = true;
    }

    this.loading = false;
  }

  public isDirAdmin(): boolean {
    return this.permEvalService.isDirAdmin(this.group);
  }
}
