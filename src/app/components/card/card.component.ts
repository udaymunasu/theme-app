import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, fromEvent ,merge } from 'rxjs';
import { takeUntil  } from 'rxjs/operators';

import {toArray } from 'lodash';

@Component({
  selector: 'app-card',
  template: '<ng-content [select]="px-panel"></ng-content>',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'ds-card'}
})
export class CardComponent implements OnInit, AfterViewInit, OnDestroy {
  // @Input() direction: 'row' | 'column' = 'column';

  @Input() set direction(value: 'row' | 'column') {
    value = value ?? 'row';
    if (value) {
      this.hostElement.nativeElement.classList.add('card--' + value);
    }
  }

  @Input() state: 'primary' | 'secondary' | 'teritiary' = 'teritiary';

  @Input() set elevation(value: 'sm' | 'md' | 'lg') {
    value = value ?? 'sm';
    if (value) {
      this.hostElement.nativeElement.classList.add('card-elevation--' + value);
    }
  }

  @Input() addEventsFor: Array<string> = [];

  @Output() events = new EventEmitter<any>(); 

  private unSubscriber: Subject<void> = new Subject;

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
      this.addEventsFor = toArray(this.addEventsFor);

      if(this.addEventsFor.length) {
        const eventStrean = this.addEventsFor.map((ev) => fromEvent(this.hostElement.nativeElement, ev));
        const allEvents$ = merge(...eventStrean)
         if(this.addEventsFor.includes('click') || this.addEventsFor.includes("hover")) {
           this.hostElement.nativeElement.classList.add('card--hover');
         }

         allEvents$.pipe(takeUntil(this.unSubscriber)).subscribe((event: any) => {
           this.events.emit({type: event.type, value: event})
         })
      }
  }

  ngOnDestroy(): void {
      this.unSubscriber.next();
      this.unSubscriber.complete();
  }
}
