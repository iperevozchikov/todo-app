import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { User, firestore } from 'firebase';
const Timestamp = firestore.Timestamp;

import { UserService } from '../core/user.service';
import { TodoNote, TodoNoteState } from './todo-note';
import { observableToPromise } from '../shared/helpers/observable-to-promise';

@Injectable()
export class TodoNoteService {
    private readonly collectionName: string = 'todo-notes';
    private readonly collection: AngularFirestoreCollection<TodoNote> = this.db.collection(this.collectionName);

    constructor(private userService: UserService,
                private db: AngularFirestore) {}

    async addTodoNote(note: TodoNote): Promise<string> {
        if (!note.id) {
            note.id = this.db.createId();
        }

        await this.collection.doc(note.id).set(note);

        return note.id;
    }

    updateTodoNote(noteId: string, note: Partial<TodoNote>): Promise<void> {
        if (!note['updatedAt']) {
            note['updatedAt'] = Timestamp.fromDate(new Date());
        }

        return this.collection.doc(noteId).update(note);
    }

    deleteTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote(noteId, {
            state: TodoNoteState.deleted,
            deletedAt: Timestamp.fromDate(new Date())
        });
    }

    archiveTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote(noteId, {
            state: TodoNoteState.archived
        });
    }

    activateTodoNote(noteId: string): Promise<void> {
        return this.updateTodoNote(noteId, {
            state: TodoNoteState.active
        });
    }

    getTodoNotesByState(state: TodoNoteState = TodoNoteState.active): Observable<Array<TodoNote>> {
        return this.userService
            .user
            .pipe(
                switchMap((user: User) => this.db.collection<TodoNote>(
                    this.collection.ref,
                    ref => ref
                        .where('userId', '==', user.uid)
                        .where('state', '==', state)
                        .orderBy('updatedAt', 'desc')
                ).valueChanges()),
            );
    }

    getTodoNoteChanges(noteId: string): Observable<TodoNote | undefined> {
        return this.collection
            .doc(noteId)
            .valueChanges()
            .pipe(filter(Boolean));
    }

    getTodoNoteById(noteId: string): Promise<TodoNote> {
        const observable = this.collection
            .doc(noteId)
            .get()
            .pipe(
                map(snapshot => snapshot.data() as TodoNote)
            );

        return observableToPromise(observable);
    }

    async hasUserAccessToTodoNote(uid: string, noteId: string): Promise<boolean> {
        const { userId, hasPublicAccess } = await this.getTodoNoteById(noteId);

        return uid === userId
            ? true
            : hasPublicAccess;
    }

    async hasTodoNoteExists(noteId: string): Promise<boolean> {
        return !!await this.getTodoNoteById(noteId);
    }
}