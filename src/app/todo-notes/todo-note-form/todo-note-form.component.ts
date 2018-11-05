import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

import { TodoNote } from '../todo-note';
import { TodoNoteService } from '../todo-note.service';
import { UserService } from '../../core/user.service';
import { observableToPromise } from '../../shared/helpers/observable-to-promise';
import { MatSnackBar } from '@angular/material';
import { debounceTime } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todo-note-form.component.html'
})
export class TodoNoteFormComponent implements OnInit {
    note: ReplaySubject<TodoNote> = new ReplaySubject(1);

    form: FormGroup;

    private uid: string;

    private noteId: string;

    constructor(private todoService: TodoNoteService,
                private userService: UserService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private clipboardService: ClipboardService,
                private snackBar: MatSnackBar) {
        this.form = this.fb.group({
            title: this.fb.control('Here your awesome title'),
            checkList: this.fb.control([]),
            hasPublicAccess: this.fb.control(false),
        });
    }

    async ngOnInit(): Promise<void> {
        let { id } = await observableToPromise(this.route.params);

        const { uid } = await observableToPromise(this.userService.user);

        this.uid = uid;

        if (id === 'create') {
            const note = await this.initializeTodoNote();
            id = await this.todoService.addTodoNote(note);
        }

        this.noteId = id;

        this.todoService
            .getObservableTodoNoteById(id)
            .subscribe(this.note);

        this.note.subscribe((note: TodoNote) => {
            this.form.patchValue({
                title: note.title,
                checkList: note.checkList,
                hasPublicAccess: note.hasPublicAccess
            });
        });

        this.form
            .valueChanges
            .pipe(debounceTime(250))
            .subscribe(values => this.todoService.updateTodoNote(id, values));
    }

    getPublicAccessUrl(): string {
        return `${window.location.protocol}//${window.location.host}/notes/note/${this.noteId}`;
    }

    copyAccessUrl(): void {
        this.clipboardService.copyFromContent(this.getPublicAccessUrl());
        this.snackBar.open('URL has been copied to clipboard');
    }

    private async initializeTodoNote(): Promise<TodoNote> {
        const { title, checkList, hasPublicAccess } = this.form.value;

        const note = new TodoNote();

        note.userId = this.uid;
        note.title = title;
        note.checkList = checkList;
        note.hasPublicAccess = hasPublicAccess;

        return note;
    }
}
