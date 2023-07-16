import { Injectable } from '@angular/core';

type SidebarPosition = 'top' | 'bottom' | 'left' | 'right';

@Injectable({
  providedIn: 'root',
})
export class DomHandler {
  constructor() {}

  setPosition(element: HTMLElement, position: SidebarPosition): void {
    element.style.position = 'fixed';
    element.style.backgroundColor = '#f1f1f1';
    element.style.transition = 'transform 0.3s ease-in-out';
    element.style.zIndex = '999';

    const { width, height } = this.getViewportSize();
    const sidebarWidth = element.offsetWidth;
    const sidebarHeight = element.offsetHeight;

    switch (position) {
      case 'left':
        element.style.left = '0';
        element.style.top = `${(height - sidebarHeight) / 2}px`;
        break;
      case 'right':
        element.style.right = '0';
        element.style.top = `${(height - sidebarHeight) / 2}px`;
        break;
      case 'top':
        element.style.top = '0';
        element.style.left = `${(width - sidebarWidth) / 2}px`;
        break;
      case 'bottom':
        element.style.bottom = '0';
        element.style.left = `${(width - sidebarWidth) / 2}px`;
        break;
    }
  }

  private getViewportSize(): { width: number; height: number } {
    const width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const height = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return { width, height };
  }

  getCloseTransform(position: SidebarPosition): string {
    switch (position) {
      case 'left':
        return 'translateX(-100%)';
      case 'right':
        return 'translateX(100%)';
      case 'top':
        return 'translateY(-100%)';
      case 'bottom':
        return 'translateY(100%)';
      default:
        return '';
    }
  }
}
