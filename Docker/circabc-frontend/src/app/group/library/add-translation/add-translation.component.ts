import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  ContentService,
  Node as ModelNode,
  NodesService,
  Translations,
  TranslationsService,
} from 'app/core/generated/circabc';

import { TranslateService } from '@ngx-translate/core';
import { UiMessageService } from 'app/core/message/ui-message.service';

@Component({
  selector: 'cbc-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss'],
  preserveWhitespaces: true,
})
export class AddTranslationComponent implements OnInit {
  public addTranslationForm!: FormGroup;
  public id!: string;
  public myfile!: File;
  public loading = false;
  public processing = false;
  public currentNode!: ModelNode;
  public translations!: Translations;
  private mode: 'FILE_UPLOAD' | 'MACHINE_TRANSLATION' | undefined;
  private validExtensions = [
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'odt',
    'rtf',
    'txt',
    'html',
    'tmx',
    'xliff',
    'pdf',
  ];
  public disabledLangs: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private nodesService: NodesService,
    private translationsService: TranslationsService,
    private uiMessageService: UiMessageService,
    private translateService: TranslateService,
    private contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => this.loadNode(params.nodeId));
    this.addTranslationForm = this.fb.group({
      lang: [],
    });
  }

  async loadNode(id: string) {
    this.loading = true;
    this.id = id;
    this.currentNode = await this.nodesService.getNode(this.id).toPromise();
    this.translations = await this.contentService
      .getTranslations(this.id)
      .toPromise();
    this.prepareDisabledLang();
    this.loading = false;
  }

  getNbTranslations(): number {
    if (this.translations && this.translations.translations) {
      return this.translations.translations.length - 1;
    }

    return 0;
  }

  // tslint:disable-next-line:no-any
  fileChangeEvent(fileInput: any) {
    this.myfile = fileInput.target.files[0];
  }

  setModeFileUpload() {
    this.mode = 'FILE_UPLOAD';
  }

  isModeFileUpload() {
    return this.mode === 'FILE_UPLOAD';
  }

  setModeMachineTranslation() {
    this.mode = 'MACHINE_TRANSLATION';
  }

  isModeMachineTranslation() {
    return this.mode === 'MACHINE_TRANSLATION';
  }
  isModeSet() {
    return this.mode !== undefined;
  }

  public async submit() {
    if (!(await this.isLanguageSelected())) {
      return;
    }
    if (!(await this.isFileSelected())) {
      return;
    }
    this.processing = true;
    await this.translationsService
      .postTranslation(this.id, this.addTranslationForm.value.lang, this.myfile)
      .toPromise();
    this.location.back();
    this.processing = false;
  }

  public async submitMachineTranlationRequest() {
    if (!(await this.isLanguageSelected())) {
      return;
    }
    if (!(await this.isValidExtension())) {
      return;
    }
    this.processing = true;
    await this.translationsService
      .postMachineTranslation(this.id, this.addTranslationForm.value.lang, true)
      .toPromise();
    this.processing = false;
    this.location.back();
  }

  public cancel() {
    this.location.back();
  }

  public prepareDisabledLang() {
    this.disabledLangs = [];

    if (this.translations && this.translations.translations) {
      for (const tr of this.translations.translations) {
        if (tr.properties && tr.properties.locale) {
          this.disabledLangs.push(tr.properties.locale);
        }
      }
    }
  }

  get labelProcessing(): string {
    let result = '';
    if (this.mode === 'FILE_UPLOAD') {
      result = 'label.saving';
    } else if (this.mode === 'MACHINE_TRANSLATION') {
      result = 'translations.request.machine.translation.sending';
    }
    return result;
  }

  get pivotLocale(): string {
    if (this.translations.pivot && this.translations.pivot.properties) {
      return this.translations.pivot.properties.locale;
    } else {
      return '';
    }
  }

  private async isLanguageSelected() {
    if (this.addTranslationForm.controls.lang.value === null) {
      const txt = await this.translateService
        .get('validation.selectLanguage')
        .toPromise();
      this.uiMessageService.addErrorMessage(txt);
      return false;
    } else {
      return true;
    }
  }

  public hasLanguageSelected() {
    if (
      this.addTranslationForm.value.lang === null ||
      this.addTranslationForm.value.lang === ''
    ) {
      return false;
    } else {
      return true;
    }
  }
  private async isFileSelected() {
    if (this.myfile === undefined || this.myfile === null) {
      const txt = await this.translateService
        .get('validation.selectFile')
        .toPromise();
      this.uiMessageService.addErrorMessage(txt);
      return false;
    } else {
      return true;
    }
  }

  public hasFileSelected() {
    if (this.myfile === undefined || this.myfile === null) {
      return false;
    } else {
      return true;
    }
  }

  private async isValidExtension() {
    const fileName = this.currentNode.name;
    if (fileName) {
      const lastIndex = fileName.lastIndexOf('.');
      if (lastIndex > -1) {
        const extension = fileName.substring(lastIndex + 1);
        if (this.validExtensions.includes(extension)) {
          return true;
        } else {
          const txt = await this.translateService
            .get('validation.invalidFileType', {
              validFileExtensions: this.validExtensions.toString(),
            })
            .toPromise();
          this.uiMessageService.addErrorMessage(txt);
          return false;
        }
      }
    }
    return true;
  }
}
