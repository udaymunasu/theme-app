import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  Injectable,
  Injector,
  NgZone,
  RendererFactory2,
  TemplateRef,
  Type,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Subject } from 'rxjs';

import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalOptions } from './modal-config';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import { ContentRef } from './popup';
import { isDefined, isString } from './util';
import { AnimationBuilder } from '@angular/animations';

@Injectable()
export class NgbModalStack {
  private _document: any;
  private _windowAttributes = [
    'backdrop',
    'centered',
    'keyboard',
    'size',
    'windowClass',
    'stopDrag',
    'sidePanelConfig',
  ];
  private _backdropAttributes = ['backdropClass'];
  private _props;

  constructor(
    private _applicationRef: ApplicationRef,
    private _injector: Injector,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: any,
    private _builder: AnimationBuilder
  ) {
    this._document = document;
  }

  open(
    moduleCFR: ComponentFactoryResolver,
    contentInjector: Injector,
    content: any,
    options
  ): NgbModalRef {
    const containerEl = isDefined(options.container)
      ? this._document.querySelector(options.container)
      : this._document.body;

    if (!containerEl) {
      throw new Error(
        `The specified modal container "${
          options.container || 'body'
        }" was not found in the DOM.`
      );
    }

    const activeModal = new NgbActiveModal();

    activeModal.data = options?.data;

    this._props = options?.data?.props;

    // contentInjector = options.injector || contentInjector;
    // const environmentInjector =
    //   contentInjector.get(EnvironmentInjector, null) ||
    //   this._environmentInjector;
    const contentRef = this._getContentRef(
      moduleCFR,
      options.injector || contentInjector,
      content,
      activeModal
    );

    let backdropCmptRef: ComponentRef<NgbModalBackdrop> | any =
      options.backdrop !== false ? this._attachBackdrop(containerEl) : null;

    let windowCmptRef: ComponentRef<NgbModalWindow> =
      this._attachWindowComponent(containerEl, contentRef);

    let ngbModalRef: NgbModalRef = new NgbModalRef(
      windowCmptRef,
      contentRef,
      backdropCmptRef,
      options.beforeDismiss,
      this._builder
    );

    activeModal.close = (result: any) => {
      ngbModalRef.close(result);
    };
    activeModal.dismiss = (reason: any) => {
      ngbModalRef.dismiss(reason);
    };

    activeModal.setChildernHeader = (element: HTMLElement) => {
      ngbModalRef.setChildernHeader(element);
    };

    this._applyWindowOptions(windowCmptRef.instance, options);

    if (backdropCmptRef && backdropCmptRef.instance) {
      this._applyBackdropOptions(backdropCmptRef.instance, options);
    }

    return ngbModalRef;
  }

  private _attachBackdrop(containerEl: any): ComponentRef<NgbModalBackdrop> {
    const backdropFactory: ComponentFactory<NgbModalBackdrop> =
      this._componentFactoryResolver.resolveComponentFactory(NgbModalBackdrop);
    const backdropCmptRef = backdropFactory.create(this._injector);
    this._applicationRef.attachView(backdropCmptRef.hostView);
    containerEl.appendChild(backdropCmptRef.location.nativeElement);
    return backdropCmptRef;
  }

  private _attachWindowComponent(
    containerEl: any,
    contentRef: any
  ): ComponentRef<NgbModalWindow> {
    let windowFactory =
      this._componentFactoryResolver.resolveComponentFactory(NgbModalWindow);
    const windowCmptRef = windowFactory.create(this._injector);
    this._applicationRef.attachView(windowCmptRef.hostView);
    containerEl.appendChild(windowCmptRef.location.nativeElement);
    return windowCmptRef;
  }

  private _applyWindowOptions(
    windowInstance: NgbModalWindow,
    options: NgbModalOptions
  ): void {
    this._windowAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        windowInstance[optionName] = options[optionName];
      }
    });
  }

  private _applyBackdropOptions(
    backdropInstance: NgbModalWindow,
    options: NgbModalOptions
  ): void {
    this._backdropAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        backdropInstance[optionName] = options[optionName];
      }
    });
  }

  private _getContentRef(
    moduleCFR: ComponentFactoryResolver,
    contentInjector: Injector,
    content: any,
    context: NgbActiveModal
  ): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      return this._createFromTemplateRef(content, context);
    } else if (isString(content)) {
      return this._createFromString(content);
    } else {
      return this._createFromComponent(
        moduleCFR,
        contentInjector,
        content,
        context
      );
    }
  }

  private _createFromTemplateRef(
    content: TemplateRef<any>,
    context: NgbActiveModal
  ): ContentRef {
    const viewRef = content.createEmbeddedView(context);
    this._applicationRef.attachView(viewRef);
    return new ContentRef([viewRef.rootNodes], viewRef);
  }

  private _createFromString(content: string): ContentRef {
    const component = this._document.createTextNode(`${content}`);
    return new ContentRef([[component]]);
  }

  private _createFromComponent(
    moduleCFR: ComponentFactoryResolver,
    contentInjector: Injector,
    content: any,
    context: NgbActiveModal
  ): ContentRef {
    const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
    const modalContentInjector = Injector.create(
      [{ provide: NgbActiveModal, useValue: context }],
      contentInjector
    );

    const componentRef: any = contentCmptFactory.create(modalContentInjector);
    const componentNativeEl = componentRef.location.nativeElement;
    if (this._props) {
      for (let prop in this._props) {
        componentRef.instance[prop] = this._props[prop];
      }
    }
    this._applicationRef.attachView(componentRef.hostView);
    // FIXME: we should here get rid of the component nativeElement
    // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
    return new ContentRef(
      [[componentRef.location.nativeElement]],
      componentRef.hostView,
      componentRef
    );
  }
}
