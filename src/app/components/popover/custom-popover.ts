import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-popover',
  template: `
    <div class="popover">
      <div class="arrow"></div>
      <div class="popover-content">
        <ng-container ngIf="isTemplate(content)" else textContent>
          <ng-container *ngTempllateOutlet="content"> </ng-container>
        </ng-container>
        <ng-template #textContent>{{content}}</ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .popover {
        position: absolute;
        padding: 0.25em 0.5rem;
        max-width: 12.5rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        background: #fff;
        border-radius: 5px;
        padding: 10px;
      }

      .arrow {
          position: absolute;
          width: 10px;
          height: 10px;
          backgroung-color: #fff;
          border-width: solid;
          border-style: solid;
          border-color: #CCC;
          transform: rotate(45deg);
      }

      .popover-content {
          margin-top: 5px;
      }
    `,
  ],
})
export class CustomPopoverComponent implements OnInit {
  @Input() content: string | TemplateRef<any>;

   isTemplate(value: any): boolean {
       return value instanceof TemplateRef;
   }
  ngOnInit() {}
}
