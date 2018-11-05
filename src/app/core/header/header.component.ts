import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { UserService } from '../user.service';
import { NetworkService } from '../network.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'td-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    isLoggedIn: ReplaySubject<boolean> = this.userService.isLoggedIn;

    offlineEnabled: BehaviorSubject<boolean> = this.networkService.offlineMode;

    userAvatar: string;

    userName: string;

    mainMenuItems = [
        {
            label: 'Active notes',
            link: '/notes'
        },
        {
            label: 'Archived notes',
            link: '/notes/archived'
        }
    ];

    constructor(private cdr: ChangeDetectorRef,
                private userService: UserService,
                private networkService: NetworkService,
                private router: Router) {}

    async ngOnInit(): Promise<void> {
        this.userService
            .user
            .subscribe(user => {
                this.userAvatar = user.photoURL;
                this.userName = user.displayName || user.email;

                this.cdr.markForCheck();
            });
    }

    async logout(): Promise<void> {
        await this.userService.logout();
        this.router.navigateByUrl('login');
    }
}
