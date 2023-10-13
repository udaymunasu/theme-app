import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-demo',
  templateUrl: './dropdown-menu-demo.component.html',
  styleUrls: ['./dropdown-menu-demo.component.scss'],
})
export class DropdownMenuDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  DROPDOWN_ITEMS = {
    label: 'Select Label',
    actions: [
      {
        label: 'Label 1',
        value: 'Value 1',
      },
      {
        label: 'Label 2',
        value: 'Value 2',
      },
      {
        label: 'Label 3',
        value: 'Value 3',
      },
    ]
  };

  DROPDOWN_ITEMS_MULTI = {
    label: 'MultiSelection',
    multiselection: true,
    actions: [
      {
        label: 'Label 1',
        value: 'Value 1',
      },
      {
        label: 'Label 2',
        value: 'Value 2',
      },
      {
        label: 'Label 3',
        value: 'Value 3',
      },
    ]
  }
}
