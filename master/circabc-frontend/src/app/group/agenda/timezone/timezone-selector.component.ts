// tslint:disable:no-any
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  SupportedTimezones,
  TimezoneEntry,
} from 'app/group/agenda/timezones/supported-timezones';

@Component({
  selector: 'cbc-timezone-selector',
  templateUrl: './timezone-selector.component.html',
  styleUrls: ['./timezone-selector.component.scss'],
  preserveWhitespaces: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => TimezoneSelectorComponent),
    },
  ],
})
export class TimezoneSelectorComponent implements OnInit, ControlValueAccessor {
  public availableTimezones!: TimezoneEntry[];
  @Input()
  public selectedTimezone!: string;
  @Output()
  public readonly changedTimezone: EventEmitter<string> = new EventEmitter();

  @Input()
  public disable = false;

  // impement ControlValueAccessor interface instance fileds
  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-empty
  onChange = (_: any) => {};
  // tslint:disable-next-line:no-empty
  onTouched = () => {};

  // tslint:disable-next-line:no-any
  writeValue(value: any) {
    if (value) {
      this.selectedTimezone = value;
    } else {
      this.selectedTimezone = SupportedTimezones.defaultTimezone.value;
    }
  }

  // tslint:disable-next-line:no-any
  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public ngOnInit(): void {
    this.availableTimezones = SupportedTimezones.availableTimezones;
  }

  public onTimezoneChange(value: string) {
    //    let tz = this.availableTimezones.find((te) => te.id === value);
    if (this.onChange) {
      this.onChange(value);
    }
    this.changedTimezone.emit(value);
  }
}
