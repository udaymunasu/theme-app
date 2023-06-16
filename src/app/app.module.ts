import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';
import { IconsComponent } from './components/icons/icons.component';
import { bnyCssTooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModeSwitchComponent,
    IconsComponent,
    bnyCssTooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [bnyCssTooltipDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
