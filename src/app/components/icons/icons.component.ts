import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

//animations;
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '1s ease-in',
    style({
      opacity: 1,
    })
  ),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

const leaveTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '1s ease-out',
    style({
      opacity: 0,
    })
  ),
]);

const fadeOut = trigger('fadeOut', [leaveTransition]);

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class IconsComponent implements OnInit {
  constructor() {}

  //animations:

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

  generatedCss: string;
  copyStatusMsg;
  copyStatus: boolean = false;
  copyCode(iconHtml: string) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(iconHtml ? iconHtml : this.generatedCss)
        .then(
          () => {
            this.copyStatusMsg = 'copied';
            this.copyStatus = true;
          },
          (error) => {
            console.log(error);
          }
        );
    }
    else {
      this.copyStatusMsg = 'Not copied';
            this.copyStatus = true;
    }

    setTimeout(() => {
      this.copyStatus = false;
    }, 2000)
  }
}
