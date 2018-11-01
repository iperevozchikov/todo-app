import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ReplaySubject } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    isLoggedIn: ReplaySubject<boolean> = this.userService.isLoggedIn;
    userAvatar: string;
    userName: string;

    constructor(private userService: UserService,
                private cdr: ChangeDetectorRef) {}

    async ngOnInit(): Promise<void> {
        this.userService
            .user
            .subscribe(user => {
                this.userAvatar = user.photoURL;
                this.userName = user.displayName || user.email;

                this.cdr.markForCheck();
            });
    }

    logout(): void {
        this.userService.logout();
    }
}
