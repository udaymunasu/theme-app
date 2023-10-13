import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
@Component({
  selector: 'muk-flyout',
  templateUrl: './flyout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./flyout.component.scss'],
})
export class FlyoutComponent implements OnInit {
  @ViewChild('flyoutContainer') private flyoutContainer: ElementRef;

  @Input() isOpen: boolean = false;
  @Input() flyoutWidth?: number;
  @Input() overlayPositions?: ConnectionPositionPair[];

  @Output() onToggle = new EventEmitter<boolean>();

  constructor(private host: ElementRef) {}

  @HostListener('document:click', ['$event']) clickOutsideToClose({
    target,
  }: MouseEvent) {
    if (this.flyoutContainer && this.host) {
      const clickOutsideOfContainer =
        this.flyoutContainer.nativeElement.contains(target);
      const isOutsideOfFlyout = !this.host.nativeElement.contains(target);

      if (this.isOpen && isOutsideOfFlyout && clickOutsideOfContainer) {
        this.toggle();
      }
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.onToggle.emit(this.isOpen);
  }
  ngOnInit(): void {}
}
