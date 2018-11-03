import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { TodoNote } from '../../todo-note';
import { TodoNoteService } from '../../todo-note.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-todo-note-list-item',
    templateUrl: './todo-note-list-item.component.html',
})
export class TodoNoteListItemComponent {
    @Input() item: TodoNote;

    constructor(private router: Router,
                private todoService: TodoNoteService,
                private snackBar: MatSnackBar) {}

    async archive(): Promise<void> {
        try {
            await this.todoService.archiveTodoNote(this.item.id);
            this.snackBar.open('Todo note has been archived');
        } catch (err) {
            this.snackBar.open('Error: ' + err.message);
        }
    }

    async delete(): Promise<void> {
        try {
            await this.todoService.deleteTodoNote(this.item.id);
            this.snackBar.open('Todo note has been deleted');
        } catch (err) {
            this.snackBar.open('Error: ' + err.message);
        }
    }

    async activate(): Promise<void> {
        try {
            await this.todoService.activateTodoNote(this.item.id);
            this.snackBar.open('Todo note has been returned from archive');
        } catch (err) {
            this.snackBar.open('Error: ' + err.message);
        }
    }

    viewDetails(): void {
        this.router.navigateByUrl(`/notes/note/${this.item.id}`);
    }
}
