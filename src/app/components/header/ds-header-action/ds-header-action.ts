import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ds-header-action',
  template: `<ng-content [select] = "ds-header-action"></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'px-header-action'}
})
export class HeaderActionComponent {


}
