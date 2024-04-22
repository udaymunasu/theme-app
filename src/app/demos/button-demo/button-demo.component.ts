import { Component, OnInit } from '@angular/core';
import { Code } from 'src/app/components/show-code/show-code.component';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss'],
})
export class ButtonDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  button: Code = {
    html: `<ds-button >Default</ds-button>`,
  };
  
  buttonSm: Code = {
    html: `<ds-button size="sm">size="sm"</ds-button>`,
  };

  buttonLg: Code = {
    html: `<ds-button size="lg">size="lg"</ds-button>`,
  };
}
