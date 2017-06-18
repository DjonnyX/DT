import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { LoginComponent } from '../authorization/login/login.component';
import { ShopsComponent } from '../workflow/shops/shops.component';
import { ModulesComponent, ModulesFilterAllComponent, ModulesFilterActivatedComponent } from '../workflow/modules/modules.component';
import { SettingsComponent } from '../workflow/settings/settings.component';
import { RegistrationComponent } from '../authorization/registration/registration.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { MainComponent } from '../workflow/main/main.component';
import { CollectorInstancesComponent } from '../workflow/module/collector/instances/collector-instances.component';
import { CollectorConfiguratorComponent } from '../workflow/module/collector/configurator/collector-configurator.component';
import { CollectorComponent } from '../workflow/module/collector/collector.component';
import { QueueComponent } from '../workflow/module/queue/queue.component';
import { KioskComponent } from '../workflow/module/kiosk/kiosk.component';

export const ROUTES: Routes =
  [
    { path: '', redirectTo: 'authorization', pathMatch: 'full' },
    { path: 'authorization',  component: AuthorizationComponent,
      children:
        [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: RegistrationComponent }
        ]
    },
    { path: 'workflow', component: WorkflowComponent,
      children:
        [
          { path: '', redirectTo: 'main', pathMatch: 'full' },
          { path: 'main', component: MainComponent },
          { path: 'shops', component: ShopsComponent },
          { path: 'modules', component: ModulesComponent, children:
            [
              { path: '', redirectTo: 'all', pathMatch: 'full' },
              { path: 'all', component: ModulesFilterAllComponent },
              { path: 'activated', component: ModulesFilterActivatedComponent }
            ]
          },
          // Модули
          { path: 'modules/collector', component: CollectorComponent, children:
            [
              { path: '', redirectTo: 'instances', pathMatch: 'full' },
              { path: 'instances', component: CollectorInstancesComponent },
              { path: 'configurator', component: CollectorConfiguratorComponent }
            ]
          },
          { path: 'modules/queue', component: QueueComponent },
          { path: 'modules/kiosk', component: KioskComponent },

          { path: 'settings', component: SettingsComponent }
        ]
    }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRouterModule {

}
