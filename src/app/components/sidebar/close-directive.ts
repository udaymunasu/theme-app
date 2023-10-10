import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { DsActiveModal } from "../modal/modal-ref";
import { SidebarService } from "./sidebar.service";


@Directive({
    selector: '[close-directive]',
    exportAs: 'close-directive'
})

export class closeDirective implements OnInit {

    @Input('modal-close') modalClose: any

    constructor(private sidebar: DsActiveModal,
        private renderer: Renderer2,
        private element: ElementRef) {}
    ngOnInit(): void {

        this.renderer.listen(this.element.nativeElement, 'click', () => {
            debugger
            this.sidebar.close()
        })
    }
}