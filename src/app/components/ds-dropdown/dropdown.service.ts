import { Injectable } from "@angular/core";
import { UDDomHandlere } from "../dom-handler";

@Injectable()
export class DsDropdownService {
    constructor() {}

    setMenuPosition(dropdownElement: any, dropdownCtnElm: any, isBtm: boolean, alignMenu: string) {

        UDDomHandlere.appendChild(dropdownElement, 'body')
        const isWi = document.querySelector('.wi');
        const targetOffest = dropdownElement.getBoundingClientRect();
        const targetOuterHeight = dropdownElement.offsetHeight;
        const topValue = isBtm ? targetOffest.top + targetOuterHeight + window.scrollY + (isWi ? 0: 4) : targetOffest.top + window.scrollY - dropdownCtnElm.clientHeight - (isWi ? 0 : 4)
        let width = 220;

        dropdownCtnElm.style.width = width + 'px';
        dropdownCtnElm.style.top = topValue + 'px';

        if(alignMenu == 'right') {
            dropdownCtnElm.style.left = targetOffest.right - width + 'px'
        } else {
        dropdownCtnElm.style.left = targetOffest.left + 'px'

        }
    }
}