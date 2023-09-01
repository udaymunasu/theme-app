import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomHandlere } from '../dom-handler';
import { DsDropdownConfigOptions } from './dropdown.entities';

@Component({
  selector: 'ds-dropdown',
  templateUrl: './ds-dropdown.component.html',
  styleUrls: ['./ds-dropdown.component.scss']
})
export class DsDropdownComponent implements OnInit {

  constructor() { }

  @Input() configOptions: DsDropdownConfigOptions;

  items = [
    {
      label: 'label 1',
      value: 'value 1',
      isChecked: false,
      isDisabled: false
    },
    {
      label: 'label 2',
      value: 'value 2',
      isChecked: false,
      isDisabled: false
    },
    {
      label: 'label 3',
      value: 'value 3',
      isChecked: false,
      isDisabled: false
    }
  ];


  @ViewChild('selectInputContainer', {static: true}) selectInputContainer: ElementRef;
  @ViewChild('listContainer') listContainer: ElementRef;
  ngOnInit(): void {
    this.show()
  }

  visible: boolean;
  isListOpen: boolean

  toggle() {
    if(!this.visible) this.show()
  }


  show() {
    this.visible = true;
    this.isListOpen = true;
    // this.addPopupEventListner();

    DomHandlere.absolutePosition(
      this.listContainer.nativeElement,
      this.selectInputContainer.nativeElement
    )
  }

}
