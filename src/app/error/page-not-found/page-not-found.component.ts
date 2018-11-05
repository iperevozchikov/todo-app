import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
}