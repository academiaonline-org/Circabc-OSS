import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import {
  ContentService,
  MultilingualAspectMetadata,
  Node as ModelNode,
} from 'app/core/generated/circabc';
import { UiMessageService } from 'app/core/message/ui-message.service';
import { getErrorTranslation } from 'app/core/util';

@Component({
  selector: 'cbc-enable-multilingual',
  templateUrl: './enable-multilingual.component.html',
  preserveWhitespaces: true,
})
export class EnableMultilingualComponent implements OnInit {
  @Input()
  showModal = false;
  @Input()
  targetNode!: ModelNode;
  @Output()
  readonly modalCanceled = new EventEmitter<ActionEmitterResult>();
  @Output()
  readonly mutlilingualEnabled = new EventEmitter<ActionEmitterResult>();

  public enableMultilingualForm!: FormGroup;
  public processing = false;

  constructor(
    private uiMessageService: UiMessageService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.enableMultilingualForm = this.fb.group(
      {
        author: ['', Validators.required],
        lang: [this.translateService.defaultLang, Validators.required],
      },
      {
        updateOn: 'change',
      }
    );
  }

  async enableMultilingual() {
    if (this.targetNode.id) {
      this.processing = true;
      const data: MultilingualAspectMetadata = {};
      data.pivotLang = this.enableMultilingualForm.value.lang;
      data.author = this.enableMultilingualForm.value.author;

      const result: ActionEmitterResult = {};
      result.type = ActionType.ENABLE_MULTILINGUAL;

      try {
        await this.contentService
          .postMultilingualAspect(this.targetNode.id, data)
          .toPromise();
        result.result = ActionResult.SUCCEED;
      } catch (error) {
        result.result = ActionResult.FAILED;
        const txt = await this.translateService
          .get(getErrorTranslation(ActionType.ENABLE_MULTILINGUAL))
          .toPromise();
        this.uiMessageService.addErrorMessage(txt, false);
      }

      this.mutlilingualEnabled.emit(result);

      this.processing = false;
    }
  }

  cancel() {
    this.processing = false;
    this.showModal = false;

    const result: ActionEmitterResult = {};
    result.result = ActionResult.CANCELED;
    result.type = ActionType.ENABLE_MULTILINGUAL;
    this.modalCanceled.emit(result);
  }

  get authorControl(): AbstractControl {
    return this.enableMultilingualForm.controls.author;
  }
}
