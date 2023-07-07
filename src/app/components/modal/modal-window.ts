import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ngbFocusTrap } from './focus-trap';

import { Subject, Subscription } from 'rxjs';
import { ModalDismissReasons } from './modal-dismiss-reason';
import { DynamicDialogConfig } from 'src/app/primeng-modal/dialog/dynamicdialog/public_api';

@Component({
  selector: 'ngb-modal-window',
  host: {
    '[class]':
      '"ds-modal fade show d-block" + (windowClass ? " " + windowClass : " ") + ("window-flex")',
    role: 'dialog',
    tabindex: '-1',
    '(keyup.esc)': 'escKey($event)',
    '(click)': 'backdropClick($event)',
  },
  styleUrls: ['./modal.component.scss'],
  templateUrl: './model.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbModalWindow implements OnInit, OnDestroy, AfterViewInit {
  private unSubscribeer: Subject<any> = new Subject();

  private _document: any;
  private _elWithFocus: Element | any;

  x: number;
  y: number;
  coordinates: DOMRect;
  draggableSub: Subscription;
  hasFocusedLaunchEl: boolean;
  draggableHeader: HTMLElement;
  localModalWrapperRef: HTMLElement;
  hasAnimationPilot: boolean = false;


  mouseMoveCB: () => void = this.mouseMoveHandler.bind(this);
  mouseUpCB: () => void = this.mouseUpHandler.bind(this);

  @Input() backdrop: boolean | string = true;
  @Input() centered: string;
  @Input() keyboard = true;
  @Input() size: string;
  @Input() windowClass: string;
  @Input() data: string;
  @Input() stopDrag: string;
  @Output('dismiss') dismissEvent = new EventEmitter();


  
  @ViewChild('modalCmptWrapper', { read: ElementRef, static: false })
  modalCmptWrapper: ElementRef;

  private _closed$ = new Subject<void>();

  

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _elRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    this._document = document;
    ngbFocusTrap(this._elRef.nativeElement, this.dismissEvent);
  }


  
  backdropClick($event): void {
    if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
      this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  escKey($event): void {
    if (this.backdrop && $event.defaultPrevented) {
      this.dismiss(ModalDismissReasons.ESC);
    }
  }

  dismiss(reason) {
    this.dismissEvent.emit(reason);
  }

  ngOnInit() {
    this.hasAnimationPilot = this.document.body.classList.contains('animate-modal-enabed');
    this.findElWithFocus();
    this._renderer.addClass(this._document.body, 'modal-open');
  }

  ngAfterViewInit() {
    if (this.hasAnimationPilot) {
      this.handleModalAnimation();
      // this.handleCoordinates();
    }

    if (!this._elRef.nativeElement.contains(document.activeElement)) {
      this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
    }
  }

  findElWithFocus() {
    this._elWithFocus = this._document.activeElement;

    if (this.hasAnimationPilot && this._elWithFocus === this.document.body) {
      this._elWithFocus =
        window?.event?.target instanceof HTMLElement
          ? window.event.target
          : null;
    }

    this.hasFocusedLaunchEl = this._elWithFocus !== null;
  }

  handleModalAnimation() {
    this.localModalWrapperRef =
      this._elRef.nativeElement.querySelector('#modalCmptWrapper');

    if (!this.localModalWrapperRef || this._elWithFocus) {
      return;
    }

    this.coordinates = this._elWithFocus.getBoundingClientRect();

    if (this._elWithFocus.closest('.slide-menu-launcher')) {
      this.coordinates.x = (window.event as any).screenX;
      this.coordinates.y = (window.event as any).screenY - 110;
    }

    if (this.coordinates && !this.stopDrag) {
      // this.setDraggableHeader();
    }
  }

  handleCoordinates(isDestroy: boolean) {
    if (!this.localModalWrapperRef || !this.coordinates) {
      return;
    }

    if (isDestroy) {
      this.localModalWrapperRef.style.removeProperty('--modalStartingX');
      this.localModalWrapperRef.style.removeProperty('--modalStartingY');

      this.localModalWrapperRef.style.removeProperty('--modalHt');
      this.localModalWrapperRef.style.removeProperty('--modalWd');
    } else {
      const modalRect = this.localModalWrapperRef.getBoundingClientRect();

      if (modalRect) {
        this.localModalWrapperRef.style.setProperty(
          '--modalHt',
          modalRect.height + 'px'
        );
        this.localModalWrapperRef.style.setProperty(
          '--modalWd',
          modalRect.width + 'px'
        );
      }
    }

    this._renderer.addClass(this.localModalWrapperRef, 'transform-modal');

    this.localModalWrapperRef.style.setProperty(
      '--modalStartingX',
      this.coordinates.x + 'px'
    );
    this.localModalWrapperRef.style.setProperty(
      '--modalStartingzY',
      this.coordinates.y + 'px'
    );

    setTimeout(() => {
      this._renderer.removeClass(this.localModalWrapperRef, 'transform-modal');
    }, 450);
  }

  setDraggableHeader(header: HTMLElement) {
    this.draggableSub = null;
  }

  mouseDown(e: any) {
    if(!this.hasAnimationPilot) {
      return
    }
    this.x = e.clientX;
    this.y = e.clientY;

    this._elRef.nativeElement.addEventListner('mousemove', this.mouseMoveCB);
    this._elRef.nativeElement.addEventListner('mouseup', this.mouseUpCB);

    this._renderer.addClass(this.localModalWrapperRef, 'no-transition')
  }

  mouseMoveHandler(e: any) {
    const dx = e.clientX - this.x;
    const dy = e.clientY - this.y;

    this.localModalWrapperRef.style.top = `${
      this.localModalWrapperRef.offsetTop + dy
    }px`;
    this.localModalWrapperRef.style.left = `${
      this.localModalWrapperRef.offsetLeft + dx
    }px`;

    this.x = e.clientX;
    this.y = e.clientY;
  }

  mouseUpHandler() {
    this._elRef.nativeElement.addEventListner('mousemove', this.mouseMoveCB);
    this._elRef.nativeElement.addEventListner('mouseup', this.mouseUpCB);
    this._renderer.removeClass(this.localModalWrapperRef, 'transform-modal');
  }

  ngOnDestroy() {
    const body = this._document.body;
    const elWithFocus = this._elWithFocus;

    let elementToFocus;

    if (elementToFocus && -elWithFocus['focus'] && body.contains(elWithFocus)) {
      elementToFocus = elWithFocus;
    } else {
      elementToFocus = body;
    }

    elementToFocus['focus'].apply(elementToFocus, []);

    this._elWithFocus = null;

    if (
      !body.getElementsByClassName?.('modal')?.length &&
      !body.getElementsByClassName?.('ds-modal')?.length
    ) {
      this._renderer.removeClass(body, 'modal');
    }

    if (this.coordinates) {
      this.handleCoordinates(true);
    }

    this.unSubscribeer.next;
    this.unSubscribeer.complete();
  }
}
