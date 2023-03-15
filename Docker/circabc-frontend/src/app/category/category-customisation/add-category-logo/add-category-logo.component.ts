import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result/index';

import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { imageExtensionValid } from 'app/core/util';

@Component({
  selector: 'cbc-add-category-logo',
  templateUrl: './add-category-logo.component.html',
  styleUrls: ['./add-category-logo.component.scss'],
  preserveWhitespaces: true,
})
export class AddCategoryLogoComponent implements OnInit {
  @Input()
  categoryId!: string;
  @Input()
  showModal = false;
  @Output()
  readonly modalHide = new EventEmitter<ActionEmitterResult>();

  public processing = false;
  public logoForm!: FormGroup;
  public filesToUpload: File[] = [];

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private uiMessageService: UiMessageService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.logoForm = this.fb.group({
      file: [],
    });
  }

  public cancel() {
    this.showModal = false;
    this.filesToUpload = [];
    const res: ActionEmitterResult = {};
    this.modalHide.emit(res);
  }

  public async uploadLogo() {
    this.processing = true;
    const res: ActionEmitterResult = {};
    res.type = ActionType.ADD_CATEGORY_LOGO;

    try {
      await this.categoryService
        .postCategoryLogoByCategoryId(this.categoryId, this.filesToUpload[0])
        .toPromise();

      res.result = ActionResult.SUCCEED;
      this.filesToUpload = [];
      this.showModal = false;
    } catch (error) {
      const result = await this.translateService
        .get('error.image.upload')
        .toPromise();
      this.uiMessageService.addInfoMessage(result);
      res.result = ActionResult.FAILED;
    }

    this.modalHide.emit(res);
    this.processing = false;
  }

  // tslint:disable-next-line:no-any
  public fileChangeEvent(fileInput: any) {
    const filesList = fileInput.target.files as FileList;
    this.handleFiles(filesList);
  }

  private handleFiles(filesList: FileList) {
    this.filesToUpload = [];
    for (let i = 0; i < filesList.length; i += 1) {
      const fileItem = filesList.item(i);
      if (fileItem) {
        this.filesToUpload.push(fileItem);
      }
    }
  }

  public getFileName() {
    if (this.filesToUpload && this.filesToUpload.length > 0) {
      return this.filesToUpload[0].name;
    } else {
      return '';
    }
  }

  public hasFile(): boolean {
    return this.filesToUpload && this.filesToUpload.length > 0;
  }

  public isValidImage(): boolean {
    return (
      this.filesToUpload &&
      this.filesToUpload.length > 0 &&
      imageExtensionValid(this.filesToUpload[0].name) &&
      this.filesToUpload[0].size <= 1 * 1024 * 1024
    );
  }
}
