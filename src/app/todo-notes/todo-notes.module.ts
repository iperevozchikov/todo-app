import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule,
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClipboardModule } from 'ngx-clipboard';
import { LuxonModule } from 'luxon-angular';

import { TodoNoteService } from './todo-note.service';
import { TodoNotesComponent } from './todo-notes.component';
import { TodoNotesRoutingModule } from './todo-notes-routing.module';
import { TodoNoteListComponent } from './todo-note-list/todo-note-list.component';
import { TodoNoteListItemComponent } from './todo-note-list/todo-note-list-item/todo-note-list-item.component';
import { TodoNoteFormComponent } from './todo-note-form/todo-note-form.component';
import { ChecklistSelectComponent } from './todo-note-form/checklist-select.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        TodoNotesComponent,
        TodoNoteListComponent,
        TodoNoteListItemComponent,
        TodoNoteFormComponent,
        ChecklistSelectComponent
    ],
    imports: [
        SharedModule,
        ScrollingModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        LuxonModule,
        ClipboardModule,
        TodoNotesRoutingModule
    ],
    providers: [
        TodoNoteService
    ]
})
export class TodoNotesModule {}