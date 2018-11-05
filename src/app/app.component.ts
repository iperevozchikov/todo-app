import { Component, OnDestroy, OnInit } from '@angular/core';

import { NetworkService } from './core/network.service';

@Component({
    selector: 'td-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private networkService: NetworkService) {}

    ngOnInit(): void {
        this.networkService.observeNetworkState();
    }

    ngOnDestroy(): void {
        this.networkService.stopObservingNetworkState();
    }
}
