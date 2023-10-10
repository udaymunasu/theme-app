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
import { DsModalWindow } from './components/modal/modal-window';
import { NgbModalBackdrop } from './components/modal/modal-backdrop';
import { DsActiveModal } from './components/modal/modal-ref';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { DialogService } from './primeng-modal/dialog/dynamicdialog/public_api';
import {
  ModalDismissDirective,
  ModalCloseDirective,
} from './components/modal/modal-close-dir.directive';
import { HeaderComponent } from './components/header/header.component';
import { HeaderActionComponent } from './components/header/ds-header-action/ds-header-action';
import { SubHeaderComponent } from './components/header/ds-sub-header/ds-sub-header';
import { MegamenuComponent } from './components/megamenu/megamenu.component';
import { MegamenuDemoComponent } from './demos/megamenu-demo/megamenu-demo.component';
import { PopoverDirective } from './components/popover/popover.component';
import { Tooltip } from './components/popover/popover.directive';
import { CustomPopoverComponent } from './components/popover/custom-popover';
import { SidebarService } from './components/sidebar/sidebar.service';
import { PopoverDemoComponent } from './demos/popover-demo/popover-demo.component';
import { closeDirective } from './components/sidebar/close-directive';
import { SidebarWindow } from './components/sidebar/sidebar-window';
import { appSidebarComponent } from './layout/sidebar/sidebar.component';
import { appHeaderComponent } from './layout/header/header.component';
import { DsDropdownComponent } from './components/ds-dropdown/ds-dropdown.component';
import { DsDropdownInputComponent } from './components/ds-dropdown/ds-dropdown-input/ds-dropdown-input.component';
import { DsDropdownItemComponent } from './components/ds-dropdown/ds-dropdown-item/ds-dropdown-item.component';
import { DsTabsComponent } from './components/ds-tabs/ds-tabs.component';
import { DsTabComponent } from './components/ds-tabs/ds-tab/ds-tab.component';
import { DsTabHeaderComponent } from './components/ds-tabs/ds-tab-header/ds-tab-header.component';
import { DsTabBodyComponent } from './components/ds-tabs/ds-tab-body/ds-tab-body.component';
import { DSTabsService } from './components/ds-tabs/ds-tab.service';
import { PortalModule } from '@angular/cdk/portal';
import { TabsDemoComponent } from './demos/tabs-demo/tabs-demo.component';
import { IconGenComponent } from './components/icon-gen/icon-gen.component';
import { FormsModule } from '@angular/forms';
import { DropdownDemoComponent } from './demos/dropdown-demo/dropdown-demo.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonDemoComponent } from './demos/button-demo/button-demo.component';
import { DsDropdownService } from './components/ds-dropdown/dropdown.service';
import { AgGridDemoComponent } from './demos/ag-grid/ag-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

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
    DsModalWindow,
    ModalDismissDirective,
    ModalCloseDirective,
    ExampleModalComponent,
    HeaderComponent,
    HeaderActionComponent,
    SubHeaderComponent,
    closeDirective,
    MegamenuComponent,
    MegamenuDemoComponent,
    PopoverDirective,
    Tooltip,
    PopoverDemoComponent,
    
    appSidebarComponent,
    appHeaderComponent,
    SidebarWindow,
    DsDropdownComponent,
    DsDropdownInputComponent,
    DsDropdownItemComponent,
    DsTabsComponent,
    DsTabComponent,
    DsTabHeaderComponent,
    DsTabBodyComponent,
    TabsDemoComponent,
    IconGenComponent,
    DropdownDemoComponent,
    ButtonComponent,
    ButtonDemoComponent,
    AgGridDemoComponent
  ],
  imports: [
    HttpClientModule,
    AgGridModule,
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,PortalModule, FormsModule],
  entryComponents: [DsModalWindow, NgbModalBackdrop],
  exports: [
    bnyCssTooltipDirective,
    ModalDismissDirective,
    ModalCloseDirective,
    HeaderComponent,
    closeDirective,
  ],
  providers: [
    DsDropdownService,
    DsModal,
    NgbModalStack,
    DsActiveModal,
    SidebarService,
    closeDirective,
    DialogService,appSidebarComponent, DSTabsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
