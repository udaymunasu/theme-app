import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-demo',
  templateUrl: './dropdown-demo.component.html',
  styleUrls: ['./dropdown-demo.component.scss']
})
export class DropdownDemoComponent implements OnInit {

  constructor() { }

  selectedItems = [
    {
      label: "Label 1"
    },
    {
      label: "Label 2"
    },
    {
      label: "Label 2"
    }
  ]

  ngOnInit(): void {
  }



}
