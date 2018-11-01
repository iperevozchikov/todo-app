import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../../core/user.service';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private userService: UserService,
                private snackBar: MatSnackBar,
                private router: Router) {}

    async ngOnInit(): Promise<void> {
        this.userService.isLoggedIn.subscribe(val => console.log(val));
    }

    async login(): Promise<void> {
        try {
            await this.userService.login(new auth.GoogleAuthProvider());
        } catch (err) {
            this.snackBar.open('Error');
        }
    }
}