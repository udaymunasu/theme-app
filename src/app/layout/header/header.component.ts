import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  HostListener,
  Renderer2,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { appSidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class appHeaderComponent implements OnInit, AfterViewInit {
  // @ViewChild(appSidebarComponent) sidebar: appSidebarComponent;

  modeConfig = {
    themes: ['blue'],
    defaultTheme: 'blue',
    enableDarkModeSwitch: true,
    enableThemeSwitch: true,
    position: "'top-right'",
  };

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  @Output() sidebarToggle = new EventEmitter<any>();
  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if(scrollPosition > 2) {
      this.isScrolled = true
    } else {
      this.isScrolled = false
    }
    
  }

  isSideBarCollapsed: boolean = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // debugger
    // this.renderer.listen('window', 'scroll', () => {
    //   const scrollOpt = window.screenY;
    //   if (scrollOpt > 3) {
    //     this.renderer.addClass(this.element.nativeElement, 'blurred');
    //   } else {
    //     this.renderer.removeClass(this.element.nativeElement, 'blurred');
    //   }
    // });
  }

  toggleSideBar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;

    let sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('expanded');
    }

    // this.isSideBarCollapsed = !this.isSideBarCollapsed
    this.sidebarToggle.emit();
  }
}
