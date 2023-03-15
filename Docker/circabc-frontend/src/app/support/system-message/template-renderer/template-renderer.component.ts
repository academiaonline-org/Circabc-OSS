import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppMessage, AppMessageService } from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-template-renderer',
  templateUrl: './template-renderer.component.html',
  styleUrls: ['./template-renderer.component.scss'],
  preserveWhitespaces: true,
})
export class TemplateRendererComponent {
  @Input()
  template!: AppMessage;
  @Output()
  readonly delete = new EventEmitter();

  constructor(private appMessageService: AppMessageService) {}

  public async onDelete() {
    if (this.template && this.template.id) {
      try {
        await this.appMessageService
          .deleteAppMessageTemplate(`${this.template.id}`)
          .toPromise();
      } catch (error) {
        console.error('problem when deleting a template');
      }

      this.delete.emit();
    }
  }

  public async useAsOldMessage() {
    try {
      await this.appMessageService.setOldMessage(this.template).toPromise();
    } catch (error) {
      console.error(error);
    }
  }
}
