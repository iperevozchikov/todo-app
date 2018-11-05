import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-screen-center',
    templateUrl: './screen-center.component.html'
})
export class ScreenCenterComponent {}