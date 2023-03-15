import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  InterestGroup,
  InterestGroupService,
} from 'app/core/generated/circabc';
import { GroupReloadListenerService } from 'app/core/group-reload-listener.service';
import { ValidationService } from 'app/core/validation.service';

@Component({
  selector: 'cbc-admin-general',
  templateUrl: './admin-general.component.html',
  preserveWhitespaces: true,
})
export class AdminGeneralComponent implements OnInit {
  public ig!: InterestGroup;
  public igForm!: FormGroup;
  public saving = false;

  @ViewChild('nameInputFieldElement', { static: true })
  nameInputFieldElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private groupsService: InterestGroupService,
    private fb: FormBuilder,
    private groupReloadListenerService: GroupReloadListenerService
  ) {}

  ngOnInit() {
    this.igForm = this.fb.group(
      {
        id: [''],
        name: ['', [Validators.required, ValidationService.fileNameValidator]],
        title: [''],
        description: [''],
        contact: [''],
      },
      {
        updateOn: 'change',
      }
    );

    this.route.params.subscribe(async (params) => await this.loadIg(params));
  }

  public async loadIg(params: { [key: string]: string }) {
    const id = params.id;

    if (id) {
      this.ig = await this.groupsService.getInterestGroup(id).toPromise();

      this.igForm.patchValue({ id: this.ig.id });
      this.igForm.patchValue({ name: this.ig.name });
      this.igForm.patchValue({ title: this.ig.title });
      this.igForm.patchValue({ description: this.ig.description });
      this.igForm.patchValue({ contact: this.ig.contact });
    }

    this.nameInputFieldElement.nativeElement.focus();
  }

  public async cancel() {
    await this.loadIg({ id: this.ig.id as string });
  }

  public async save() {
    if (this.igForm.valid) {
      this.saving = true;
      const body = this.igForm.value;
      try {
        await this.groupsService
          .putInterestGroup(this.ig.id as string, body)
          .toPromise();
        await this.loadIg({ id: this.ig.id as string });
        if (this.ig.id) {
          this.groupReloadListenerService.propagateGroupRefresh(this.ig.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.saving = false;
      }
    }
  }

  get nameControl(): AbstractControl {
    return this.igForm.controls.name;
  }
}
