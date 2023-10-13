import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownMenuService } from './dropdown-menu.service';

export interface DropDownFilterListItems {
  label: string;
  id?: string;
  value: string;
}

export interface DDMenuConfig {
  label: string;
  active?: boolean;
  multiselection?: boolean;
  actions?: Array<DropDownFilterListItems>;
}

export interface DDFilterList {
  items: Array<DropDownFilterListItems>;
  isMultiSelect?: boolean;
}
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  host: {
    class: 'ds-dropdown-menu'
  }
})
export class DropdownMenuComponent implements OnInit {
  constructor(private ddMenuService: DropdownMenuService) {}

  isOpened: boolean = false;
  overlayPositions: ConnectionPositionPair[];
  appliedQuickFilters: string = 'ALL';
  selectedOptions: {
    map: { [key: string]: DropDownFilterListItems };
    list: Array<DropDownFilterListItems>;
  } = { map: {}, list: [] };

  quickfilters: {
    map: { [key: string]: any };
    list: Array<{[key: string]: any}>;
  } = { map: {}, list: [{key:'1', label: 'All'},{key:'2', label: 'Selected'}] };

  @Input() config: DDMenuConfig;
  @Input() menuItems: DDMenuConfig

  ngOnInit(): void {
    this.overlayPositions = this.ddMenuService.getOverLayPositions();
    this.quickfilters.map.ALL = this.ddMenuService.initFilterMap(this.menuItems?.actions)
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  optionClicked(item){
    // console.log("Clicked item",item)
    this.ddMenuService.optionClicked(item, this.selectedOptions,this.quickfilters, this.menuItems?.multiselection);
    this.onSelectionChange(this.selectedOptions?.list)
  }

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>()
  onSelectionChange(e: any) {
    debugger
    this.selectionChange.emit(e)
  }
}
