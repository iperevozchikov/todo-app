import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../../core/user.service';
import { observableToPromise } from '../../shared/helpers/observable-to-promise';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private returnUrl: string = '';

    constructor(private userService: UserService,
                private snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {}

    async login(): Promise<void> {
        const params = await observableToPromise(this.route.queryParams);

        if (params['return']) {
            this.returnUrl = decodeURIComponent(params['return']);
        }

        try {
            await this.userService.login(new auth.GoogleAuthProvider());
            this.router.navigateByUrl(this.returnUrl);
        } catch (err) {
            this.snackBar.open('Error: ' + err.message);
        }
    }
}