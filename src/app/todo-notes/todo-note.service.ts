import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, firestore } from 'firebase';
const Timestamp = firestore.Timestamp;

import { UserService } from '../core/user.service';
import { TodoNote, TodoNoteState } from './todo-note';
import { observableToPromise } from '../shared/helpers/observable-to-promise';

@Injectable()
export class TodoNoteService {
    private readonly collectionName: string = 'todo-notes';

    constructor(private userService: UserService,
                private db: AngularFirestore) {
    }

    async initializeMockCollection(size: number = 10): Promise<void> {
        console.log('start initializing collection');
        const randNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

        const { uid } = await observableToPromise(this.userService.user);
        console.log('user uid=' + uid);

        const notes = [];

        for (let i = 0; i < size; i++) {
            const note: TodoNote = new TodoNote();

            note.id = this.db.createId();
            note.title = `Simple title ${i}`;
            note.checkList = Array(randNumber(1, 20))
                .fill(0)
                .map((value, index) => ({ title: `TODO item ${index}`, done: !!randNumber(0, 2) }));

            note.userId = uid;

            notes.push(note);
        }

        while(notes.length > 0) {
            const group = notes.splice(0, 10);

            await Promise.all(group.map(note => this.addTodoNote(note)));
        }

        console.log('collection has been initialized');
    }

    addTodoNote(note: TodoNote): Promise<void> {
        return this.db.collection(this.collectionName).doc(note.id).set(note);
    }

    async updateTodoNote(note: Partial<TodoNote>): Promise<void> {
        if (!('updatedAt' in note)) {
            note['updatedAt'] = Timestamp.fromDate(new Date());
        }
        await this.db.doc(`${this.collectionName}/${note.id}`).update(note);
    }

    deleteTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote({
            id: noteId,
            state: TodoNoteState.deleted,
            deletedAt: Timestamp.fromDate(new Date())
        });
    }

    archiveTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote({
            id: noteId,
            state: TodoNoteState.archived
        });
    }

    activateTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote({
            id: noteId,
            state: TodoNoteState.active
        });
    }

    getTodoNotesByState(state: TodoNoteState = TodoNoteState.active): Observable<Array<TodoNote>> {
        return this.userService
            .user
            .pipe(
                switchMap((user: User) => this.db.collection<TodoNote>(
                    this.collectionName,
                    ref => ref
                        .where('userId', '==', user.uid)
                        .where('state', '==', state)
                        .orderBy('updatedAt')
                ).valueChanges()),
            );
    }
}