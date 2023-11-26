import { JsonpClientBackend } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CustomThemeService } from '../../custom-theme.service';

@Component({
  selector: 'app-custom-theme',
  templateUrl: './custom-theme.component.html',
  styleUrls: ['./custom-theme.component.scss'],
})
export class CustomThemeComponent implements OnInit {
  constructor(
    private colorsService: CustomThemeService,
    private hostElement: ElementRef
  ) { }

  themedata: any;
  selectedItem: any;
  selectOptions: any;
  reset: boolean = false;
  baseColor: any = {};
  newThemeData: any;
  selectedThemeCategory: any = 'Lavender';
  selectedThemeName: any = 'Sunrise';

  ngOnInit(): void {
    this.colorsService.getColors().subscribe((response) => {
      this.newThemeData = JSON.parse(JSON.stringify(response));
    });
    this.colorsService.getThemes().subscribe((theme) => {
      this.themedata = theme;
      this.selectOptions = Object.keys(this.themedata).map((Theme) => ({
        label: Theme,
        value: Theme,
      }));
      this.themeChange();
    });
  }

  hexColor: any;
  openCategoryPanel: { [key: string]: boolean } = {};

  hslChange($event, category, hsl) {
    let hslValue: any = parseInt($event.target.value);
    this.reset = true;
    this.baseColor[category][hsl] = hslValue;
    this.baseColor[category]['hexColor'] = this.HSLToHex(
      this.baseColor[category]['h'],
      this.baseColor[category]['s'],
      this.baseColor[category]['l']
    );
    this.baseColor[category]['isUpdated'] = true;
    this.applyTempTheme(category);
  }

  hexChange($event, category) {
    if ($event.target.value.length === 7) {
      // If baseColor[category] is not an object, initialize it

      // Directly set the hexColor property
      this.baseColor[category] = this.hexToHSL($event.target.value);
      this.baseColor[category]['hexColor'] = $event.target.value;
      this.baseColor[category]['isUpdated'] = true;
      console.log('hslValue', this.baseColor[category]);
    }
    this.applyTempTheme(category);
    this.reset = true;
  }

  themeChange(event?: any): void {
    if (event?.target?.value) {
      this.selectedThemeName = event.target.value;
    }
    const selectedDiv =
      this.hostElement.nativeElement.querySelector('.sb-palette-panel');
    this.selectedItem = this.themedata[this.selectedThemeName];
    Object.keys(this.selectedItem).forEach((section) => {
      Object.keys(this.selectedItem[section]).forEach((subSection) => {
        let baseColor: any = {};
        for (
          let i =
            Object.keys(this.selectedItem[section][subSection]).length - 1;
          i >= 0;
          i--
        ) {
          this.closeSelector(subSection)
          const keys = Object.keys(this.selectedItem[section][subSection])[i];
          if (keys == 'base') {
            baseColor = this.selectedItem[section][subSection][keys].hsl;
            this.baseColor[subSection] = baseColor;
            this.baseColor[subSection]['isUpdated'] = true;
          } else {
            let value;
            if (this.selectedItem[section][subSection][keys].value) {
              value = this.selectedItem[section][subSection][keys].value;
            } else {
              const { h, s, l } =
                this.selectedItem[section][subSection][keys].hsl;
              value = `hsl(${baseColor.h + h}, ${baseColor.s + s}%, ${baseColor.l + l
                }%)`;
            }

            selectedDiv.style.setProperty(
              `--ds-${this.newThemeData[section][subSection][keys].var}`,
              value
            );
          }
        }
      });
    });
    this.convertToUiModel(this.selectedItem);
  }

  applyTempTheme(category) {
    this.colorsService.getColors().subscribe((theme) => {
      this.newThemeData = theme;
      this.setTempTheme(this.newThemeData, category);
    });
  }

  setTempTheme(jsonData, category) {
    if (jsonData == null) {
      return;
    }
    this.selectedThemeCategory = category;
    const selectedDiv =
      this.hostElement.nativeElement.querySelector('.sb-palette-panel');
    // console.log("selectedDiv", selectedDiv)
    Object.keys(this.newThemeData).forEach((section) => {
      Object.keys(this.newThemeData[section]).forEach((subSection) => {
        Object.keys(this.newThemeData[section][subSection]).forEach((keys) => {
          if (subSection == category) {
            if (keys != 'base') {
              const { h, s, l } =
                this.newThemeData[section][subSection][keys].hsl;
              selectedDiv.style.setProperty(
                `--ds-${this.newThemeData[section][subSection][keys].var}`,
                `hsl(${this.baseColor[category]['h'] + h}, ${this.baseColor[category]['s'] + s
                }%, ${this.baseColor[category]['l'] + l}%)`
              );
              // console.log("`hsl(${this.baseColor[category]['h'] + h}, ${this.baseColor[category]['s'] + s}%, ${this.baseColor[category]['l'] + l}%)`",`--ds-${this.newThemeData[section][subSection][keys].var}`, `hsl(${this.baseColor[category]['h'] + h}, ${this.baseColor[category]['s'] + s}%, ${this.baseColor[category]['l'] + l}%)`)
            }
          }
        });
      });
    });
  }

  applyThemeGlobally() { }
  uiModel: any[] = [];

  convertToUiModel(jsonData) {
    this.uiModel = [];
    if (jsonData) {
      for (const mode in jsonData) {
        const metaData = jsonData[mode];

        for (const category in metaData) {
          const categoryData = metaData[category];
          const baseName = categoryData?.base.baseName;
          const baseValue = categoryData?.base.var;
          const baseHsl = categoryData?.base.hsl;
          const categoryObj: any = {
            category,
            baseName,
            baseHsl,
            baseValue,
            subCategories: [] as any[],
          };

          for (const subCategory in categoryData) {
            const subCategoryData = categoryData[subCategory];
            const itemObj: any = {
              type: subCategoryData.type,
              var: subCategoryData.var,
              basename: subCategoryData.baseName,
              value: subCategoryData.vaue ? subCategoryData.vaue : '',
              hsl: subCategoryData.hsl ? subCategoryData.hsl : '',
            };

            categoryObj.subCategories.push(itemObj);
          }
          this.uiModel.push(categoryObj);
        }
        console.log('this.uiModel', this.uiModel);
      }
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
