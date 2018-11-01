import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatSnackBarModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        MatSnackBarModule,
        MatCardModule,
        MatButtonModule
    ],
})
export class AccountModule {
}