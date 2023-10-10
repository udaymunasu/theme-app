import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

import { NgbModalOptions, } from './modal-config';
import { DsModalRef } from './modal-ref';
import { NgbModalStack } from './modal-stack';


@Injectable({ providedIn: 'root' })
export class DsModal {
	constructor(private _moduleCFR: ComponentFactoryResolver, private _injector: Injector, private _modalStack: NgbModalStack) {}

	open(content: any, options: NgbModalOptions = {}): DsModalRef {
		return this._modalStack.open(this._moduleCFR, this._injector, content, options);
	}

	
}