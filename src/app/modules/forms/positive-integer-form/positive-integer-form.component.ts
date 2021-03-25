import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-positive-integer-form',
  templateUrl: './positive-integer-form.component.html',
  styleUrls: ['./positive-integer-form.component.scss'],
})
export class PositiveIntegerFormComponent {
  @Input() label = '';
  positiveInteger = new FormControl(0);
}
