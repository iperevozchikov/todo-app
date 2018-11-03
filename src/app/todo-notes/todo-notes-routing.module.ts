import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoNotesComponent } from './todo-notes.component';

export const routes: Routes = [
    { path: 'notes', component: TodoNotesComponent },
    { path: 'notes/archived', component: TodoNotesComponent }
    /*
    { path: 'note/:id', component: TodoNoteFormComponent },
    { path: 'note/create', component: TodoNoteFormComponent }
    */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoNotesRoutingModule {
}
