import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  HistoryService,
  UserRevocationRequest,
} from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-revocation-scheduler',
  templateUrl: './revocation-scheduler.component.html',
})
export class RevocationSchedulerComponent implements OnInit {
  @Input() showModal = false;
  @Input() userIds!: string[];
  @Output() readonly scheduled = new EventEmitter();
  @Output() readonly canceled = new EventEmitter();

  public scheduleForm!: FormGroup;
  public processing = false;

  constructor(
    private historyService: HistoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.scheduleForm = this.fb.group({
      scheduleDate: [new Date(), Validators.required],
    });
  }

  public async schedule() {
    this.processing = true;
    try {
      const body: UserRevocationRequest = {};
      body.userIds = this.userIds;
      body.revocationDate = this.scheduleForm.value.scheduleDate;
      body.action = 'revoke';
      await this.historyService.revokeUserMemberships(body).toPromise();
      this.scheduled.emit();
    } catch (error) {
      console.error(error);
    }
    this.processing = false;
  }

  public cancel() {
    this.canceled.emit();
  }
}
