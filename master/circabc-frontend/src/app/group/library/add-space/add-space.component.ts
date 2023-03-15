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
import { ActionService } from 'app/action-result/action.service';
import { PagedNodes, SpaceService } from 'app/core/generated/circabc';
// tslint:disable-next-line:no-duplicate-imports
import { Node as ModelNode } from 'app/core/generated/circabc';
import { removeNulls } from 'app/core/util';
import { ValidationService } from 'app/core/validation.service';

@Component({
  selector: 'cbc-add-space',
  templateUrl: './add-space.component.html',
  preserveWhitespaces: true,
})
export class AddSpaceComponent implements OnInit {
  @Input()
  public showWizard!: boolean;
  @Input()
  public parentNode!: ModelNode;
  @Output()
  public readonly modalHide = new EventEmitter<ActionEmitterResult>();

  public contents!: PagedNodes;
  public createSpaceForm!: FormGroup;
  public creating = false;

  public constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private translateService: TranslateService,
    private actionService: ActionService
  ) {}

  public async ngOnInit() {
    this.contents = await this.spaceService
      .getChildren(
        this.parentNode.id as string,
        this.translateService.currentLang,
        false,
        -1,
        1,
        'modified_DESC',
        false,
        false
      )
      .toPromise();

    if (this.contents !== undefined) {
      this.buildForm();
    }
  }

  public buildForm(): void {
    this.createSpaceForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            ValidationService.nameValidator,
            (control: AbstractControl) =>
              ValidationService.fileFolderExistsValidator(
                control,
                this.contents.data
              ),
            // more or less equivalent to:
            // function funcValidator(control: AbstractControl) { ValidationService.fileFolderExistsValidator(control, this.contents) }
            // the executor runs every validator of the array passing the control only,
            // so I encapsulate the control passing in a function to add the additional parameter (this.contents) as I need it
          ],
        ],
        description: [''],
        title: [''],
      },
      {
        updateOn: 'change',
      }
    );
  }

  public cancelWizard(_action: string): void {
    this.showWizard = false;

    this.createSpaceForm.reset();

    const result: ActionEmitterResult = {};
    result.result = ActionResult.CANCELED;
    result.type = ActionType.CREATE_SPACE;

    this.modalHide.emit(result);
  }

  public async createSpace() {
    this.creating = true;
    if (this.parentNode.id !== undefined) {
      if (this.createSpaceForm.valid) {
        const result: ActionEmitterResult = {};
        result.type = ActionType.CREATE_SPACE;
        try {
          const spaceNode: ModelNode = {
            id: '',
            name: this.createSpaceForm.value.name,
            description: removeNulls(this.createSpaceForm.value.description),
            title: removeNulls(this.createSpaceForm.value.title),
          };
          const response = await this.spaceService
            .postSubspace(this.parentNode.id, spaceNode)
            .toPromise();
          this.createSpaceForm.reset();
          this.showWizard = false;
          result.node = response;
          result.result = ActionResult.SUCCEED;
        } catch (error) {
          result.result = ActionResult.FAILED;
        }
        this.modalHide.emit(result);
        this.actionService.propagateActionFinished(result);
      }
    }
    this.creating = false;
  }

  get nameControl(): AbstractControl {
    return this.createSpaceForm.controls.name;
  }
}
