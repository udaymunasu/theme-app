import { animate, AnimationBuilder, style } from '@angular/animations';
import { ComponentRef } from '@angular/core';
import { ContentRef } from './popup';

import { from, Observable } from 'rxjs';

import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalWindow } from './modal-window';

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
 */
export class NgbActiveModal {
 
  close(result?: any): void { }

  /**
   * Dismisses the modal with an optional `reason` value.
   *
   * The `NgbModalRef.result` promise will be rejected with the provided value.
   */
  dismiss(reason?: any): void { }

  setChildernHeader(element: HTMLElement): void { }

  data: any;
}

const WINDOW_ATTRIBUTES: string[] = [
  'animation',
  'ariaLabelledBy',
  'ariaDescribedBy',
  'backdrop',
  'centered',
  'fullscreen',
  'keyboard',
  'scrollable',
  'size',
  'windowClass',
  'modalDialogClass',
];
const BACKDROP_ATTRIBUTES: string[] = ['animation', 'backdropClass'];

/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
export class NgbModalRef {
  private _resolve: (result?: any) => void;
  private _reject: (reason?: any) => void;

  /**
   * The instance of a component used for the modal content.
   *
   * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
   */
  get componentInstance(): any {
    if (this._contentRef) {
      return this._contentRef.componentRef.instance;
    }
  }

  /**
   * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
   */
  result: Promise<any>;

  result$: Observable<any>;

  constructor(
    private _windowCmptRef: ComponentRef<NgbModalWindow>,
    private _contentRef: ContentRef,
    private _backdropCmptRef?: ComponentRef<NgbModalBackdrop>,
    private _beforeDismiss?: () => any,
    private _builder?: AnimationBuilder
  ) {
    _windowCmptRef.instance.dismissEvent.subscribe((reason: any) => {
      this.dismiss(reason);
    });

    this.result = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    // this.result.then(null, () => {});
    this.result$ = from(this.result);
  }

  /**
   * Closes the modal with an optional `result` value.
   *
   * The `NgbMobalRef.result` promise will be resolved with the provided value.
   */
  close(result?: any): void {
    if (this._windowCmptRef) {
      // this._closed.next(result);
      this._resolve(result);
      this._removeModalElements();
    }
  }

  private _dismiss(reason?: any) {
    // this._dismissed.next(reason);
    this._reject(reason);
    this._removeModalElements();
  }

  /**
   * Dismisses the modal with an optional `reason` value.
   *
   * The `NgbModalRef.result` promise will be rejected with the provided value.
   */
  dismiss(reason?: any): void {
    if (this._windowCmptRef) {

      // if(this._windowCmptRef.instance.sidePanelCofig)

      if (!this._beforeDismiss) {
        this._dismiss(reason);
      } else {
        const dismiss = this._beforeDismiss();
        if (dismiss && dismiss.then) {
          dismiss.then(result => {
            if (result !== false) {
              this._dismiss(reason);
            }
          });
        } else if (dismiss !== false) {
          this._dismiss(reason);
        }
      }
    }
  }


  setChildernHeader(element: HTMLElement): void {
    this._windowCmptRef.instance.setDraggableHeader(element)
  }

  private _removeModalElements() {

    if (this._windowCmptRef.instance.coordinates) {
      this._windowCmptRef.instance.localModalWrapperRef.classList.add(
        'transform-modal'
        );

      const animation = this._builder.build([
        style({
          opacity: '1',
          transform: 'scale(0.5)'
        }),
        animate('350ms ease-in-out',
        style({
          opacity: '0',
          transform: 'scale(0.2)'
        }),
        )
      ]);

      const player = animation.create(this._windowCmptRef?.instance.modalCmptWrapper.nativeElement, {});

      setTimeout(() => {
        player.play();
      }, 300)

      setTimeout(() => {
       this._destroyModal();
       this._windowCmptRef.instance.localModalWrapperRef.classList.remove(
        'transform-modal');
      }, 750);
    
    }
    else {
      this._destroyModal();
    }
  }

  private _destroyModal() {
    const windowsNativeEl = this._windowCmptRef.location.nativeElement

    if(windowsNativeEl && windowsNativeEl.parentNode) {
      windowsNativeEl.parentNode.removeChild(windowsNativeEl)
    }

    this._windowCmptRef?.destroy();
    if(this._backdropCmptRef) {
      const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
      backdropNativeEl.parentNode.removeChild(backdropNativeEl)
      this._backdropCmptRef.destroy()
    }

    if(this._contentRef && this._contentRef.viewRef) {
      this._contentRef.viewRef.destroy()
    }

    this._windowCmptRef = null;
    this._backdropCmptRef = null;
    this._contentRef = null
  }
    
    
    
    






}
