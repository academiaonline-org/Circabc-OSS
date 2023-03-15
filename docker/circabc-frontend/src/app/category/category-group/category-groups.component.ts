import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService, InterestGroup } from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { sortI18nProperty } from 'app/core/util';
import { I18nPipe } from 'app/shared/pipes/i18n.pipe';

@Component({
  selector: 'cbc-category-group',
  templateUrl: './category-groups.component.html',
  styleUrls: ['./category-groups.component.scss'],
})
export class CategoryGroupsComponent implements OnInit {
  public interestGroups: InterestGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private i18nPipe: I18nPipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      await this.listInterestGroups(params.id);
    });
  }

  public async listInterestGroups(categoryId: string) {
    try {
      if (categoryId) {
        const unsortedInterestGroups = await this.categoryService
          .getInterestGroupsByCategoryId(categoryId, this.getCurrentLang())
          .toPromise();
        unsortedInterestGroups.sort((a: InterestGroup, b: InterestGroup) =>
          sortI18nProperty(
            a.title,
            b.title,
            this.getDefaultLang(),
            this.getCurrentLang(),
            a.name,
            b.name
          )
        );
        this.interestGroups = unsortedInterestGroups;
      }
    } catch (err) {
      this.uiMessageService.addErrorMessage(err);
    }
  }
  getNameOrTitle(item: InterestGroup): string {
    let result = '';

    if (item.title && Object.keys(item.title).length > 0) {
      result = this.i18nPipe.transform(item.title);
    }

    if (result === '' && item.name) {
      result = item.name;
    }

    return result;
  }

  private getCurrentLang(): string {
    return this.translateService.currentLang;
  }

  private getDefaultLang(): string {
    return this.translateService.getDefaultLang();
  }
}
