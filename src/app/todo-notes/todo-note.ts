const Timestamp = require('firebase').firestore.Timestamp;

export enum TodoNoteState {
    active = 'active',
    deleted = 'deleted',
    archived = 'archived'
}

export interface CheckItem {
    title: string;
    done: boolean;
}

export class TodoNote extends Object {
    id: string | null = null;
    userId: string | null = null;
    title: string = '';
    checkList: Array<CheckItem> = [];
    hasPublicAccess: boolean = true;
    state: TodoNoteState = TodoNoteState.active;
    createdAt: any = Timestamp.fromDate(new Date());
    updatedAt: any = Timestamp.fromDate(new Date());
    deletedAt: any | null = null;
}