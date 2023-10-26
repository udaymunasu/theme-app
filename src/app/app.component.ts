import { Component, OnInit } from '@angular/core';
import { SidebarService } from './components/sidebar/sidebar.service';
import { appSidebarComponent } from './layout/sidebar/sidebar.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'theme-app';

  constructor(private sidebar: SidebarService) {}

  public sidebarShow: boolean = false;

  openSidebar() {
    this.sidebar.open(appSidebarComponent);
  }

  items = [
    {
      label: 'label 1',
      value: 'value 1',
      isChecked: false,
      isDisabled: false,
    },
    {
      label: 'label 2',
      value: 'value 2',
      isChecked: false,
      isDisabled: false,
    },
    {
      label: 'label 3',
      value: 'value 3',
      isChecked: false,
      isDisabled: false,
    },
  ];

  modeConfig = {
    themes: ['purple'],
    defaultTheme: 'purple',
    enableDarkModeSwitch: true,
    enableThemeSwitch: true,
    position: "'top-right'",
  };
  themeConfig;
  ngOnInit() {
    this.themeConfig = this.modeConfig;
  }
}
