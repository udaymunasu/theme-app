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

  ngOnInit(): void {
    this.filterIconData = this.iconData;
  }

  iconData = [
    {
      category: 'Actions',
      icons: [
        {
          name: 'hamburger',
          value: 'hamburger',
        },
        {
          name: 'close',
          value: 'close',
        },
        {
          name: 'add',
          value: 'add',
        },
        {
          name: 'alarm',
          value: 'alarm',
        },
        {
          name: 'hamburger',
        },
      ],
    },
    {
      category: 'Arrows',
      icons: [
        {
          name: 'arrow-left',
          value: 'arrow-left',
        },
        {
          name: 'arrow-right',
          value: 'arrow-right',
        },
        {
          name: 'google',
          value: 'google',
        },
        {
          name: 'insta',
          value: 'insta',
        },
        {
          name: 'sun',
          value: 'sun',
        },
        {
          name: 'moon',
          value: 'moon',
        },
        {
          name: 'edit',
          value: 'edit',
        },
        {
          name: 'trash',
          value: 'trash',
        },
        {
          name: 'phone',
          value: 'phone',
        },
        {
          name: 'share',
          value: 'share',
        },
        {
          name: 'download',
          value: 'download',
        },
        {
          name: 'menu',
          value: 'menu',
        },
      ],
    },
    {
      category: 'Arrows',
      icons: [
        {
          name: 'caret_down',
          value: 'caret_down',
        },
        {
          name: 'caret_left',
          value: 'caret_left',
        },
        {
          name: 'caret_right',
          value: 'caret_right',
        },
        {
          name: 'caret_up',
          value: 'caret_up',
        },
        {
          name: 'arrow_down',
          value: 'arrow_down',
        },
        {
          name: 'arrow_download',
          value: 'arrow_download',
        },
        {
          name: 'arrow_left',
          value: 'arrow_left',
        },
        {
          name: 'arrow_right',
          value: 'arrow_right',
        },
        {
          name: 'caret_down',
          value: 'caret_down',
        },
        {
          name: 'caret_left',
          value: 'caret_left',
        },
        {
          name: 'caret_right',
          value: 'caret_right',
        },
        {
          name: 'caret_up',
          value: 'caret_up',
        },
        {
          name: 'external_link',
          value: 'external_link',
        },
        {
          name: 'maximize',
          value: 'maximize',
        },
        {
          name: 'forward',
          value: 'forward',
        },
        {
          name: 'rotate',
          value: 'rotate',
        },
        {
          name: 'reply',
          value: 'reply',
        },
      ],
    },
    {
      category: 'FILES',
      icons: [
        {
          name: 'file-check',
          value: 'file-check',
        },
      ],
    },
    {
      category: 'USERS',
      icons: [
        {
          name: 'user',
          value: 'user',
        },
        {
          name: 'user-add ',
          value: 'user-add ',
        },
        {
          name: 'user-circle',
          value: 'user-circle',
        },
        {
          name: 'user-edit',
          value: 'user-edit',
        },
        {
          name: 'user-headset',
          value: 'user-headset',
        },
        {
          name: 'user-remove',
          value: 'user-remove',
        },
        {
          name: 'user-settings',
          value: 'user-settings',
        },
      ],
    },
    {
      category: 'Brands',
      icons: [
        {
          name: 'apple',
          value: 'apple',
        },
        {
          name: 'facebook',
          value: 'facebook',
        },
        {
          name: 'dropbox',
          value: 'dropbox',
        },
        {
          name: 'github',
          value: 'github',
        },
        {
          name: 'google',
          value: 'google',
        },
        {
          name: 'linkedin',
          value: 'linkedin',
        },
      ],
    },
    {
      category: 'FACES',
      icons: [
        {
          name: 'face-grin',
          value: 'face-grin',
        },
        {
          name: 'face-laugh',
          value: 'face-laugh',
        },
        {
          name: 'thums-down',
          value: 'thums-down',
        },
        {
          name: 'thums-up',
          value: 'thums-up',
        },
      ],
    },
    {
      category: 'E-COMMERCE',
      icons: [
          {
            name: 'cart',
            value: 'cart',
          },
          {
            name: 'cart-plus',
            value: 'cart-plus',
          },
          {
            name: 'dollar',
            value: 'dollar',
          },
          {
            name: 'fingerprint',
            value: 'fingerprint',
          },
          {
            name: 'shopping-bag',
            value: 'shopping-bag',
          },
          {
            name: 'store',
            value: 'store',
          },
          {
            name: 'truck',
            value: 'truck',
          },
          {
            name: 'wallet',
            value: 'wallet',
          },
      ],
    },
  ];

  userInput: string;
  filterIconData: any;
  searchInput(event) {
    this.userInput = event.target.value;
    this.filterIcons();
    console.log('this.userInput', this.userInput);
  }

  filterIcons() {
    if (!this.userInput) {
      this.filterIconData = this.iconData;
    }

    this.filterIconData = this.iconData
      .map((categoryData) => ({
        category: categoryData.category,
        icons: categoryData.icons.filter((icon) =>
          icon.name.includes(this.userInput)
        ),
      }))
      .filter((categoryData) => categoryData.icons.length > 0);
  }

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
    } else {
      this.copyStatusMsg = 'Not copied';
      this.copyStatus = true;
    }

    setTimeout(() => {
      this.copyStatus = false;
    }, 2000);
  }
}
