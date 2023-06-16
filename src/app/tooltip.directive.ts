import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[bnyCssTooltip]',
})
export class bnyCssTooltipDirective implements OnInit, OnChanges {
  @Input('bnyCssTooltip') cssTooltip;
  string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute(
      'bnyCssTooltip',
      this.cssTooltip
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.setAttribute(
      'bnyCssTooltip',
      this.cssTooltip
    );
  }
}
