import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { auth } from 'firebase/auth';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UserService {
    isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1);
    user: ReplaySubject<User> = new ReplaySubject(1);

    constructor(private fireAuth: AngularFireAuth) {
        this.fireAuth
            .user
            .subscribe((user: User | null) => {
                this.isLoggedIn.next(!!user);

                if (user) {
                    this.user.next(user);
                }
            });
    }

    async login(provider: firebase.auth.AuthProvider): Promise<void> {
        await this.fireAuth.auth.signInWithPopup(provider);
    }

    async logout(): Promise<void> {
        return this.fireAuth.auth.signOut();
    }
}