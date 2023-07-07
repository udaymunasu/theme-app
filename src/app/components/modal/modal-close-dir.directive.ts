import { Directive, ElementRef, Input, OnInit, Renderer2, SkipSelf } from "@angular/core";
import { NgbActiveModal } from "./modal-ref";



@Directive({
    selector: '[modal-close]',
    exportAs: 'modal-close'
})

export class ModalCloseDirective implements OnInit {
    @Input('modal-close') modalClose: any;

    constructor(
        @SkipSelf() private modal: NgbActiveModal,
        private renderer: Renderer2,
        private element: ElementRef
    ) {}

    ngOnInit(): void {
        this.renderer.listen(this.element.nativeElement, 'click', () => {
            this.modal.close(this.modalClose);
        })
    }
}


@Directive({
    selector: '[modal-dismiss]',
    exportAs: 'modal-dismiss'
})

export class ModalDismissDirective implements OnInit {
    @Input('modal-dismiss') modalDismiss: any;

    constructor(
        @SkipSelf() private modal: NgbActiveModal,
        private renderer: Renderer2,
        private element: ElementRef
    ) {}

    ngOnInit(): void {
        this.renderer.listen(this.element.nativeElement, 'click', () => {
            this.modal.close(this.modalDismiss);
        })
    }
}