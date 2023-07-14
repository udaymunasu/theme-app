import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
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
import { CustomPopoverComponent } from './custom-popover';

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
export class PopoverDirective implements OnInit {
  @Input('newPopover') content: string;
  @Input() position: string = 'top';
  private popovarElement: HTMLElement;
  private popoverVisible: boolean;

  private popoverRef: ComponentRef<CustomPopoverComponent>

  constructor(
    public elementRef: ElementRef,
    public zone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    private rendererFactory: RendererFactory2,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.createPopoverElement();
  }

  private createPopoverElement() {
    this.popovarElement = document.createElement('div');

    this.popovarElement.className = 'popover';
    this.popovarElement.textContent = this.content;

    document.body.appendChild(this.popovarElement);
  }

  private popoverPosition() {
    const target = this.elementRef.nativeElement;
    const targetRect = target.getBoundingClientRect();
    const popoverRect = this.popovarElement.getBoundingClientRect();

    const displayRatio = window.innerWidth / window.innerHeight;

    let position: string;

    if(displayRatio >= 1) {
      position = 'right';
    }else {
      position = 'bottom';
    }

    let top, left;

    switch (this.position) {
      case 'top':
        top = targetRect.top - popoverRect.height;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top -  (targetRect.height - popoverRect.height) / 2;
        left = targetRect.left + popoverRect.width;
        break;
      case 'right':
        top = targetRect.top - popoverRect.height;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
    }

    this.popovarElement.style.top = `${top}px`;
    this.popovarElement.style.left = `${left}px`;

  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.popoverVisible) {
      this.popoverVisible = true;
      this.popoverPosition();
      this.showPopover();

    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.popoverVisible) {
      this.popoverVisible = false;
      this.hidePopover();
    }
  }

  private showPopover() {
    this.popovarElement.style.display = 'block';
  }

  private hidePopover() {
    this.popovarElement.style.display = 'none';
  }
  // contentElement: any;
}
