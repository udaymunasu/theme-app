import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  icons = [
    {
      name: 'close',
    },
    {
      name: 'add',
    },
    {
      name: 'alarm',
    },
    {
      name: 'arrow-left',
    },
    {
      name: 'arrow-right',
    },
    {
      name: 'google',
    },
    {
      name: 'insta',
    },
    {
      name: 'sun',
    },
    {
      name: 'moon',
    },
    {
      name: 'edit',
    },
    {
      name: 'trash',
    },
    {
      name: 'phone',
    },
    {
      name: 'share',
    },
    {
      name: 'download',
    },
    {
      name: 'menu',
    },
  ];
}
