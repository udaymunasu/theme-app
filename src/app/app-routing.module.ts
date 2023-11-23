import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconGenComponent } from './components/icon-gen/icon-gen.component';
import { IconsComponent } from './components/icons/icons.component';
import {  AgGridDemoComponent } from './demos/ag-grid/ag-grid.component';
import { ButtonDemoComponent } from './demos/button-demo/button-demo.component';
import { CardDemoComponent } from './demos/card-demo/card-demo.component';
import { DropdownDemoComponent } from './demos/dropdown-demo/dropdown-demo.component';
import { DropdownMenuDemoComponent } from './demos/dropdown-menu-demo/dropdown-menu-demo.component';
import { HeaderDemoComponent } from './demos/header-demo/header-demo.component';
import { IconDemoComponent } from './demos/icon-demo/icon-demo.component';
import { InputDemoComponent } from './demos/input-demo/input-demo.component';
import { MegamenuDemoComponent } from './demos/megamenu-demo/megamenu-demo.component';
import { ModelDemoComponent } from './demos/model-demo/model-demo.component';
import { PanelDemoComponent } from './demos/panel-demo/panel-demo.component';
import { PopoverDemoComponent } from './demos/popover-demo/popover-demo.component';
import { TabsDemoComponent } from './demos/tabs-demo/tabs-demo.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CustomThemeComponent } from './mode-switch/custom-theme/custom-theme/custom-theme.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'buttons',
    component: ButtonDemoComponent
  },
  {
    path: 'input',
    component: InputDemoComponent
  },
  {
    path: 'customTheme',
    component: CustomThemeComponent
  },
  {
    path: 'grid',
    component: AgGridDemoComponent
  },
  {
    path: 'icons',
    component: IconDemoComponent
  },
  {
    path: 'iconGen',
    component: IconGenComponent
  },
  {
    path: 'panel',
    component: PanelDemoComponent
  },
  {
    path: 'header',
    component: HeaderDemoComponent
  },
  {
    path: 'card',
    component: CardDemoComponent
  },
  {
    path: 'modal',
    component: ModelDemoComponent
  },
  {
    path: 'header',
    component: HeaderDemoComponent
  },
  {
    path: 'megamenu',
    component: MegamenuDemoComponent
  },
  {
    path: 'popover',
    component: PopoverDemoComponent
  },
  {
    path: 'tabs',
    component: TabsDemoComponent
  },
  {
    path: 'dropdown',
    component: DropdownDemoComponent
  },
  {
    path: 'dropdown-menu',
    component: DropdownMenuDemoComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
