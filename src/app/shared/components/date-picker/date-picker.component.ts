import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';

/** @title Datepicker with custom calendar header */
@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  header = DatePickerHeaderComponent;
  @Output() dateChange = new EventEmitter<{ value: Date }>();
  dateChanged = (v: Date) => this.dateChange.emit({ value: v });
}
