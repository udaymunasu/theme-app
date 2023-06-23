import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {

  @Input() gap: string = '8px';
  @Input() direction: 'row' | 'column' = "column";
  @Input() state: 'primary' | 'secondary' | 'teritiary' = "teritiary";


  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.hostElement.nativeElement.classList.add('px-panel')

    switch(this.state) {
      case 'primary':
      this.hostElement.nativeElement.classList.add('px-panel--primary');
      break;

      case 'secondary':
        this.hostElement.nativeElement.classList.add('px-panel--secondary');
        break;
    }

    this.hostElement.nativeElement.style.setProperty('--layout-direction', this.direction);
    this.hostElement.nativeElement.style.setProperty('--panel-gap', this.gap);

  }

}
