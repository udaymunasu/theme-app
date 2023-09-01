import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DSTabsService {
  public tabs: any;
  public tabData: Subject<any> = new Subject<any>();
  constructor() {}

  getTabs() {
    return this.tabs;
  }

  setTabs(tabsArray) {
    this.tabs = tabsArray;
    if (this.tabs) {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
    }
  }

  getActiveTab() {
    let tabObj;
    this.tabs.forEach((tab, index) => {
        debugger

      if (tab?.active) tabObj = { "tab": tab, "index": index };
    });
    return tabObj;
  }
}
