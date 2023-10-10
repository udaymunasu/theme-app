import { Component, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { appSidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class appHeaderComponent implements OnInit {
  // @ViewChild(appSidebarComponent) sidebar: appSidebarComponent;

  constructor() { }
  @Output() sidebarToggle = new EventEmitter<any>()

  isSideBarCollapsed: boolean  = false;

  ngOnInit(): void {
  }

  modeConfig = {
    themes: ['blue'],
    defaultTheme: 'blue',
    enableDarkModeSwitch: true,
    enableThemeSwitch: true,
    position: "'top-right'",
  };

  toggleSideBar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed

    let sidebar = document.querySelector('.sidebar');
    if(sidebar) {
      sidebar.classList.toggle('expanded')
      
    }
    

    // this.isSideBarCollapsed = !this.isSideBarCollapsed
    this.sidebarToggle.emit();
  }

}
