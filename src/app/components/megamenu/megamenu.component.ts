import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegamenuComponent implements OnInit {

  @Input() menuItems: any

  isMenuPanelVisible: boolean

  constructor() { }

  ngOnInit(): void {
  }

  showPanel(event , isCollapseClick?: boolean){

  }

  hidePanel(){

  }

  clickShow($event){

  }

}
