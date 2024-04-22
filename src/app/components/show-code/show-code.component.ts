import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Prism from 'prismjs';
// import 'prismjs/components/prism-typescript'; // Import the TypeScript grammar

export interface Code {
  basic?: string;
  html?: string;
  typescript?: string;
  command?: string;
  scss?: string;
  data?: string;
  module?: string;
  routerModule?: string;
  component?: string;
  service?: string[];
  imports?: string[];
}

@Component({
  selector: 'app-code-display',
  templateUrl: './show-code.component.html',
  styleUrls: ['./show-code.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ShowCodeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    @Inject(DOCUMENT) public document: Document
  ) {}

  @Input() code!: Code;

  @ViewChild('codeElement') codeElement: ElementRef;

  lang!: string;

  ngOnInit() {
    this.lang = this.getInitialLang();
  }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
        if (window['Prism'] && this.codeElement && !this.codeElement.nativeElement.classList.contains('prism')) {
            window['Prism'].highlightElement(this.codeElement.nativeElement);
            this.codeElement.nativeElement.classList.add('prism');
            this.codeElement.nativeElement.parentElement.setAttribute('tabindex', '-1');
        }
    }
}


  getInitialLang(): string {
    if (this.code) {
      return Object.keys(this.code)[0];
    }
  }

  copyCode() {
    const code = this.codeElement.nativeElement.textContent;
    const el = document.createElement('textarea');
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Code copied to clipboard!');
  }

  ngAfterViewInit(): void {
   
  }
}
