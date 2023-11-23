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
  ) {}

  themedata: any;
  selectOptions: any;
  reset: boolean = false;
  baseColor: any = {};
  newThemeData: any;
  selectedThemeCategory: any;
  selectedThemeName: any;

  ngOnInit(): void {
    this.colorsService.getColors().subscribe((response) => {});

    this.colorsService.getThemes().subscribe((response) => {
      this.themedata = JSON.parse(JSON.stringify(response));
      this.selectOptions = Object.keys(this.themedata).map((Theme) => ({
        lable: Theme,
        value: Theme,
      }));
      console.log(' this.themedata', this.themedata, this.selectOptions);
    });
  }

  hslChange($event, category, hsl) {
    let hslValue: any = parseInt($event.target.value);
    this.reset = true;
    this.baseColor[category][hsl] = hslValue;
    this.baseColor[category]['hexValue'] = $event.target.value;
    this.baseColor[category]['isUpdated'] = true;
    this.applyTempTheme(category);
  }

  hexChange($event, category) {
    this.baseColor[category] = this.hexToHSL($event.target.value);
    this.baseColor[category]['hexValue'] = $event.target.value;
    this.baseColor[category]['isUpdated'] = true;
    this.applyTempTheme(category);
    this.reset = true;
  }


  themeChange(event) {
    if(event) {
      this.selectedThemeName = event.trget.value;
    }
  }

  applyTempTheme(category) {
    this.colorsService.getThemes().subscribe((theme) => {
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
      this.hostElement.nativeElement.querySelector('.div-selected');
    Object.keys(this.newThemeData).forEach((section) => {
      Object.keys(this.newThemeData[section]).forEach((subSection) => {
        Object.keys(this.newThemeData[section][subSection]).forEach((keys) => {
          if (subSection == category && keys != 'base') {
            const { h, s, l } = this.newThemeData[section][subSection][keys].hsl;
            selectedDiv.style.setProperety(
              `--ds-${this.newThemeData[section][subSection][keys].var}`,
              `hsl(${this.baseColor[category]['h'] + h}, ${
                this.baseColor[category]['s'] + s
              }%, ${this.baseColor[category]['l'] + l}%)`
            );
          }
        });
      });
    });
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
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
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

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }
}
