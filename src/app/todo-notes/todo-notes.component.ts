import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TodoNoteService } from './todo-note.service';
import { TodoNote, TodoNoteState } from './todo-note';
import { ActivatedRoute } from '@angular/router';
import { observableToPromise } from '../shared/helpers/observable-to-promise';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todo-notes.component.html',
})
export class TodoNotesComponent implements OnInit {
    notes: ReplaySubject<Array<TodoNote>> = new ReplaySubject(1);

    constructor(private todoService: TodoNoteService,
                private route: ActivatedRoute) {}

    async ngOnInit(): Promise<void> {
        const routeUrl = await observableToPromise(this.route.url);

        const archived = routeUrl.toString().includes('archived');

        this.todoService
            .getTodoNotesByState(archived
                ? TodoNoteState.archived
                : TodoNoteState.active
            )
            .pipe(
                tap(items => console.log(items))
            )
            .subscribe(this.notes);
    }
}