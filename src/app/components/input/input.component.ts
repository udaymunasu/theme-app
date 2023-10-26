import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ds-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('refPosition') refPosition: ElementRef;
 

  @Input() label: string;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    if(this.refPosition.nativeElement.querySelector('.ds-icon-lt')) {
      this.refPosition.nativeElement.classList.add(`px-input__text--icon-lt`)
    }

    if(this.refPosition.nativeElement.querySelector('.ds-icon-rt')) {
      this.refPosition.nativeElement.classList.add(`px-input__text--icon-rt`)
    }

  }

}
