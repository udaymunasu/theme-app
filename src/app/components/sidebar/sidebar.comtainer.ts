import { Component, OnInit, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar-container',
  template: `
    <button (click)="openSidebar()">Open Sidebar</button>
    <ng-template #sidebarTemplate></ng-template>
  `,
  styleUrls: ['./sidebar-container.component.css']
})
export class SidebarContainerComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) { }

  YourDynamicComponent

  ngOnInit(): void {}

  openSidebar() {
    // this.sidebarService.open(this.viewContainerRef, this.YourDynamicComponent);
  }
}
