import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionEmitterResult, ActionResult } from 'app/action-result';
import {
  HelpArticle,
  HelpCategory,
  HelpService,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';

@Component({
  selector: 'cbc-help-category',
  templateUrl: './help-category.component.html',
  styleUrls: ['./help-category.component.scss'],
})
export class HelpCategoryComponent implements OnInit {
  public articles: HelpArticle[] = [];
  public categories: HelpCategory[] = [];
  public category!: HelpCategory;
  public loading = false;
  public dropdownVisible = false;
  public showCreateModal = false;
  public showDeleteModal = false;
  public showUpdateModal = false;

  constructor(
    private helpService: HelpService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      this.categories = await this.helpService.getHelpCategories().toPromise();

      this.route.params.subscribe(async (params) => {
        if (params.categoryId) {
          await this.loadCategory(params.categoryId);
        }
      });
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }

  async loadCategory(id: string) {
    this.category = await this.helpService.getHelpCategory(id).toPromise();

    if (this.category.id) {
      this.articles = await this.helpService
        .getCategoryArticles(this.category.id, true)
        .toPromise();
    }
  }

  public isAdminOrSupport(): boolean {
    if (!this.loginService.isGuest()) {
      const user = this.loginService.getUser();
      return (
        user.properties !== undefined &&
        (user.properties.isAdmin === 'true' ||
          user.properties.isCircabcAdmin === 'true')
      );
    }

    return false;
  }

  public async refresh(res: ActionEmitterResult) {
    if (res.result === ActionResult.SUCCEED && this.category.id) {
      await this.loadCategory(this.category.id);
    }
  }

  public async reload(res: ActionEmitterResult) {
    if (res.result === ActionResult.SUCCEED && this.category.id) {
      this.categories = await this.helpService.getHelpCategories().toPromise();
      await this.loadCategory(this.category.id);
    }
  }

  public async redirect() {
    // tslint:disable-next-line:no-floating-promises
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
