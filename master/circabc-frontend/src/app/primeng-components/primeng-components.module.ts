import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    EditorModule,
    InputSwitchModule,
    DropdownModule,
    SelectButtonModule,
    TooltipModule,
  ],
  exports: [
    CalendarModule,
    EditorModule,
    InputSwitchModule,
    DropdownModule,
    SelectButtonModule,
    TooltipModule,
  ],
  declarations: [],
})
export class PrimengComponentsModule {}
