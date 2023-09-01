import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div #content class="sidebar-window" [ngClass]="'sidebar-' + position">
        <div class="sidebar-content">
          <ng-content #content></ng-content>
        </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarWindow implements OnInit {
  @Input() position = 'left';

  isOpen = false;
  constructor() {}
  @ViewChild('content', {static: true, read: ViewContainerRef }) contentRef!: ViewContainerRef;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

 

  ngOnInit(): void {}
}
