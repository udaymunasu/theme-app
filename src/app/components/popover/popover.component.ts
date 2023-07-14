import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

export interface Position {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export type Placement =
  | 'auto'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'auto'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export type PlacementArray = Placement | Array<Placement>;

@Directive({
  selector: '[newPopover]',
  exportAs: 'newPopover',
})
// @Component({
//   selector: 'app-popover',
//   templateUrl: './popover.component.html',
//   styleUrls: ['./popover.component.scss'],
// })
export class PopoverDirective {
  @Input('newPopover') content: string;
  private popovarElement: HTMLElement;

  constructor(
    public el: ElementRef,
    public zone: NgZone,
    private changeDetector: ChangeDetectorRef,
    private rendererFactory: RendererFactory2,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showPopover();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hidePopover();
  }

  private showPopover() {
    if (!this.popovarElement) {
      this.popovarElement = this.createPopoverElement();

      document.body.appendChild(this.popovarElement);
      this.popovarElement.style.position = 'absolute';
    }

    const { top, left } = this.el.nativeElement.getBoundingClientRect();

    this.popovarElement.style.top = `${top + window.scrollY}px`;
    this.popovarElement.style.left = `${left + window.scrollY}px`;
    this.popovarElement.style.display = 'block';
  }

  private hidePopover() {
    if (this.popovarElement) {
        this.popovarElement.style.display = 'none';

    }
  }
  contentElement: any;
  private createPopoverElement(): HTMLElement {
    const popovarElement = this.renderer.createElement('div');
    popovarElement.textContent = this.content;

    popovarElement.classList.add('popover')
    this.popovarElement.style.position = 'absolute';


    return popovarElement;
  }
}
