import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: '[app-col-form]',
  templateUrl: './col-form.component.html',
  styleUrls: ['./col-form.component.scss'],
})
export class ColFormComponent implements OnInit {
  // @ts-ignore
  @Input() colGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
