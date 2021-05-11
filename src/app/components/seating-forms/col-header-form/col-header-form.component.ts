import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: '[app-col-header-form]',
  templateUrl: './col-header-form.component.html',
  styleUrls: ['./col-header-form.component.scss'],
})
export class ColHeaderFormComponent implements OnInit {
  // @ts-ignore
  @Input() colHeaderGroup: FormGroup;
  @Input() idx = 0;
  @Output() removeEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
