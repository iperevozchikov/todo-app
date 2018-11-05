import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';

import { ScreenCenterComponent } from './components/screen-center/screen-center.component';

@NgModule({
    declarations: [
        ScreenCenterComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        ScreenCenterComponent
    ]
})
export class SharedModule {}