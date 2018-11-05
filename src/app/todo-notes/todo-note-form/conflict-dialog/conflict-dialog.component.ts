import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

interface SelectOption {
    label: string;
    value: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-conflict-dialog-component',
    templateUrl: './conflict-dialog.component.html',
})
export class ConflictDialogComponent {
    strategy: string = 'overwrite';

    strategyByFields: object = {
        title: 'overwrite',
        checkList: 'overwrite',
    };

    strategyOptions: Array<SelectOption> = [
        {
            label: 'Overwrite by your values',
            value: 'overwrite'
        },
        {
            label: 'Discard your changes',
            value: 'discard'
        },
        {
            label: 'Custom',
            value: 'custom'
        },
    ];

    titleStrategyOptions: Array<SelectOption> = [
        {
            label: 'Apply your value',
            value: 'overwrite'
        },
        {
            label: 'Apply their value',
            value: 'discard'
        },
    ];

    checkListStrategyOptions: Array<SelectOption> = [
        ...this.titleStrategyOptions,
        {
            label: 'Merge',
            value: 'merge'
        }
    ];

    constructor(private dialogRef: MatDialogRef<ConflictDialogComponent>) {}

    get resolveStrategy(): object {
        return { strategy: this.strategy, strategyByFields: this.strategyByFields };
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
