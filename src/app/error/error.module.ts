import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestrictedAccessComponent } from './restricted-access/restricted-access.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        RestrictedAccessComponent
    ],
    imports: [
        SharedModule,
        ErrorRoutingModule
    ]
})
export class ErrorModule {}