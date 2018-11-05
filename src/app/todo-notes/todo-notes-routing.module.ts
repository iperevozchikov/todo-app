import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoNotesComponent } from './todo-notes.component';
import { TodoNoteFormComponent } from './todo-note-form/todo-note-form.component';
import { RouteGuardService } from '../core/route-guard.service';

export const routes: Routes = [
    { path: 'notes', component: TodoNotesComponent, canActivate: [RouteGuardService] },
    { path: 'notes/archived', component: TodoNotesComponent, canActivate: [RouteGuardService] },
    { path: 'notes/note/:id', component: TodoNoteFormComponent, canActivate: [RouteGuardService] },
    { path: 'notes/note/create', component: TodoNoteFormComponent, canActivate: [RouteGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoNotesRoutingModule {
}
