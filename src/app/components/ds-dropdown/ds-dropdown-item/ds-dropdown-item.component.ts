import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'ds-dropdown-item',
  templateUrl: './ds-dropdown-item.component.html',
  styleUrls: ['./ds-dropdown-item.component.scss']
})
export class DsDropdownItemComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() disabled: boolean;
  @Input() isChecked: boolean;
  @Input() value: string;
  @Input() options: Array<any>;



  ngOnInit(): void {
    console.log("Label in select item", this.label)
  }

  selectedOptionValue(isChecked?: boolean) {
    if(this.disabled) {
      return
    }
    // if(!isNullOrUndefined(isChecked)) {
    //   this.isChecked = isChecked;
    // }
  }

}
