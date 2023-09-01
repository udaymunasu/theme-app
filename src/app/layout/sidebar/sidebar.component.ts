import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class appSidebarComponent implements OnInit {
  @Output() sidebarToggled = new EventEmitter<void>();

  constructor() {}

  isCollapsed = false;

  ngOnInit(): void {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit();
  }
}
