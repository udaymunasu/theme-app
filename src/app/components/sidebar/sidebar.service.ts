import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, ComponentRef } from '@angular/core';

type SidebarPosition = 'top' | 'bottom' | 'left' | 'right';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpen: boolean = false;
  private componentRef: ComponentRef<any> | null = null;
  private sidebarElement: HTMLElement | null = null;
  private position: SidebarPosition = 'left';

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

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
      this.sidebarElement.classList.add('slideIn');

      const contentElement = this.componentRef.location.nativeElement;
      this.sidebarElement.appendChild(contentElement);

      document.body.appendChild(this.sidebarElement);
    }
  }

  close(): void {
    if (this.isOpen && this.sidebarElement) {
      this.isOpen = false;
  
      this.sidebarElement.classList.add('slideOut'); // Add slide-out animation class
  
      setTimeout(() => {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.sidebarElement.parentNode?.removeChild(this.sidebarElement);
        this.sidebarElement = null;
      }, 300);
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
