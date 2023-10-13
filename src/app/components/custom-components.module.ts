import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons/icons.component';
import { bnyCssTooltipDirective } from '../tooltip.directive';
import { CardComponent } from './card/card.component';
import { ContainerComponent } from './container/container.component';
import { PanelComponent } from './panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { appSidebarComponent } from '../layout/sidebar/sidebar.component';
import { DialogService } from './primeng-modal/dialog/dynamicdialog/dialogservice';
import { DsDropdownService } from './ds-dropdown/dropdown.service';
import { DSTabsService } from './ds-tabs/ds-tab.service';
import { DsActiveModal } from './modal/modal-ref';
import { NgbModalStack } from './modal/modal-stack';
import { DsModal } from './modal/modal.service';
import { closeDirective } from './sidebar/close-directive';
import { SidebarService } from './sidebar/sidebar.service';
import { ModalDismissDirective, ModalCloseDirective } from './modal/modal-close-dir.directive';
import { DsModalWindow } from './modal/modal-window';
import { HeaderActionComponent } from './header/ds-header-action/ds-header-action';
import { SubHeaderComponent } from './header/ds-sub-header/ds-sub-header';
import { MegamenuComponent } from './megamenu/megamenu.component';
import { PopoverDirective } from './popover/popover.component';
import { Tooltip } from './popover/popover.directive';
import { DsDropdownInputComponent } from './ds-dropdown/ds-dropdown-input/ds-dropdown-input.component';
import { DsDropdownItemComponent } from './ds-dropdown/ds-dropdown-item/ds-dropdown-item.component';
import { DsDropdownComponent } from './ds-dropdown/ds-dropdown.component';
import { DsTabBodyComponent } from './ds-tabs/ds-tab-body/ds-tab-body.component';
import { DsTabHeaderComponent } from './ds-tabs/ds-tab-header/ds-tab-header.component';
import { DsTabComponent } from './ds-tabs/ds-tab/ds-tab.component';
import { DsTabsComponent } from './ds-tabs/ds-tabs.component';
import { IconGenComponent } from './icon-gen/icon-gen.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { NgbModalBackdrop } from './modal/modal-backdrop';
import { ModeSwitchComponent } from '../mode-switch/mode-switch.component';
import { FlyoutComponent } from './flyout/flyout.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { DropdownMenuService } from './dropdown-menu/dropdown-menu.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ModeSwitchComponent,
    IconsComponent,
    bnyCssTooltipDirective,
    HeaderComponent,
    HeaderActionComponent,
    SubHeaderComponent,
    PanelComponent,
    CardComponent,
    ContainerComponent,
    DsModalWindow,
    ModalDismissDirective,
    ModalCloseDirective,
    closeDirective,
    MegamenuComponent,
    PopoverDirective,
    Tooltip,
    DsDropdownComponent,
    DsDropdownInputComponent,
    DsDropdownItemComponent,
    DsTabsComponent,
    DsTabComponent,
    DsTabHeaderComponent,
    DsTabBodyComponent,
    ButtonComponent,
    IconGenComponent,
    FlyoutComponent,
    DropdownMenuComponent,
  ],
  imports: [CommonModule,
    FormsModule,OverlayModule],
  providers: [
    DsDropdownService,
    DsModal,
    NgbModalStack,
    DsActiveModal,
    SidebarService,
    closeDirective,
    DialogService,
    appSidebarComponent,
    DSTabsService,
    FlyoutComponent,
    DropdownMenuService
  ],
  exports: [
    ModeSwitchComponent,
    bnyCssTooltipDirective,
    HeaderComponent,
    HeaderActionComponent,
    SubHeaderComponent,
    PanelComponent,
    CardComponent,
    ContainerComponent,
    DsModalWindow,
    ModalDismissDirective,
    ModalCloseDirective,
    closeDirective,
    MegamenuComponent,
    PopoverDirective,
    Tooltip,
    DsDropdownComponent,
    DsDropdownInputComponent,
    DsDropdownItemComponent,
    DsTabsComponent,
    DsTabComponent,
    DsTabHeaderComponent,
    DsTabBodyComponent,
    ButtonComponent,
    IconGenComponent,
    FlyoutComponent,
    DropdownMenuComponent
  ],
  entryComponents: [   
     HeaderComponent,
     DsModalWindow, NgbModalBackdrop
  ]
})
export class CustomComponentsModule {}
