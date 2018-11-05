import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    OnInit, QueryList,
    ViewChildren
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material';

import { CheckItem } from '../../todo-note';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ChecklistSelectComponent),
            multi: true
        }
    ],
    selector: 'td-checklist-select',
    templateUrl: './checklist-select.component.html'
})
export class ChecklistSelectComponent implements OnInit, ControlValueAccessor {
    disabled: boolean;

    checkList: Array<CheckItem> = [];

    private onTouchedCallback: (event?: any) => void;

    private onChangeCallback: (items: Array<CheckItem>) => void;

    @ViewChildren(MatInput)
    private checkListItems: QueryList<MatInput>;

    constructor(private fb: FormBuilder,
                private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
    }

    writeValue(checkList: Array<CheckItem>): void {
        this.checkList = checkList;
        this.cdr.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }

    appendItem(): void {
        this.checkList.push({ title: 'Type your todo task here', done: false });
        this.detectChanges();
    }

    removeItem(taskPos: number): void {
        this.checkList.splice(taskPos, 1);
        this.detectChanges();
    }

    toggleDoneItem(taskPos: number): void {
        this.checkList[taskPos].done = !this.checkList[taskPos].done;
        this.detectChanges();
    }

    changeTaskItem(taskPos: number, textValue: string): void {
        this.checkList[taskPos].title = textValue;
        this.detectChanges();
    }

    keydownDispatcher(taskPos: number, event: KeyboardEvent): void {
        switch (event.code.toLowerCase()) {
            case 'enter':
                event.preventDefault();
                event.stopPropagation();
                this.appendItem();
                setTimeout(() => this.applyFocusOnLastCheckListItem(), 0);

            default:
                return this.changeTaskItem(taskPos, (event.target as HTMLInputElement).value);

        }
    }

    private applyFocusOnLastCheckListItem(): void {
        const item: MatInput = this.checkListItems.last;
        if (!item) { return; }

        item.focus();
    }

    private detectChanges(): void {
        this.cdr.markForCheck();
        this.onChangeCallback(this.checkList);
        this.onTouchedCallback();
    }
}