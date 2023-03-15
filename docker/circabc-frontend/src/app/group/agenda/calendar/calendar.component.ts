import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

import { PermissionEvaluatorService } from 'app/core/evaluator/permission-evaluator.service';
import {
  EventItemDefinition,
  EventsService,
  Node as ModelNode,
} from 'app/core/generated/circabc';
import { NodesService } from 'app/core/generated/circabc/api/nodes.service';
import { UiMessageService } from 'app/core/message/ui-message.service';
import {
  eventsStartTimeComparator,
  getFullDate,
  translateOccurrenceRate,
} from 'app/core/util';

interface CalendarDayType {
  type: string;
  date: Date;
  events: EventItemDefinition[];
  showDetailsBox: boolean;
}

@Component({
  selector: 'cbc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  preserveWhitespaces: true,
})
export class CalendarComponent implements OnChanges, OnInit {
  public dayNames = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };

  @Input()
  public date!: Date;
  @Output()
  public readonly popupCreateEventEmitter = new EventEmitter();
  @Output()
  public readonly popupDeleteEventEmitter = new EventEmitter();
  @Input()
  public igId!: string;
  @Input()
  public eventRootId: string | undefined;
  // property used to fire the ngOnChanges event when toggled for redisplay (new event/meeting has been added)
  // property used to fire the ngOnChanges event when toggled for redisplay (new event/meeting has been added)
  @Input()
  public redisplay!: boolean;

  public eventRootNode!: ModelNode;

  private firstOfMonth!: Date;
  private lastOfMonth!: Date;

  public calendarDays!: CalendarDayType[];
  private todaysDate!: Date;

  public processing = false;
  @Output()
  public readonly processingEventEmitter = new EventEmitter<string>();

  public static convertDate(str: string): string {
    const mnths: { [x: string]: string } = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    const date = str.split(' ');

    return [date[3], mnths[date[1]], date[2]].join('-');
  }

  public constructor(
    private eventsService: EventsService,
    private nodesService: NodesService,
    private permEvalService: PermissionEvaluatorService,
    private uiMessageService: UiMessageService
  ) {}

  public async ngOnInit() {
    if (this.eventRootId) {
      this.eventRootNode = await this.nodesService
        .getNode(this.eventRootId)
        .toPromise();
    }
  }

  // tslint:disable-next-line:no-unused-variable
  public async ngOnChanges(_changes: { [propKey: string]: SimpleChange }) {
    await this.initDays();
  }

  public async initDays() {
    const todaysDateTime = new Date();
    this.todaysDate = new Date(
      todaysDateTime.getFullYear(),
      todaysDateTime.getMonth(),
      todaysDateTime.getDate()
    );
    this.firstOfMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    );
    this.lastOfMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    );
    await this.getCalendarDays();
  }

  public isToday(item: CalendarDayType): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const givenDay = item.date;
    givenDay.setHours(0, 0, 0, 0);
    return today.getTime() === givenDay.getTime();
  }

  public isWeekendDay(item: CalendarDayType) {
    const weekDay: number = item.date.getDay();
    return weekDay === 0 || weekDay === 6;
  }

  public async getEvents(startDate: Date, endDate: Date) {
    return await this.eventsService
      .getInterestGroupEvents(
        this.igId,
        getFullDate(startDate),
        getFullDate(endDate)
      )
      .toPromise();
  }

  // collect the events that happen on the given day
  private getEventsForDate(collectedEvents: EventItemDefinition[], date: Date) {
    const events: EventItemDefinition[] = [];

    for (const event of collectedEvents) {
      if (
        event.appointmentDate !== undefined &&
        event.appointmentDate.toString() ===
          CalendarComponent.convertDate(date.toDateString())
      ) {
        events.push(event);
      }
    }

    return events;
  }

  private async getCalendarDays() {
    try {
      this.processing = true;

      const calDays: CalendarDayType[] = [];

      // get the last days of the previous month and events
      const previousMonthDaysForFirstWeek: Date[] = this.previousMonthDaysForFirstWeek();
      const nextMonthDaysForLastWeek: Date[] = this.nextMonthDaysForLastWeek();

      let firstCalendarDay: Date = previousMonthDaysForFirstWeek[0];

      if (firstCalendarDay === undefined) {
        firstCalendarDay = this.firstOfMonth;
      }

      let lastCalendarDay: Date =
        nextMonthDaysForLastWeek[nextMonthDaysForLastWeek.length - 1];

      // in case the current month completes the calendar
      if (lastCalendarDay === undefined) {
        lastCalendarDay = this.lastOfMonth;
      }

      lastCalendarDay.setHours(23, 59, 59, 999);

      const collectedEvents: EventItemDefinition[] = await this.getEvents(
        firstCalendarDay,
        lastCalendarDay
      );

      for (const d of previousMonthDaysForFirstWeek) {
        const dayEvents: EventItemDefinition[] = this.getEventsForDate(
          collectedEvents,
          d
        );
        calDays.push({
          type: 'previousMonth',
          date: d,
          events: dayEvents,
          showDetailsBox: false,
        });
      }

      // get the days of the month and events
      const tmpDate = new Date(this.firstOfMonth.getTime());
      while (tmpDate <= this.lastOfMonth) {
        const dayEvents2: EventItemDefinition[] = this.getEventsForDate(
          collectedEvents,
          tmpDate
        );
        calDays.push({
          type: 'currentMonth',
          date: new Date(tmpDate.getTime()),
          events: dayEvents2,
          showDetailsBox: false,
        });
        tmpDate.setDate(tmpDate.getDate() + 1);
      }

      // get the first days of the next month and events
      for (const d of nextMonthDaysForLastWeek) {
        const dayEvents3: EventItemDefinition[] = this.getEventsForDate(
          collectedEvents,
          d
        );
        calDays.push({
          type: 'nextMonth',
          date: d,
          events: dayEvents3,
          showDetailsBox: false,
        });
      }

      this.sortCalDaysEvents(calDays);
      this.calendarDays = calDays;

      this.processing = false;
      this.processingEventEmitter.emit('month');
    } catch (error) {
      const jsonError = JSON.parse(error.error);
      if (jsonError) {
        this.uiMessageService.addErrorMessage(jsonError.message);
      }
    }
  }

  private sortCalDaysEvents(calDays: CalendarDayType[]) {
    for (const calDay of calDays) {
      calDay.events.sort(eventsStartTimeComparator);
    }
  }

  private previousMonthDaysForFirstWeek(): Date[] {
    const lastMonthDays: Date[] = [];

    if (this.firstOfMonth.getDay() !== 1) {
      let mondayOfWeek = new Date(
        this.firstOfMonth.getFullYear(),
        this.firstOfMonth.getMonth(),
        this.firstOfMonth.getDate() - this.firstOfMonth.getDay() + 1
      );

      if (this.firstOfMonth.getDay() === 0) {
        const sixDays = 6;
        mondayOfWeek = new Date(
          this.firstOfMonth.getFullYear(),
          this.firstOfMonth.getMonth(),
          this.firstOfMonth.getDate() - sixDays
        );
      }

      const tmpDate = mondayOfWeek;
      while (tmpDate < this.firstOfMonth) {
        lastMonthDays.push(new Date(tmpDate.getTime()));
        tmpDate.setDate(tmpDate.getDate() + 1);
      }
    }

    return lastMonthDays;
  }

  private nextMonthDaysForLastWeek(): Date[] {
    const nextMonthDays: Date[] = [];

    if (this.lastOfMonth.getDay() !== 0) {
      const tmpDate = new Date(this.lastOfMonth.getTime());
      tmpDate.setDate(tmpDate.getDate() + 1);
      while (tmpDate.getDay() !== 0) {
        nextMonthDays.push(new Date(tmpDate.getTime()));
        tmpDate.setDate(tmpDate.getDate() + 1);
      }
      nextMonthDays.push(new Date(tmpDate.getTime()));
    }

    return nextMonthDays;
  }

  /**
   * Used to check if we should display the + sign on the date for the
   * events to avoid to allow creating an event before in time.
   */
  public checkIfDateAfterToday(calendarSheetDate: Date): boolean {
    return this.todaysDate <= calendarSheetDate;
  }

  public onPopupCreateEventWithCalendarDate(calendarSheetDate: Date): void {
    this.popupCreateEventEmitter.emit(calendarSheetDate);
  }

  public deleteEvent(event: EventItemDefinition) {
    this.popupDeleteEventEmitter.emit(event);
  }

  public enableDetailsBox(date: Date) {
    for (const calendarDay of this.calendarDays) {
      if (calendarDay.date === date && calendarDay.events.length > 0) {
        calendarDay.showDetailsBox = true;
        return;
      }
    }
  }

  public disableDetailsBox(date: Date) {
    for (const calendarDay of this.calendarDays) {
      if (calendarDay.date === date) {
        calendarDay.showDetailsBox = false;
        return;
      }
    }
  }

  public getRepetition(occurrenceRate: string | undefined): string[] {
    return translateOccurrenceRate(occurrenceRate);
  }

  public isEveAdmin(): boolean {
    return this.permEvalService.isEveAdmin(this.eventRootNode);
  }
}
