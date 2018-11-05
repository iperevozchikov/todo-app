import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

import { CheckItem, TodoNote } from '../todo-note';
import { TodoNoteService } from '../todo-note.service';
import { UserService } from '../../core/user.service';
import { observableToPromise } from '../../shared/helpers/observable-to-promise';
import { ConflictDialogComponent } from './conflict-dialog/conflict-dialog.component';

export enum StrategyType {
    overwrite = 'overwrite',
    discard = 'discard',
    custom = 'custom',
    merge = 'merge'
}

interface ResolveStrategy {
    strategy: StrategyType;
    strategyByFields: {
        title: StrategyType;
        checkList: StrategyType;
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todo-note-form.component.html'
})
export class TodoNoteFormComponent implements OnInit {
    form: FormGroup;

    isOwner: boolean = true;

    private uid: string;

    private noteId: string;

    private note: TodoNote;

    private hasDocumentChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private lastNote: BehaviorSubject<TodoNote> = new BehaviorSubject(undefined);

    private dialogConfiguration: MatDialogConfig = {
        width: '650px'
    };

    constructor(private todoService: TodoNoteService,
                private userService: UserService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private clipboardService: ClipboardService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.form = this.fb.group({
            title: this.fb.control('Here your awesome title'),
            checkList: this.fb.control([]),
            hasPublicAccess: this.fb.control(false),
        });
    }

    async ngOnInit(): Promise<void> {
        await this.initUserId();

        await this.initNoteId();

        this.note = await this.todoService.getTodoNoteById(this.noteId);

        this.isOwner = this.note.userId === this.uid;

        this.initFormWithValues(this.note);

        this.initChangeDocumentStream();
    }

    getPublicAccessUrl(): string {
        return `${window.location.protocol}//${window.location.host}/notes/note/${this.noteId}`;
    }

    copyAccessUrl(): void {
        this.clipboardService.copyFromContent(this.getPublicAccessUrl());
        this.snackBar.open('URL has been copied to clipboard');
    }

    async save(): Promise<void> {
        if (!this.note.hasPublicAccess || (this.note.hasPublicAccess && !this.hasDocumentChanged.value)) {
            return this.updateDocumentByOverwrite();
        }

        const resolveStrategy: ResolveStrategy = await this.openDialogAndAwaitResult();

        if (!resolveStrategy) { return; }

        switch (resolveStrategy.strategy) {
            case StrategyType.overwrite:
                return this.updateDocumentByOverwrite();

            case StrategyType.discard:
                return this.updateDocumentByDiscard();

            case StrategyType.custom:
                return this.updateDocumentByCustom(resolveStrategy.strategyByFields);

            default:
                this.snackBar.open('Wrong type of strategy');
        }
    }

    private async initUserId(): Promise<void> {
        const { uid } = await observableToPromise(this.userService.user);

        this.uid = uid;
    }

    private async initNoteId(): Promise<void> {
        let { id } = await observableToPromise(this.route.params);

        if (id === 'create') {
            const note = await this.initTodoNote();
            id = await this.todoService.addTodoNote(note);
        }

        this.noteId = id;
    }

    private initChangeDocumentStream(): void {
        this.todoService
            .getTodoNoteChanges(this.noteId)
            .pipe(filter(note => note.updatedAt['seconds'] > this.note.updatedAt['seconds']))
            .subscribe(note => {
                this.hasDocumentChanged.next(true);
                this.lastNote.next(note)
            });
    }

    private initFormWithValues(values: Partial<TodoNote>): void {
        const { title, checkList, hasPublicAccess } = values;

        this.form.patchValue({ title, checkList, hasPublicAccess });
    }

    private async updateDocument(note: Partial<TodoNote>): Promise<void> {
        try {
            await this.todoService.updateTodoNote(this.noteId, note);

            this.snackBar.open('Todo note has been saved');

            this.router.navigateByUrl('');
        } catch (err) {
            this.snackBar.open('Error: ' + err);
        }
    }

    private async updateDocumentByOverwrite(): Promise<void> {
       await this.updateDocument(this.form.value);
    }

    private async updateDocumentByDiscard(): Promise<void> {
        this.snackBar.open('Todo note changes were been discarded');

        this.router.navigateByUrl('');
    }

    private async updateDocumentByCustom(strategyByFields: object): Promise<void> {
        const values: Partial<TodoNote> = {};

        for (const fieldName in strategyByFields) {
            const strategy: StrategyType = strategyByFields[fieldName];

            switch (strategy) {
                case StrategyType.overwrite:
                    values[fieldName] = this.form.value[fieldName];
                    break;

                case StrategyType.discard:
                    break;

                case StrategyType.merge:
                    if (fieldName === 'checkList') {
                        const myCheckList: Array<CheckItem> = this.form.value['checkList'];
                        const theirCheckList: Array<CheckItem> = this.lastNote.value.checkList;

                        for (const myCheckItem of myCheckList) {
                            if (theirCheckList.findIndex(({ title }) => title === myCheckItem.title) > -1) {
                                continue;
                            }

                            theirCheckList.push(myCheckItem);
                        }

                        values[fieldName] = theirCheckList;
                    }

                    break;
            }
        }

        await this.updateDocument(values);
    }

    private openDialogAndAwaitResult(): Promise<ResolveStrategy> {
        const dialogRef = this.dialog.open(ConflictDialogComponent, this.dialogConfiguration);

        return observableToPromise(dialogRef.afterClosed());
    }

    private async initTodoNote(): Promise<TodoNote> {
        const { title, checkList, hasPublicAccess } = this.form.value;

        const note = new TodoNote();

        note.userId = this.uid;
        note.title = title;
        note.checkList = checkList;
        note.hasPublicAccess = hasPublicAccess;

        return note;
    }
}
