import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { getuid } from 'process';
import { DropDownFilterListItems } from './dropdown-menu.component';

export function generateGUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-4' +
    S4().substr(0, 3) +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

@Injectable({
  providedIn: 'root',
})
export class DropdownMenuService {
  constructor() {}

  initFilterMap(listItems: Array<DropDownFilterListItems> | any) {
    listItems?.forEach((i: DropDownFilterListItems) => {
      i.id = generateGUID();
    });
  }

  getOverLayPositions(): ConnectionPositionPair[] {
    return [
      {
        offsetX: 0,
        offsetY: 4,
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        offsetX: 0,
        offsetY: -4,
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
    ];
  }

  optionClicked(item: DropDownFilterListItems, selectedOptions: {map: {[key: string]: DropDownFilterListItems}, list: Array<DropDownFilterListItems>},quickFilters, isMultiselection: boolean | undefined) {
    let index = selectedOptions.list.findIndex(
      (selectedOpt) => item.id === selectedOpt?.id
    );

    if (index == -1) {
      if (isMultiselection) {
        selectedOptions.list.push(item);
        selectedOptions.map[item.id] = item;
      } else {
        selectedOptions.list[0] = item;
        selectedOptions.map = {};
        selectedOptions.map[item.id] = item;
      }
    }
    else {
      selectedOptions.list.splice(index, 1);
      delete selectedOptions.map[item.id]
    }

    if(quickFilters.list?.length) {
      quickFilters.map['selected'] = selectedOptions.list
    }

    console.log('selectedOptions', selectedOptions);
  }
}
