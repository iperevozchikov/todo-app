import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class NetworkService {
    offlineMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private firestoreQueue: any;

    private localCacheStrategyTimerId: string = 'write_stream_connection_backoff';

    private timerSub: Subscription;

    private pollingInterval: number = 150;

    constructor(private db: AngularFirestore) {
        this.firestoreQueue = this.db.firestore['_queue'];
    }

    observeNetworkState(): void {
        if (this.timerSub) { return; }

        this.timerSub = timer(this.pollingInterval, this.pollingInterval)
            .pipe(
                map(() => {
                    const delayedOperations = this.firestoreQueue['delayedOperations'];

                    if (!Array.isArray(delayedOperations)) {
                        return this.offlineMode.value;
                    }

                    return delayedOperations
                        .filter(({ timerId }) => timerId === this.localCacheStrategyTimerId)
                        .length > 0;
                }),
                filter(offlineEnabled => this.offlineMode.value !== offlineEnabled)
            )
            .subscribe(this.offlineMode);
    }

    stopObservingNetworkState(): void {
        if (!this.timerSub || this.timerSub.closed) { return; }

        this.timerSub.unsubscribe();
    }
}