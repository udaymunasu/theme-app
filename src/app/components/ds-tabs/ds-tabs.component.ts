import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { DSTabsService } from './ds-tab.service';
import { DsTabComponent } from './ds-tab/ds-tab.component';

export interface ITab {
  active?: boolean;
  title: string;
}

export interface TabSelectedEvent {
  tab: ITab;
  index: number;
}

export function deepCopy(
  object: any,
  replacer?: (this: any, key: string, value: any) => any
) {
  if (object == null) {
    return object;
  }
  return JSON.parse(JSON.stringify(object, replacer));
}

export function detectViewChanges(cdr: ChangeDetectorRef) {
  if (cdr && !(cdr as ViewRef).destroyed) {
    cdr.detectChanges();
  }
}

@Component({
  selector: 'ds-tabs',
  templateUrl: './ds-tabs.component.html',
  styleUrls: ['./ds-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DSTabsService],
})
export class DsTabsComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('tabRef') tabRef: ElementRef;

  @Input() selectedIndex: any = 0;
  @Output() tabSelected = new EventEmitter<TabSelectedEvent>();

  @ContentChildren(DsTabComponent, { descendants: true })
  // tabs: QueryList<DsTabComponent>;
  tabs: DsTabComponent[] = [];

  constructor(
    private tabService: DSTabsService,
    private hostElement: ElementRef,
    private changeDetectionSvc: ChangeDetectorRef
  ) {}

  addTab(tab:DsTabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  

  hightLightObj: { [key: string]: any } = {
    highLightLeft: '0',
    highLightWidth: '0',
    hoverHightLightLeft: '0',
    hoverHighLightWidth: '0',
  };

 

  ngOnChanges() {
    // if (this.tabs && this.tabs.length) {
    //   this.selectTab(this.tabs[this.selectedIndex], this.selectedIndex);
    // }
  }

  ngOnInit() {
    // this.tabService.tabData.subscribe(() => {
    //   if (this.tabs && this.tabs.length) {
    //     let tabObj: any = this.tabService.getActiveTab();
    //     this.selectTab(tabObj.tab, tabObj.index);
    //   }
    // });
  }

  ngAfterViewInit() {
    // this.tabService.setTabs(this.tabs['_results']);
    // this.tabs = this.tabService.getTabs();

    // if (this.selectedIndex) {
    //   this.selectTab(this.tabs[this.selectedIndex], this.selectedIndex);
    // } else {
    //   this.selectTab(this.tabs[0], 0);
    //   detectViewChanges(this.changeDetectionSvc);
    // }
  }

  // selectTab(tab:DsTabComponent) {
  //   this.tabs.forEach((tab) => {
  //     tab.active = false;
  //   });
  //   tab.active = true
  // }

  selectTab(tab: ITab) {
    if (!tab.active) {
      this.tabService.setTabs(this.tabs);
      // this.selectedIndex = index;
      tab.active = true;
    }
    detectViewChanges(this.changeDetectionSvc);

    // this.hightLightObj.highLightLeft =
    //   this.hostElement.nativeElement.querySelector('.active');
    // this.hightLightObj.hoverHighLightWidth = deepCopy(
    //   this.hightLightObj.highLightLeft
    // );

    // this.hightLightObj.highLightWidth =
    //   this.hostElement.nativeElement.querySelector('.active');
    // this.hightLightObj.hoverHighLightWidth = deepCopy(
    //   this.hightLightObj.highLightWidth
    // );
    detectViewChanges(this.changeDetectionSvc);
  }

  mouseEnter(tab) {
    // if (!tab.active) {
    //   this.hightLightObj.highLightLeft =
    //     this.hostElement.nativeElement.querySelector('.active');
    //   this.hightLightObj.highLightWidth =
    //     this.hostElement.nativeElement.querySelector('.active');
    //   detectViewChanges(this.changeDetectionSvc);
    // }
  }

  mouseOut() {
    // this.hightLightObj.hoverHighLightWidth = deepCopy(
    //   this.hightLightObj.highLightLeft
    // );
    // this.hightLightObj.hoverHighLightWidth = deepCopy(
    //   this.hightLightObj.highLightWidth
    // );
  }

  selectFocusTab(event: Event) {
    // if (event['which'] === 13) {
    //   event.preventDefault();
    //   let focusTabIndex = this.tabRef.nativeElement
    //     .querySelector('.ds-tabs:focus')
    //     ?.getAttribute('tabId');
    //   let activeTabIndex = this.tabService.getActiveTab()?.index;

    //   if (
    //     focusTabIndex != undefined &&
    //     activeTabIndex != undefined &&
    //     focusTabIndex != activeTabIndex
    //   ) {
    //     this.selectTab(this.tabs[focusTabIndex], parseInt(focusTabIndex));
    //     detectViewChanges(this.changeDetectionSvc);
    //   }
    //   event.stopPropagation();
    // }
  }

  ngOnDestroy(): void {
    // this.tabService.tabData.complete();
  }
}
