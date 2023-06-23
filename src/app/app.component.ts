import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'theme-app';

  public sidebarShow: boolean = false;

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
   w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  modeConfig= {
    themes: [
      "blue"
    ],
    defaultTheme: "blue",
    enableDarkModeSwitch: true,
    enableThemeSwitch: true,
    position: "'top-right'"
  }
  themeConfig
  ngOnInit() {
    this.themeConfig = this.modeConfig
  }
}
