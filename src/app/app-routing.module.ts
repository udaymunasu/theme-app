import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsComponent } from './components/icons/icons.component';
import { CardDemoComponent } from './demos/card-demo/card-demo.component';
import { HeaderDemoComponent } from './demos/header-demo/header-demo.component';
import { MegamenuDemoComponent } from './demos/megamenu-demo/megamenu-demo.component';
import { ModelDemoComponent } from './demos/model-demo/model-demo.component';
import { PanelDemoComponent } from './demos/panel-demo/panel-demo.component';
import { PopoverDemoComponent } from './demos/popover-demo/popover-demo.component';
import { TabsDemoComponent } from './demos/tabs-demo/tabs-demo.component';

const routes: Routes = [
  {
    path: 'Icons',
    component: IconsComponent
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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
