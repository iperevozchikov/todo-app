import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TodoNote } from '../todo-note';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-todo-note-list',
    templateUrl: './todo-note-list.component.html',
})
export class TodoNoteListComponent {
    @Input() items: Array<TodoNote> = [];
}