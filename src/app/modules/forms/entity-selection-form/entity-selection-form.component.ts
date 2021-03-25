import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-entity-selection-form',
  templateUrl: './entity-selection-form.component.html',
  styleUrls: ['./entity-selection-form.component.scss'],
})
export class EntitySelectionFormComponent {
  @Input() label = '';
  entitySelection = new FormControl(-1);
}
