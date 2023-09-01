import { DOCUMENT } from '@angular/common';
import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  Type,
  ComponentRef,
  RendererFactory2,
  Renderer2,
  Component,
} from '@angular/core';
import { inject } from '@angular/core/testing';
import { NgbModalBackdrop } from '../modal/modal-backdrop';
import { isDefined } from '../modal/util';

type SidebarPosition = 'top' | 'bottom' | 'left' | 'right';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isOpen: boolean = false;
  private componentRef: ComponentRef<any> | null = null;
  private sidebarElement: HTMLElement | null = null;
  private backdropElement: HTMLElement | null = null;
  private renderer: Renderer2;

  private position: SidebarPosition = 'left';

  private outsideClickListner: () => void;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private applicationRef: ApplicationRef
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  open(component: Type<any>, position: SidebarPosition = 'left'): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.position = position;

      const componentFactory = this.resolver.resolveComponentFactory(component);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);

      this.sidebarElement = document.createElement('div');
      this.sidebarElement.classList.add('sidebar');
      this.sidebarElement.classList.add(`sidebar-${position}`);

      const contentElement = this.componentRef.location.nativeElement;
      this.sidebarElement.appendChild(contentElement);

      this.backdropElement = document.createElement('div');
      this.backdropElement.classList.add('sidebar-backdrop');

      this.renderer.appendChild(document.body, this.sidebarElement);
      this.renderer.appendChild(document.body, this.backdropElement);

    }
  }

  close(): void {
    if (this.isOpen && this.sidebarElement && this.backdropElement) {
      this.isOpen = false;

      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.renderer.removeChild(document.body, this.sidebarElement);
      this.renderer.removeChild(document.body, this.backdropElement);
    }
  }

  // private _attachBackdrop(containerEl: any): ComponentRef<NgbModalBackdrop> {
  //   const backdropFactory: ComponentFactoryResolver<NgbModalBackdrop> = this.resolver.resolveComponentFactory(NgbModalBackdrop);
  //   const backdropCmptRef = backdropFactory.create(this.injector);
  //   this.applicationRef.attachView(backdropCmptRef.hostView);
  //   containerEl.appendChild(backdropCmptRef.location.nativeElement)
  //   return
  // }

  private addOutsideClickListner(): void {
    setTimeout(()=> {
      document.addEventListener('click', this.handleOutsideClick.bind(this));

    }, 0)
  }

  private removeOutsideClickListner(): void {
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (
      this.sidebarElement &&
      !this.sidebarElement.contains(event.target as Node)
    ) {
      this.close();
    }
  }

  isOpened(): boolean {
    return this.isOpen;
  }

  setPosition(position: SidebarPosition): void {
    if (this.isOpen && this.sidebarElement) {
      this.sidebarElement.classList.remove(`sidebar-${this.position}`);
      this.position = position;
      this.sidebarElement.classList.add(`sidebar-${position}`);
    }
  }
}
