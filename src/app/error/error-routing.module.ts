import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestrictedAccessComponent } from './restricted-access/restricted-access.component';

export const routes: Routes = [
    { path: 'error/page-not-found', component: PageNotFoundComponent },
    { path: 'error/restricted-access', component: RestrictedAccessComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule {
}
