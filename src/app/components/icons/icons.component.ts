import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

//animations;
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '1s ease-in',
    style({
      opacity: 1,
    })
  ),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

const leaveTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '1s ease-out',
    style({
      opacity: 0,
    })
  ),
]);

const fadeOut = trigger('fadeOut', [leaveTransition]);

@Component({
  selector: 'ds-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class IconsComponent implements OnInit {
  constructor(private hostElement: ElementRef) {}
  ngOnInit(): void {}
  @Input() name: string;
  @Input() set position(value: 'right' | 'left') {
    switch (value) {
      case 'right':
        this.hostElement.nativeElement.classList.add(`ds-icon-rt`);
        break;
      case 'left':
        this.hostElement.nativeElement.classList.add(`ds-icon-lt`);
        break;
    }
  }
}
