import {
  Component,
  EventEmitter,
  IterableDiffers,
  OnInit,
  Output,
} from '@angular/core';
import { from, mergeMap, reduce, groupBy, map } from 'rxjs';

export const Sidebar_menu: Array<{
  label: string;
  routerLink: string;
  category: string;
}> = [
  {
    label: 'Header',
    routerLink: 'header',
    category: 'components',
  },
  {
    label: 'Buttons',
    routerLink: 'buttons',
    category: 'components',
  },
  {
    label: 'Input',
    routerLink: 'input',
    category: 'components',
  },
  {
    label: 'Grid',
    routerLink: 'grid',
    category: 'components',
  },
  {
    label: 'Panel',
    routerLink: 'panel',
    category: 'components',
  },
  {
    label: 'Card',
    routerLink: 'card',
    category: 'components',
  },
  {
    label: 'Icon',
    routerLink: 'icons',
    category: 'components',
  },
  {
    label: 'Icon Generator',
    routerLink: 'iconGen',
    category: 'components',
  },
  {
    label: 'Modal',
    routerLink: 'modal',
    category: 'components',
  },
  {
    label: 'Megamenu',
    routerLink: 'megamenu',
    category: 'components',
  },
  {
    label: 'Tabs',
    routerLink: 'tabs',
    category: 'components',
  },
  {
    label: 'Dropdown',
    routerLink: 'dropdown',
    category: 'components',
  },
  {
    label: ' Dropdown-menu',
    routerLink: 'dropdown-menu',
    category: 'components',
  },
  {
    label: 'Contact Us',
    routerLink: 'Icons',
    category: 'components',
  },
];
@Component({
  selector: 'app-comp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class appSidebarComponent implements OnInit {
  @Output() sidebarToggled = new EventEmitter<void>();

  constructor() {}

  isCollapsed = false;

  items: any = Sidebar_menu;
  selectedCategory: string;

  menuList: { category: string; labels: any[]; expanded?: boolean }[] = [];

  ngOnInit(): void {
    // this.fetchMenu()
    this.restructerdItemsByCategory();
  }

  private restructerdItemsByCategory() {
    const groupedItemsArray: { [category: string]: any[] } = {};

    this.items.forEach((item) => {
      if (!groupedItemsArray[item.category]) {
        groupedItemsArray[item.category] = [];
      }
      groupedItemsArray[item.category].push(item);
    });
    this.menuList = Object.keys(groupedItemsArray).map((category) => ({
      category,
      labels: groupedItemsArray[category],
    }));
  }

  selectCategory(category) {
    category.expanded = !category.expanded;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit();
  }
}
