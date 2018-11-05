import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from './user.service';
import { TodoNoteService } from '../todo-notes/todo-note.service';
import { observableToPromise } from '../shared/helpers/observable-to-promise';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {
    constructor(private router: Router,
                private userService: UserService,
                private todoService: TodoNoteService) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const isLoggedIn = await observableToPromise(this.userService.isLoggedIn);
        const activatedUrl = `/${route.url.join('/')}`;

        if (activatedUrl.includes('/notes') && !isLoggedIn) {
            this.router.navigateByUrl(`login?return=${activatedUrl}`);

            return false;
        }

        if (activatedUrl.includes('/note/') && route.params['id'] !== 'create' && isLoggedIn) {
            const { uid } = await observableToPromise(this.userService.user);

            if (!await this.todoService.hasTodoNoteExists(route.params['id'])) {
                this.router.navigateByUrl('error/page-not-found');

                return false;
            }

            if (!await this.todoService.hasUserAccessToTodoNote(uid, route.params['id'])) {
                this.router.navigateByUrl('error/restricted-access');
                return false;
            }
        }

        if (activatedUrl.includes('login') && isLoggedIn) {
            this.router.navigateByUrl('');

            return false;
        }

        return true;
    }

    async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return false;
    }
}
