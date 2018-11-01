import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { RouteGuardService } from './route-guard/route-guard.service';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule
    ],
    declarations: [
        HeaderComponent
    ],
    providers: [
        RouteGuardService,
        UserService
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
