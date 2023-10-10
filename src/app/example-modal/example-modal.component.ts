import { Component, OnInit } from '@angular/core';
import { DsActiveModal } from '../components/modal/modal-ref';

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.scss'],
})
export class ExampleModalComponent implements OnInit {
  constructor(private activeModal: DsActiveModal) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close();
  }
}
