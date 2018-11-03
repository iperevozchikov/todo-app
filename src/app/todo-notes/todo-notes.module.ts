import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TodoNoteService } from './todo-note.service';
import { TodoNotesComponent } from './todo-notes.component';
import { TodoNotesRoutingModule } from './todo-notes-routing.module';
import { TodoNoteListComponent } from './todo-note-list/todo-note-list.component';
import { TodoNoteListItemComponent } from './todo-note-list/todo-note-list-item/todo-note-list-item.component';
import { LuxonModule } from 'luxon-angular';


@NgModule({
    declarations: [
        TodoNotesComponent,
        TodoNoteListComponent,
        TodoNoteListItemComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule,
        MatSnackBarModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        LuxonModule,
        TodoNotesRoutingModule
    ],
    providers: [
        TodoNoteService
    ]
})
export class TodoNotesModule {}