import { transition, style, animate, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  selector: 'app-icon-gen',
  templateUrl: './icon-gen.component.html',
  styleUrls: ['./icon-gen.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class IconGenComponent implements OnInit {
  @Input('isIconList') isIconList: boolean;
  @ViewChild('iconGeneratorForm', { read: NgForm }) iconGeneratorForm: any;
  @ViewChild('svgUpload') svgUpload: any;
  iconStyle!: HTMLStyleElement;
  iconwh: any = 16;
  svgwh: any = 25;
  svgCode: string = '';
  iconName: string = 'svg-icon';
  svg: string = '';
  generatedCss: string = '';
  copyStatusMassage: string = '';
  copyStatus: boolean = false;

  iconCategoryGroup: any;
  categories: any;

  iconData: any[];

  constructor() {}

  ngOnInit(): void {}

  iconListGen() {}

  generate(f: NgForm) {
    if(this.iconStyle) {
      this.iconStyle.remove()
    }

    if(f && f.value && f.value.svgCode) {
      let pattern = `fill=["^""]`
      this.svg = f.value.svgUpload ? f.value.svgUpload : 'data:image/svg+xml;utf-8,' + f.value.svgCode.replace(/fill="[^"]*"/g, "");

      this.svgwh = f.value.svgwh;

      this.iconName = f.value.iconName ? f.value.iconName : this.iconName;
      const defaultIconCss: string = `&.${this.iconName} {
        background-color: $icon-color;
        mask-image: url('${this.svg}');
      }`
      const generatedIconCss: string = `width: ${this.svgwh}px; height: ${this.svgwh}px; color: var(--icon-color); background-color: currentColor; -webkit-mask-image: url('${this.svg}'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; `
      this.generatedCss = defaultIconCss;
      const css = ".demo-icon{" + generatedIconCss + "}";
      const head = document.getElementsByTagName('head')[0];
      this.iconStyle = document.createElement('style');
      this.iconStyle.appendChild(document.createTextNode(css));
      head.appendChild(this.iconStyle);
    }
  }

  loadSampleSvg() {
    this.iconGeneratorForm.value.svgUpload = '';
    this.iconGeneratorForm.value.svgwh = '';
    this.svgwh = 25;
    this.iconGeneratorForm.value.svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z" fill="currentColor" /> </svg>`;
  }

  convertImage(e: any) {
    let reader = new FileReader();
    reader.onload = (e: Event) => {
      this.iconGeneratorForm.value.svgCode = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  clear() {
    this.clearForm();
  }
  clearForm() {
    this.iconGeneratorForm.value.svgCode = "";
    this.iconGeneratorForm.value.svgUpload = ``;
    this.generatedCss = ``;
    if(this.iconStyle) {
      this.iconStyle.remove()
    }
  }

  copyCode(iconHtml?: string) {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(iconHtml ? iconHtml : this.generatedCss).then(() => {
        this.copyStatusMassage = `copied to clipboard`;
        this.copyStatus = true;
      }, (error) => {
        console.log(error) ;
      });
    } else {
      this.copyStatusMassage = "Browser do not supprt clipboard";
      this.copyStatus = true;
    }
      
    setTimeout(() => {
      this.copyStatus = false;
    }, 3000);
  }
}
