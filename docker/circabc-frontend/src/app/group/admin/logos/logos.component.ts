import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionEmitterResult, ActionResult } from 'app/action-result';
import {
  InterestGroup,
  InterestGroupService,
  Node as ModelNode,
} from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss'],
  preserveWhitespaces: true,
})
export class LogosComponent implements OnInit {
  public group!: InterestGroup;
  public logos: ModelNode[] = [];
  public showUploadModal = false;

  constructor(
    private route: ActivatedRoute,
    private groupsService: InterestGroupService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      if (params.id) {
        await this.loadGroup(params.id);
      }
    });
  }

  private async loadGroup(id: string) {
    if (id) {
      try {
        this.group = await this.groupsService.getInterestGroup(id).toPromise();
        this.logos = await this.groupsService.getGroupLogos(id).toPromise();
      } catch (error) {
        console.error('problem getting the group logos');
      }
    }
  }

  public isSelected(id: string | undefined): boolean {
    if (id && this.group && this.group.logoUrl) {
      if (this.group.logoUrl.indexOf(id) !== -1) {
        return true;
      }
    }

    return false;
  }

  public async select(id: string | undefined) {
    if (id && this.group && this.group.id) {
      try {
        await this.groupsService.selectGroupLogo(this.group.id, id).toPromise();
        await this.loadGroup(this.group.id);
      } catch (error) {
        console.error('impossible to select the image');
      }
    }
  }

  public async delete(id: string | undefined) {
    if (id && this.group && this.group.id) {
      try {
        await this.groupsService.deleteGroupLogo(this.group.id, id).toPromise();
        await this.loadGroup(this.group.id);
      } catch (error) {
        console.error('impossible to delete the image');
      }
    }
  }

  public async refresh(res: ActionEmitterResult) {
    if (res.result === ActionResult.SUCCEED && this.group.id) {
      await this.loadGroup(this.group.id);
    }
    this.showUploadModal = false;
  }
}
