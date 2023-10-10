import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-header',
  template: `
    <div class="ds-header-wrapper">
    <div class="px-header">
    <ng-content [select]="ds-header"></ng-content>
    </div>
      <ng-content select="ds-sub-header"></ng-content>
    </div>
    <ng-content select="ds-header-action"></ng-content>

  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  constructor(private hostElement: ElementRef) {}

  @Input() seperator: boolean = false;

  @Input() set size(value: string){
    if(value) {
      this.hostElement.nativeElement.classList.add('px-header--' + value);
    }
  };


  ngOnInit(): void {
    if (this.seperator == true) {
      this.hostElement.nativeElement.classList.add('px-header--line');
    }
  }
}
