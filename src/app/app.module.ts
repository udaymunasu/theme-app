import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';
import { IconsComponent } from './components/icons/icons.component';
import { bnyCssTooltipDirective } from './tooltip.directive';
import { PanelComponent } from './components/panel/panel.component';
import { CardComponent } from './components/card/card.component';
import { ContainerComponent } from './components/container/container.component';
import { PanelDemoComponent } from './demos/panel-demo/panel-demo.component';
import { HeaderDemoComponent } from './demos/header-demo/header-demo.component';
import { CardDemoComponent } from './demos/card-demo/card-demo.component';
import { ModelDemoComponent } from './demos/model-demo/model-demo.component';
import { DsModal } from './components/modal/modal.service';
import { NgbModalStack } from './components/modal/modal-stack';
import { NgbModalWindow } from './components/modal/modal-window';
import { NgbModalBackdrop } from './components/modal/modal-backdrop';
import { NgbActiveModal } from './components/modal/modal-ref';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { DialogService } from './primeng-modal/dialog/dynamicdialog/public_api';
import { ModalDismissDirective, ModalCloseDirective } from './components/modal/modal-close-dir.directive';
import { HeaderComponent } from './components/header/header.component';
import { HeaderActionComponent } from './components/header/ds-header-action/ds-header-action';
import { SubHeaderComponent } from './components/header/ds-sub-header/ds-sub-header';
import { MegamenuComponent } from './components/megamenu/megamenu.component';
import { MegamenuDemoComponent } from './demos/megamenu-demo/megamenu-demo.component';
// import { ChevronLeftIcon } from './primeng-modal/dialog/icons/chevronleft/chevronleft';
// import { ChevronRightIcon } from './primeng-modal/dialog/icons/chevronright/chevronright';
// import { TimesIcon } from './primeng-modal/dialog/icons/times/times';
// import { WindowMaximizeIcon } from './primeng-modal/dialog/icons/windowmaximize/windowmaximize';
// import { WindowMinimizeIcon } from './primeng-modal/dialog/icons/windowminimize/windowminimize';

@NgModule({
  declarations: [
    AppComponent,
    ModeSwitchComponent,
    IconsComponent,
    bnyCssTooltipDirective,
    PanelComponent,
    CardComponent,
    ContainerComponent,
    PanelDemoComponent,
    HeaderDemoComponent,
    CardDemoComponent,
    ModelDemoComponent,
    NgbModalWindow,
    ModalDismissDirective,
    ModalCloseDirective,
    ExampleModalComponent,
    HeaderComponent,
    HeaderActionComponent,
    SubHeaderComponent,
    MegamenuComponent,
    MegamenuDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,   

    
  ],
  entryComponents: [NgbModalWindow, NgbModalBackdrop],
  exports: [bnyCssTooltipDirective,ModalDismissDirective,
    ModalCloseDirective,HeaderComponent],
  providers: [DsModal, NgbModalStack, NgbActiveModal,

    DialogService
  
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
