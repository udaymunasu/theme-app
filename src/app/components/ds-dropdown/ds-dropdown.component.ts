import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { UDDomHandlere } from '../dom-handler';
import { DsDropdownConfigOptions } from './dropdown.entities';
import { DsDropdownService } from './dropdown.service';

@Component({
  selector: 'ds-dropdown',
  templateUrl: './ds-dropdown.component.html',
  styleUrls: ['./ds-dropdown.component.scss'],
})
export class DsDropdownComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private ddmenuservice: DsDropdownService
  ) {}

  isBtmPosition: boolean = false;
  isMenuOpen: boolean;
  clickOutsideSubscription: Subscription | any;

  observer: IntersectionObserver;
  @Input() alignMenu: string = 'left';
  @Input() configOptions: DsDropdownConfigOptions;


  showMenu: boolean = false;

  @ViewChild('selectInputContainer', { static: true })
  selectInputContainer: ElementRef;
  @ViewChild('dropdownItemCtn') dropdownItemCtn: ElementRef;

  ngOnInit(): void {
  }

  menuPosition(isBtm: boolean) {
    if (this.selectInputContainer?.nativeElement && this.dropdownItemCtn?.nativeElement) {
      this.ddmenuservice.setMenuPosition(
        this.selectInputContainer?.nativeElement,
        this.dropdownItemCtn?.nativeElement,
        isBtm,
        this.alignMenu
      );
    }
  }


  toggleDropDown(dropdownState: boolean) {
    this.isMenuOpen = dropdownState;
    this.showMenu = true;
    if (this.isMenuOpen) {
      this.addEventListners()
      this.menuPosition(this.isBtmPosition);
    } else if(this.dropdownItemCtn?.nativeElement) {
      this.showMenu = false;
      this.isBtmPosition =  false;
      // DomHandlere.removeClild()
    }
  }

  private addEventListners() {
    this.clickOutsideSubscription = fromEvent(window, 'click').subscribe(
      (event: any) => {
        this.clickOutside(event);
      }
    );
  }

  private removeEventListner() {
    this.clickOutsideSubscription?.unsubscribe();
    this.clickOutsideSubscription = null;
    this.observer?.unobserve(this.dropdownItemCtn?.nativeElement);
  }

  private clickOutside(event: any) {
    if (
      document.contains(event.target) &&
      !this.dropdownItemCtn.nativeElement.contains(event.target) &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.toggleDropDown(false);
      this.removeEventListner();
    }
  }

}
