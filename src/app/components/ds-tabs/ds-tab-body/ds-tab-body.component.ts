import {CdkPortalOutlet, Portal, TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, ViewContainerRef } from '@angular/core';
import { DsTabComponent } from '../ds-tab/ds-tab.component';

@Component({
  selector: 'ds-tab-body',
  templateUrl: './ds-tab-body.component.html',
  styleUrls: ['./ds-tab-body.component.scss']
})
export class DsTabBodyComponent implements OnInit, AfterViewInit {

  @ContentChildren(DsTabComponent, {descendants: true}) tabs: QueryList<DsTabComponent>

  @Input('content') _content: TemplatePortal;
  @Input() tabPos: number |null;
  @Input() tabsLength: number | null;
  @Input() selectedIndex: number | null;
  _portalInstance: Portal<any>;

  constructor(private _viewContainerRef: ViewContainerRef, ) { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._portalInstance = new TemplatePortal(this._content.templateRef, this._viewContainerRef)
  }
 
}
