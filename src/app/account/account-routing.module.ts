import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { RouteGuardService } from '../core/route-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [RouteGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
