import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatMenuModule, MatToolbarModule } from '@angular/material';

import { RouteGuardService } from './route-guard.service';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { NetworkService } from './network.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        MatToolbarModule,
        MatMenuModule,
    ],
    declarations: [
        HeaderComponent
    ],
    providers: [
        RouteGuardService,
        UserService,
        NetworkService
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
