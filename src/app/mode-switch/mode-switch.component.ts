import { Component, Input, OnInit } from '@angular/core';

export interface ModeSwitchConfig {
  themes: Array<string>,
  defaultTheme: string,
  enableDarkModeSwitch: boolean,
  enableThemeSwitch: boolean,
  position: string
}

export enum ThemePositions {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right'
}

@Component({
  selector: 'app-mode-switch',
  templateUrl: './mode-switch.component.html',
  styleUrls: ['./mode-switch.component.scss']
})
export class ModeSwitchComponent implements OnInit {
  modeIcon: string;
  mode: string;
  @Input() modeConfig: ModeSwitchConfig
  constructor() { }

  ngOnInit(): void {
    if(document?.querySelector("body")?.classList?.contains("dark_mode")) {
      this.modeIcon = 'sun';
      this.mode= 'Dark'
    }

    else {
      this.modeIcon = 'moon';
      this.mode= 'Dark'
    }
    if(!this.modeConfig.defaultTheme) {
      this.modeConfig.defaultTheme = 'blue'
    }
    this.setTheme(this.modeConfig.defaultTheme)
  }

  modeChange() {
    if(this.mode == 'Dark'){
      document.querySelector("body")?.classList?.add("dark-mode");
      this.modeIcon = 'sun';
      this.mode= 'Light'
    }
    else {
      document.querySelector("body")?.classList?.remove("dark-mode");
      this.modeIcon = 'moon';
      this.mode= 'Dark'
    }
  }

  setTheme(themeName: string) {
    document.querySelector("html")?.removeAttribute("class");
    document.querySelector("html")?.classList?.add(themeName);

  }

  toggleTheme(e) {
    this.setTheme(e.srcElement.checked ? this.modeConfig?.themes[0] : this.modeConfig?.themes[1])
  }

}
