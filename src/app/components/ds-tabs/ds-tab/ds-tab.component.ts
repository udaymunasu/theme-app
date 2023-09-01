import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { DSTabsService } from '../ds-tab.service';
export const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '1s ease-in',
    style({
      opactity: 1,
    })
  ),
]);

export const leaveTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '1s ease-in',
    style({
      opactity: 0,
    })
  ),
]);

export const fadeIn = trigger('fadeIn', [enterTransition]);

export const fadeOut = trigger('fadeOut', [leaveTransition]);

@Component({
  selector: 'ds-tab',
  templateUrl: './ds-tab.component.html',
  styleUrls: ['./ds-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeIn, fadeOut]
})
export class DsTabComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() titleTemplate: TemplateRef<any> | any;
  active: boolean = false;
  istemplate: boolean = false;

  _explicitContent: TemplateRef<any>;

  @ViewChild(TemplateRef, { static: true }) _implicitContent: TemplateRef<any>;
  private _contentPortal: TemplatePortal | null;

  get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private tabsService: DSTabsService
  ) {}

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent,
      this._viewContainerRef
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tabsService.tabData.next(changes)
  }
}
