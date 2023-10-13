import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { DomHandler } from 'src/app/components/primeng-modal/dialog/dom/domhandler';

interface MenuItems {
  label: string;
  icon: string;
  submenu: subMenuItems[];
}

interface subMenuItems {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MegamenuComponent implements OnInit {

  isSubmenuVisible
  menuItems: MenuItems[] = [
    {
      label: 'home',
      icon: 'iconName',
      submenu: [
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
      ],
    },
    {
      label: 'home',
      icon: 'iconName',
      submenu: [
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
      ],
    },
    {
      label: 'home',
      icon: 'iconName',
      submenu: [
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
      ],
    },
    {
      label: 'home',
      icon: 'iconName',
      submenu: [
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
      ],
    },
    {
      label: 'home',
      icon: 'iconName',
      submenu: [
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
        {
          label: 'home',
          icon: 'iconName',
        },
      ],
    },
  ];

  // @Input() menuItems: any;

  @ViewChild('menuPanel') menuPanel: ElementRef;
  @ViewChild('rootList') rootList: ElementRef;

  isMenuPanelVisible: boolean = false;
  isCollapseMegaMenu;
  prevCollapseVal;
  private rootListBounds = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  showDropDown: boolean = false;
  private nodesLength = 0;
  private nodeHovered = 0;

  private unSubscribe: Subject<any> = new Subject();

  constructor(private changeDetection: ChangeDetectorRef) {}
  isLoaded: boolean = false;
  ngOnInit(): void {
    this.isLoaded = true;

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((evt: any) => {
        this.prevCollapseVal = this.isCollapseMegaMenu;

        this.isCollapseMegaMenu =
          evt.target && evt.target.innerWidth && evt.target.innerWidth < 1024;
        this.menuPanel.nativeElement.style.height = 'auto';
        // this.setRootListBounds();
        this.hidePanel(this.isCollapseMegaMenu);
      });
  }

  // setRootListBounds() {
  //   let rect = this.rootList.nativeElement.getBoundingClientRect();
  //   this.rootListBounds = {
  //     top: !this.isCollapseMegaMenu ? rect.top : 55,
  //     left: !this.isCollapseMegaMenu ? rect.left + window.scrollX : -300,
  //     width: !this.isCollapseMegaMenu ? rect.width : 300,
  //   //   height: !this.isCollapseMegaMenu
  //   //     ? rect.height
  //   //     : this.menuItems.filter((mod) => mod && mod.items && mod.items.length)
  //   //         .length *
  //   //         60 +
  //   //       30,
  //   // };
  // }

  calcMenuWidth() {
    this.menuPanel.nativeElement.style.width = this.rootListBounds.width + 'px';
  }

  calcShowMenuPosition() {
    this.menuPanel.nativeElement.style.top = !this.isCollapseMegaMenu
      ? this.rootListBounds.top + this.rootListBounds.height + 'px'
      : '55px';
    this.menuPanel.nativeElement.style.left = !this.isCollapseMegaMenu
      ? this.rootListBounds.left + 'px'
      : '0px';
    this.calcMenuWidth();
  }

  showPanel(event, isCollapseClick?: boolean) {
    if (this.isCollapseMegaMenu && !isCollapseClick) return;

    if (!this.isMenuPanelVisible) {
      this.calcNodePosition(event);
    }

    this.calcShowMenuPosition();
    this.isMenuPanelVisible = true;
    this.changeDetection.detectChanges();
  }

  calcNodePosition(event) {
    let eachColWid = this.rootListBounds.width / this.nodesLength;
    let targetOrigin = event.x - this.rootListBounds.left;
    let remainder = targetOrigin % eachColWid;

    if (remainder != targetOrigin) {
      this.nodeHovered = (targetOrigin - remainder) / eachColWid;
    } else {
      this.nodeHovered = 0;
    }
  }

  hidePanel(isCollapseClick?: boolean, isMMContent?: boolean) {
    if (this.isCollapseMegaMenu && !isCollapseClick) {
      if (isMMContent) this.collapseAnimCtn();
      return;
    }

    if (isCollapseClick) this.collapseAnimCtn();

    this.calcHideMenuPosition();
    this.isMenuPanelVisible = false;
    this.changeDetection.detectChanges();
  }

  collapseAnimCtn() {}

  calcHideMenuPosition() {
    this.menuPanel.nativeElement.style.top = !this.isCollapseMegaMenu
      ? '-' + DomHandler.getOuterHeight(this.menuPanel.nativeElement) + 'px'
      : '55px';
    this.menuPanel.nativeElement.style.left = !this.isCollapseMegaMenu
      ? this.rootListBounds.left + 'px'
      : this.rootListBounds.width * -1 + 'px';
  }

  clickShow($event) {}
}
