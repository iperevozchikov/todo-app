import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoNoteService } from './todo-notes/todo-note.service';
import { NetworkService } from './core/network.service';

@Component({
    selector: 'td-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private todoService: TodoNoteService,
                private networkService: NetworkService) {}

    ngOnInit(): void {
        //this.todoService.initializeMockCollection();
        this.networkService.observeNetworkState();
    }

    ngOnDestroy(): void {
        this.networkService.stopObservingNetworkState();
    }
}

