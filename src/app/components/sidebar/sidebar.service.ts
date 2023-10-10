import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { NgbModalOptions } from '../modal/modal-config';
import { DsModal } from '../modal/modal.service';

export interface SidebarOptions extends NgbModalOptions {
  position?: 'top' | 'bottom' | 'left' | 'right' | any;
  props?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  componentInstance: any;

  constructor(private modalSvc: DsModal) {}

  open(component: any, options: SidebarOptions = {}) {
    const consolidateOpt: any = Object.assign({}, options.data, {
      positon: options.position,
    });

    if (options.props) {
      consolidateOpt['props'] = {
        ...options?.props,
        position: options.position,
      };
    }

    const modelRef = this.modalSvc.open(component, {
      data: consolidateOpt,
      sidePanelConfig: { position: options.position },
    });

    this.componentInstance = modelRef.componentInstance;
    return modelRef.result$.pipe(catchError((err) => of(err)));
  }

  beforeDismiss(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.componentInstance.animateClose();
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
}
