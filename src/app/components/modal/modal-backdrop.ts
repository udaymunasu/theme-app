import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngb-modal-backdrop',
  template: '',
  host: {
    '[class]': '"modal-backdrop" + (backdropClass ? " " + backdropClass : "")',
    style: '',
  },
})
export class NgbModalBackdrop implements OnInit {
  @Input() animation: boolean;
  @Input() backdropClass: string;

  constructor() {}

  ngOnInit() {}
}
