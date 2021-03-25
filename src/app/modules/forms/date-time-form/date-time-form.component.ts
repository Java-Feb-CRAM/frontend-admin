import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-time-form',
  templateUrl: './date-time-form.component.html',
  styleUrls: ['./date-time-form.component.scss'],
})
export class DateTimeFormComponent {
  @Input() label = '';
  dateTime = new FormControl(new Date());
}
