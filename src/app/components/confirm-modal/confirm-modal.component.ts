import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title = '';
  @Input() message = '';
  @Output() affirmEvent = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  affirm(): void {
    this.affirmEvent.emit(true);
    this.activeModal.close('affirmative');
  }
}
