import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'ds-sub-header',
  template: `<ng-content [select] = "ds-sub-header"></ng-content>`,
  host: {class: 'px-sub-header'}
})
export class SubHeaderComponent {



}
