// tslint:disable:no-any
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { Encodings } from 'app/group/library/encodings/encodings';

@Component({
  selector: 'cbc-encoding-input',
  templateUrl: './encoding-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => EncodingInputComponent),
    },
  ],
  preserveWhitespaces: true,
})
export class EncodingInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  disabled = false;
  form!: FormGroup;

  // impement ControlValueAccessor interface
  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-empty
  onChange = (_: any) => {};
  // tslint:disable-next-line:no-empty
  onTouched = () => {};

  // tslint:disable-next-line:no-any
  writeValue(value: any) {
    if (value) {
      this.form.patchValue({ encoding: value });
    }
  }

  // tslint:disable-next-line:no-any
  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        encoding: '',
      },
      {
        updateOn: 'change',
      }
    );

    this.form.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });

    if (this.disabled) {
      this.form.controls.encoding.disable();
    }
  }

  getAvailableEncodings() {
    return Encodings.availableEncodings;
  }
}
