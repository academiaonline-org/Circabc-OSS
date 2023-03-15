import { Component, Input } from '@angular/core';
import { SaveAsService } from 'app/core/save-as.service';

@Component({
  selector: 'cbc-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.scss'],
  preserveWhitespaces: true,
})
export class SaveAsComponent {
  @Input()
  id: string | undefined;
  @Input()
  name: string | undefined;
  @Input()
  showIcon = true;

  constructor(private saveAsService: SaveAsService) {}

  onClick() {
    if (this.id && this.name) {
      this.saveAsService.saveAs(this.id, this.name);
    }
    return false;
  }
}
