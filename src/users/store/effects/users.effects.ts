import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usersActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from '../../services';
<<<<<<< HEAD
import { SuspendUser } from '../actions';
=======
import { LoggerService } from '../../../shared/services/logger.service';
>>>>>>> 5c7f86a1f0b68ad3a23c6ab8a0e2496080c7e850



@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private loggerService: LoggerService
  ) { }

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(usersActions.LOAD_USERS),
    switchMap(() => {
      return this.usersService.getListOfUsers().pipe(
        map(userDetails => {
          const amendedUsers = [];
          userDetails.users.forEach(element => {
              const fullName = element.firstName + ' ' + element.lastName;
              const user = element;
              user.fullName = fullName;
              if (user.idamStatus !== 'PENDING') {
                user.routerLink = 'user/' + user.userIdentifier;
              }
              amendedUsers.push(user);
          });

          return new usersActions.LoadUsersSuccess({users: amendedUsers});
        }),
        catchError(error => {
          this.loggerService.error(error.message);
          return of(new usersActions.LoadUsersFail(error));
        })
      );
    })
  );


  @Effect()
  suspendUser$ = this.actions$.pipe(
    ofType(usersActions.SUSPEND_USER),
    switchMap((user: SuspendUser) => {
      return this.usersService.suspendUser(user).pipe(
        map(res => new usersActions.SuspendUserSuccess(user.payload)),
        catchError(error => of(new usersActions.SuspendUserFail(error)))
      );
    })
  );
}
