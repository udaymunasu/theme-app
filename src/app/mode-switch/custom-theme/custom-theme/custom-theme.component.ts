import { JsonpClientBackend } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CustomThemeService } from '../../custom-theme.service';
import { DesignTokens } from './design-token';

@Component({
  selector: 'app-custom-theme',
  templateUrl: './custom-theme.component.html',
  styleUrls: ['./custom-theme.component.scss'],
})
export class CustomThemeComponent implements OnInit {
  constructor(
    private colorsService: CustomThemeService,
    private hostElement: ElementRef
  ) {}

  themedata: any;
  selectedItem: any;
  selectOptions: any;
  reset: boolean = false;
  baseColor: any = {};
  tokenTemplate: any;
  selectedThemeCategory: any = 'Lavender';
  selectedThemeName: any = 'Sunrise';
  hexColor: any;
  openCategoryPanel: { [key: string]: boolean } = {};
  uiModel: any;

  ngOnInit(): void {
    this.selectOptions = [];

    this.colorsService.getThemes().subscribe((response) => {
      this.themedata = JSON.parse(JSON.stringify(response));

      this.themedata.forEach((themes) => {
        let selectOpts = {
          label: Object.keys(themes)[0],
          value: Object.keys(themes)[0],
        };
        this.selectOptions.push(selectOpts);
        console.log(
          'this.selectOptions',
          Object.keys(themes)[0],
          this.themedata,
          this.selectOptions
        );
      });

      this.loadTokensTemplate();
    });
  }

  loadTokensTemplate() {
    this.colorsService.getColors().subscribe((theme) => {
      console.log('theme', theme);
      this.tokenTemplate = theme;
      this.themeChange();
    });
  }

  hslChange($event, category, hsl) {
    let hslValue: any = parseInt($event.target.value);
    this.reset = true;
    this.baseColor[category][hsl] = hslValue;
    this.baseColor[category]['hexColor'] = this.HSLToHex(
      this.baseColor[category]['h'],
      this.baseColor[category]['s'],
      this.baseColor[category]['l']
    );
    this.applyTempTheme(category);
  }

  hexChange($event, category) {
    if ($event.target.value.length === 7) {
      this.baseColor[category] = this.hexToHSL($event.target.value);
      this.baseColor[category]['hexColor'] = $event.target.value;
      this.applyTempTheme(category);
      this.reset = true;
    }
  }

  themeChange(event?): void {
    if (event) {
      this.selectedThemeName = event.target.value;
    }
    this.themedata.forEach((theme) => {
      if (theme[this.selectedThemeName]) {
        this.selectedItem = theme[this.selectedThemeName];
      }
    });
    const selectedItems = _.merge(this.tokenTemplate, this.selectedItem);
    this.convertToUiModel(selectedItems);
    DesignTokens.addTokens(this.selectedItem, ['.custom-theme']);
    this.reset = true;
  }

  applyTempTheme(category, type?, path?, tokenValue?) {
    if (this.tokenTemplate == null) {
      return;
    }
    this.selectedThemeCategory = category;

    Object.keys(this.tokenTemplate).forEach((section) => {
      Object.keys(this.tokenTemplate[section]).forEach((subSection) => {
        Object.keys(this.tokenTemplate[section].values).forEach((keys) => {
          if (this.tokenTemplate[section].type == 'color') {
            if (this.tokenTemplate[section].values[category]) {
              debugger;
              this.tokenTemplate[section].values[category].base.hsl =
                this.baseColor[category];
              console.log(
                'this.tokenTemplate[section].values[category].base.hsl',
                this.tokenTemplate[section].values[category].base.hsl
              );
              Object.keys(this.tokenTemplate[section].values[category]).forEach(
                (values) => {
                  this.tokenTemplate[section].values[category][values].value =
                    '';
                }
              );
            }
          } else {
            if (this.tokenTemplate[section].values[category]) {
              this.tokenTemplate[section].values[category][path].value =
                tokenValue;
            }
          }
        });
      });
    });
    DesignTokens.addTokens(this.tokenTemplate, ['.custom-theme']);
  }

  applyThemeGlobally() {}

  convertToUiModel(jsonData) {
    this.uiModel = [];
    let categoryObj: any = {};

    if (jsonData == null) {
      return;
    }

    for (const key in jsonData) {
      for (const category in jsonData[key].values) {
        const type = jsonData[key].type;
        if (jsonData[key].type == 'color') {
          const baseName = jsonData[key].values[category]?.base.baseName;
          const baseValue = jsonData[key].values[category]?.base.value
            ? jsonData[key].values[category]?.base.value
            : '';
          const baseHsl = jsonData[key].values[category]?.base.hsl
            ? jsonData[key].values[category]?.base.hsl
            : '';
          this.baseColor[category] = baseHsl;
          this.baseColor[category]['hexColor'] = baseValue;
          categoryObj = {
            type,
            category,
            baseName,
            baseHsl,
            baseValue,
            subCategories: [] as any[],
          };
        } else {
          const baseName =
            jsonData[key].values[category][
              Object.keys(jsonData[key].values[category])[0]
            ].var.split('-')[0];
          categoryObj = {
            type,
            category,
            baseName,
            subCategories: [] as any[],
          };
        }
        for (const subCategory in jsonData[key].values[category]) {
          if (subCategory != 'base') {
            const itemObj: any = {
              var: jsonData[key].values[category][subCategory]?.var,
              hsl: jsonData[key].values[category][subCategory]?.hsl
                ? jsonData[key].values[category][subCategory]?.hsl
                : '',
              value: jsonData[key].values[category][subCategory]?.value
                ? jsonData[key].values[category][subCategory]?.value
                : '',
              scssVar: `${category}${subCategory}`,
              path: subCategory,
            };
            categoryObj.subCategories.push(itemObj);
          }
        }
        this.uiModel.push(categoryObj);
      }

      debugger
      console.log('this.uiModel', this.uiModel);
    }
  }

  openSelector(category, hue, sat, lit) {
    this.openCategoryPanel[category] = !this.openCategoryPanel[category];
    const { h, s, l } = this.baseColor[category];
    this.hexColor = this.HSLToHex(hue, sat, lit);
    this.baseColor[category]['hexColor'] = this.hexColor;
  }

  closeSelector(category) {
    this.openCategoryPanel[category] = false;
  }

  HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r: any,
      g: any,
      b: any;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
  }

  hexToHSL(H) {
    // Convert hex to RGB first
    let r: any, g: any, b: any;
    if (H.length == 4) {
      r = parseInt('0x' + H[1] + H[1]);
      g = parseInt('0x' + H[2] + H[2]);
      b = parseInt('0x' + H[3] + H[3]);
    } else if (H.length == 7) {
      r = parseInt('0x' + H[1] + H[2]);
      g = parseInt('0x' + H[3] + H[4]);
      b = parseInt('0x' + H[5] + H[6]);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = Math.round(((cmax + cmin) / 2) * 100);
    s =
      delta == 0
        ? 0
        : Math.round((delta / (1 - Math.abs((2 * l) / 100 - 1))) * 100);

    return { h: h, s: s, l: l };
  }
}
