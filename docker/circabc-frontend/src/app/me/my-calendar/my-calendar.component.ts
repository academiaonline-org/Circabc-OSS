import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AgendaHelperService } from 'app/core/agenda-helper.service';
import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import {
  EventsService,
  NodesService,
  UserService,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import {
  getFormattedDate as getFormattedDateGlobal,
  getFullDate,
} from 'app/core/util';
import { CalendarComponent } from 'app/group/agenda/calendar/calendar.component';

@Component({
  selector: 'cbc-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  preserveWhitespaces: true,
})
export class MyCalendarComponent
  extends CalendarComponent
  implements OnInit, OnChanges {
  public view!: string;
  public workWeek = true;
  public from!: number;
  public to!: number;

  public monthNames: { [key: string]: string } = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  public completeDayNames: { [key: string]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  public changeDateForm!: FormGroup;

  // tslint:disable-next-line:no-access-missing-member
  public constructor(
    private userService: UserService,
    private loginService: LoginService,
    private agendaHelperService: AgendaHelperService,
    eventsService: EventsService,
    nodesService: NodesService,
    permEvalService: PermissionEvaluatorService,
    uiMessageService: UiMessageService,
    private fb: FormBuilder
  ) {
    super(eventsService, nodesService, permEvalService, uiMessageService);
  }

  async ngOnInit() {
    this.date = new Date();
    this.workWeek = true;
    this.view = this.agendaHelperService.getMyCalendarViewState();
    this.initDayHourDisplayRange();
    await super.initDays();

    this.changeDateForm = this.fb.group(
      {
        dateDayView: [this.date],
      },
      {
        updateOn: 'change',
      }
    );
  }

  private initDayHourDisplayRange() {
    this.from = 8;
    this.to = 21;
  }

  public async getEvents(startDate: Date, _endDate: Date) {
    return await this.userService
      .getUserEventsPeriod(this.getUserId(), getFullDate(startDate), 'Future')
      .toPromise();
  }

  private getUserId(): string {
    return this.loginService.getCurrentUsername();
  }

  public selectView(value: string) {
    this.view = value;
    this.agendaHelperService.saveMyCalendarViewState(value);
    if (this.view === 'day') {
      this.initDayHourDisplayRange();
    }
  }

  public selectFrom(value: string) {
    this.from = Number(value);
  }

  public selectTo(value: string) {
    this.to = Number(value);
  }

  public toggleWorkWeek() {
    this.workWeek = !this.workWeek;
  }

  public getFormattedDate() {
    return getFormattedDateGlobal(this.date);
  }

  public applyToCurrentDate() {
    if (this.changeDateForm.value.dateDayView !== undefined) {
      this.date = this.changeDateForm.value.dateDayView;
    }
  }

  // navigate through days and months

  public async nextMonth() {
    const tmp = new Date(this.date.getTime());
    tmp.setMonth(tmp.getMonth() + 1);
    this.date = new Date(tmp.getTime());
    await super.initDays();
  }

  public async previousMonth() {
    const tmp = new Date(this.date.getTime());
    tmp.setMonth(tmp.getMonth() - 1);
    this.date = new Date(tmp.getTime());
    await super.initDays();
  }

  public async nextDay() {
    await this.getDays(1);
  }

  public async previousDay() {
    await this.getDays(-1);
  }

  public async previousWeek() {
    await this.getDays(-7);
  }

  public async nextWeek() {
    await this.getDays(7);
  }
  private async getDays(numberOfDays: -7 | -1 | 1 | 7) {
    const tmp = new Date(this.date.getTime());
    tmp.setDate(tmp.getDate() + numberOfDays);
    this.date = new Date(tmp.getTime());
    await super.initDays();
  }
}
