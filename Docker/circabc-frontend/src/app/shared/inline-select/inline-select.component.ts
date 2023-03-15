import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
@Component({
  selector: 'cbc-inline-select',
  templateUrl: './inline-select.component.html',
  styleUrls: ['./inline-select.component.scss'],
  preserveWhitespaces: true,
})
export class InlineSelectComponent implements OnInit {
  @Input()
  values: string[] = [];
  @Input()
  translationPrefix = '';
  @Input()
  value = '';
  @Output()
  readonly selectionChanged = new EventEmitter<string>();

  public form!: FormGroup;
  public options: SelectItem[] = [];

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.options = this.getValues();

    this.form = this.fb.group({
      selectValue: '',
    });

    if (this.value !== '' && this.value !== undefined) {
      this.form.controls.selectValue.patchValue(this.value);
    }

    this.form.controls.selectValue.valueChanges.subscribe((value) => {
      this.selectionChanged.emit(value);
    });
  }

  public getValues(): SelectItem[] {
    const result: SelectItem[] = [];

    for (const v of this.values) {
      let txt = v;

      if (this.translationPrefix) {
        this.translateService
          .get(`${this.translationPrefix}.${v}`)
          .subscribe((value) => (txt = value));
      }

      const item: SelectItem = {
        value: v,
        label: txt,
      };

      result.push(item);
    }

    return result;
  }
}
