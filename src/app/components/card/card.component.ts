import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<ng-content [select]="px-panel"></ng-content>',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {

  @Input() direction: 'row' | 'column' = "column";
  @Input() state: 'primary' | 'secondary' | 'teritiary' = "teritiary";
  @Input() elevation: 'sm' | 'md' | 'lg' = "sm";

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.hostElement.nativeElement.classList.add('px-panel', 'px-panel--card')

    switch(this.state) {
      case 'primary':
      this.hostElement.nativeElement.classList.add('px-panel--primary');
      break;

      case 'secondary':
        this.hostElement.nativeElement.classList.add('px-panel--secondary');
        break;
    }

    switch(this.elevation) {
      case 'md':
      this.hostElement.nativeElement.classList.add('ds-card--elevation--md');
      break;

      case 'lg':
        this.hostElement.nativeElement.classList.add('ds-card--elevation--lg');
        break;
    }

    this.hostElement.nativeElement.style.setProperty('--layout-direction', this.direction);

  }

}
