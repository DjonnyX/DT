import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataService } from './data-service.service';

import { MdlSelectModule } from '@angular-mdl/select';

// Контролы
import { DtMenuNavigatorComponent } from './controls/dt-menunavigator/dt-menu-navigator.component';
import { DtTogglePanelComponent } from './controls/dt-togglepanel/dt-toggle-panel.component';
import { DtToggleButtonComponent } from './controls/dt-togglebutton/dt-toggle-button.component';
import { DtModuleCardComponent } from './controls/dt-module-card/dt-module-card.component';
import { DtTabbarComponent } from './controls/dt-tabbar/dt-tabbar.component';
import { DtRestItemComponent } from './controls/dt-list-item/dt-rest-item/dt-rest-item.component';
import { DtListItemComponent } from './controls/dt-list-item/dt-list-item.component';

// Стэйты
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { LoginComponent } from './authorization/login/login.component';
import { RegistrationComponent } from './authorization/registration/registration.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { SettingsComponent } from './workflow/settings/settings.component';
import { ModulesComponent, ModulesFilterAllComponent, ModulesFilterActivatedComponent } from './workflow/modules/modules.component';
import { ShopsComponent } from './workflow/shops/shops.component';
import { MainComponent } from './workflow/main/main.component';
import { ModuleComponent } from './workflow/module/module.component';
import { QueueComponent } from './workflow/module/queue/queue.component';
import { CollectorComponent } from './workflow/module/collector/collector.component';
import { CollectorInstancesComponent } from './workflow/module/collector/instances/collector-instances.component';
import { CollectorConfiguratorComponent } from './workflow/module/collector/configurator/collector-configurator.component';
import { KioskComponent } from './workflow/module/kiosk/kiosk.component';

import { RegistrationModule } from './authorization/registration/registration.module';
// Рабочее пространство

import { AppRouterModule } from './route/router.module';

import { MdlModule } from '@angular-mdl/core';

@NgModule({
  declarations: [
    CollectorInstancesComponent,
    CollectorConfiguratorComponent,
    DtMenuNavigatorComponent,
    DtToggleButtonComponent,
    DtTogglePanelComponent,
    DtModuleCardComponent,
    DtRestItemComponent,
    DtTabbarComponent,
    AppComponent,
    MainComponent,
    AuthorizationComponent,
    LoginComponent,
    RegistrationComponent,
    WorkflowComponent,
    SettingsComponent,
    ModulesComponent,
    ModulesFilterAllComponent,
    ModulesFilterActivatedComponent,
    ModuleComponent,
    ShopsComponent,
    QueueComponent,
    CollectorComponent,
    KioskComponent,
    DtListItemComponent
  ],
  imports: [
    RegistrationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule,
    RouterModule,
    MdlSelectModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
