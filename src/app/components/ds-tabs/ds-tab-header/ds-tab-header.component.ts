import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabSelectedEvent } from '../ds-tabs.component';

@Component({
  selector: 'ds-tab-header',
  templateUrl: './ds-tab-header.component.html',
  styleUrls: ['./ds-tab-header.component.scss']
})
export class DsTabHeaderComponent implements OnInit {

  @Output() tabSelected = new EventEmitter<TabSelectedEvent>()
  @Input() selectedIndex: any = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
