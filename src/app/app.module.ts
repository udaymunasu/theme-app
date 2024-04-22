import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelDemoComponent } from './demos/panel-demo/panel-demo.component';
import { HeaderDemoComponent } from './demos/header-demo/header-demo.component';
import { CardDemoComponent } from './demos/card-demo/card-demo.component';
import { ModelDemoComponent } from './demos/model-demo/model-demo.component';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { MegamenuDemoComponent } from './demos/megamenu-demo/megamenu-demo.component';
import { PopoverDemoComponent } from './demos/popover-demo/popover-demo.component';
import { SidebarWindow } from './components/sidebar/sidebar-window';
import { appSidebarComponent } from './layout/sidebar/sidebar.component';
import { appHeaderComponent } from './layout/header/header.component';
import { PortalModule } from '@angular/cdk/portal';
import { TabsDemoComponent } from './demos/tabs-demo/tabs-demo.component';
import { FormsModule } from '@angular/forms';
import { DropdownDemoComponent } from './demos/dropdown-demo/dropdown-demo.component';
import { ButtonDemoComponent } from './demos/button-demo/button-demo.component';
import { AgGridDemoComponent } from './demos/ag-grid/ag-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CustomComponentsModule } from './components/custom-components.module';
import { DropdownMenuDemoComponent } from './demos/dropdown-menu-demo/dropdown-menu-demo.component';
import { InputDemoComponent } from './demos/input-demo/input-demo.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { IconDemoComponent } from './demos/icon-demo/icon-demo.component';
import { CustomThemeComponent } from './mode-switch/custom-theme/custom-theme/custom-theme.component';
import { ShowCodeComponent } from './components/show-code/show-code.component';
import { CarouselDemoComponent } from './demos/carousel-demo/carousel-demo.component';
import { TooltipDemoComponent } from './demos/tooltip-demo/tooltip-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelDemoComponent,
    HeaderDemoComponent,
    CardDemoComponent,
    ModelDemoComponent,
    ExampleModalComponent,
    MegamenuDemoComponent,
    PopoverDemoComponent,
    appSidebarComponent,
    appHeaderComponent,
    SidebarWindow,
    TabsDemoComponent,
    DropdownDemoComponent,
    ButtonDemoComponent,
    AgGridDemoComponent,
    DropdownMenuDemoComponent,
    InputDemoComponent,
    DashboardComponent,
    IconDemoComponent,
    CustomThemeComponent,
    CarouselDemoComponent,
    TooltipDemoComponent,
  ],
  imports: [
    CustomComponentsModule,
    HttpClientModule,
    AgGridModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PortalModule,
    FormsModule,
  ],
  entryComponents: [],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
