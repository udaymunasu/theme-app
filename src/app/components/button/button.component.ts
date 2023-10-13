import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ds-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  public classes: string[] = [];
  @Output() events: EventEmitter<any> = new EventEmitter<any>();

  @Input() set state(value: string) {

    let str = value.split(' ')
    if(value) {
      str.forEach((element) => {
        this.classes.push('px-btn--' + element)
      })
    }

  }

  @Input() set size(value: string) {}
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(event) {
    console.log('button events', event);
    this.events.emit({ element: 'button', type: event.type, value: event });
  }
}
