import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DsDropdownConfigOptions } from '../dropdown.entities';

@Component({
  selector: 'ds-dropdown-input',
  templateUrl: './ds-dropdown-input.component.html',
  styleUrls: ['./ds-dropdown-input.component.scss']
})
export class DsDropdownInputComponent implements OnInit {

  constructor() { }

  @Input() placeholder: string;
  @Input() label: string;

  @Input() configOptions: DsDropdownConfigOptions

  @Input() listOfSelectOptions: Array<any>;
  @Output() inputClicked = new EventEmitter<void>();

  ngOnInit(): void {
  }

  toggleDropDown() {
    this.inputClicked.emit();
  }

}
