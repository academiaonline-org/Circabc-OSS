import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AdminContactRequest,
  Category,
  CategoryService,
  Header,
  HeaderService,
} from 'app/core/generated/circabc';
import { I18nPipe } from 'app/shared/pipes/i18n.pipe';

@Component({
  selector: 'cbc-contact-category',
  templateUrl: './contact-category.component.html',
  styleUrls: ['./contact-category.component.scss'],
  preserveWhitespaces: true,
})
export class ContactCategoryComponent implements OnInit {
  public form!: FormGroup;
  public processing = false;
  public categories: Category[] = [];
  public selectedCategory!: Category;
  public headers: Header[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private headerService: HeaderService,
    private i18nPipe: I18nPipe
  ) {}

  async ngOnInit() {
    this.form = this.fb.group(
      {
        header: [undefined, Validators.required],
        category: [undefined, Validators.required],
        messageContent: ['', Validators.required],
        sendCopy: false,
      },
      {
        updateOn: 'change',
      }
    );

    await this.loadHeaders();

    this.listenHeaderChange();
    this.listenCategoryChange();
  }

  listenHeaderChange() {
    const headerControl = this.form.get('header');
    if (headerControl) {
      headerControl.valueChanges.forEach((
        value: string // tslint:disable-line
      ) => this.loadCategories(value));
    }
  }

  listenCategoryChange() {
    const categoryControl = this.form.get('category');
    if (categoryControl) {
      categoryControl.valueChanges.forEach((value: string) => {
        // tslint:disable-line
        for (const categ of this.categories) {
          if (categ.id === value) {
            this.selectedCategory = categ;
          }
        }
      });
    }
  }

  async loadHeaders() {
    this.headers = await this.headerService.getHeaders().toPromise();
  }

  async loadCategories(id: string) {
    if (id) {
      this.categories = await this.headerService
        .getCategoriesByHeaderId(id)
        .toPromise();
    }
  }

  getNameOrTitle(category: Category): string {
    if (category.title && Object.keys(category.title).length > 0) {
      return this.i18nPipe.transform(category.title);
    } else {
      return category.name;
    }
  }

  async contact() {
    this.processing = true;
    try {
      const body: AdminContactRequest = {
        content: this.form.value.messageContent,
        sendCopy: this.form.value.sendCopy,
      };

      await this.categoryService
        .contactCategoryAdmins(this.form.value.category, body)
        .toPromise();
    } catch (error) {
      console.error(error);
    }
    this.processing = false;
  }
}
