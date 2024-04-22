import { Component, OnInit } from '@angular/core';
import { Code } from 'src/app/components/show-code/show-code.component';

@Component({
  selector: 'app-header-demo',
  templateUrl: './header-demo.component.html',
  styleUrls: ['./header-demo.component.scss'],
})
export class HeaderDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  header: Code = {
    html: `
    <ds-header [size]="'sm'">Tax Transition Scenario Planning</ds-header>
    `,
  };

  headerMd: Code = {
    html: `
    <ds-header  [size]="'md'">Tax Transition Scenario Planning</ds-header>`,
  };

  headerLg: Code = {
    html: `
    <ds-header  [size]="'lg'">Tax Transition Scenario Planning</ds-header>`,
  };

  headerSWoutLine: Code = {
    html: `
    
    <ds-header>Tax Transition Scenario Planning
        <ds-sub-header>Run a tax transition for an existing or new accout</ds-sub-header>
        <ds-header-action>Action</ds-header-action>
    </ds-header>
    `,
  };

  headerSWithLine: Code = {
    html: `
    <ds-header [seperator]="true">Tax Transition Scenario Planning
        <ds-sub-header>Run a tax transition for an existing or new accout</ds-sub-header>
        <ds-header-action>Action</ds-header-action>
    </ds-header>
    `,
  };
}


