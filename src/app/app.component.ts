import { Component } from '@angular/core';
import { TodoNoteService } from './todo-notes/todo-note.service';

@Component({
    selector: 'td-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private todoService: TodoNoteService) {}

    ngOnInit(): void {
        //this.todoService.initializeMockCollection();
    }
}

