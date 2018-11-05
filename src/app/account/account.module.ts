import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule,
        MatCardModule,
    ],
})
export class AccountModule {
}