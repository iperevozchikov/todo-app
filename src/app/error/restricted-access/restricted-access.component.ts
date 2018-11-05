import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './restricted-access.component.html'
})
export class RestrictedAccessComponent {}