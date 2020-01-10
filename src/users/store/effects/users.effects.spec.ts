import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromUsersEffects from './users.effects';
import { UsersEffects } from './users.effects';
import { LoadUsersSuccess, LoadUsersFail, LoadUsers } from '../actions/user.actions';
import { UsersService } from '../../services/users.service';
import { LoggerService } from '../../../shared/services/logger.service';

describe('Users Effects', () => {
    let actions$;
    let effects: UsersEffects;
    const UsersServiceMock = jasmine.createSpyObj('UsersService', [
        'getListOfUsers',
    ]);
    let loggerService: LoggerService;

    const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['trace', 'info', 'debug', 'log', 'warn', 'error', 'fatal']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: UsersService,
                    useValue: UsersServiceMock,
                },
                {
                    provide: LoggerService,
                    useValue: mockedLoggerService
                },
                fromUsersEffects.UsersEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(UsersEffects);
        loggerService = TestBed.get(LoggerService);

    });

    describe('loadUsers$', () => {
        it('should return a collection from loadUsers$ - LoadUsersSuccess', () => {
            const payload = {users: [{ payload: 'something' }]};
            UsersServiceMock.getListOfUsers.and.returnValue(of(payload));
            const action = new LoadUsers();
            const completion = new LoadUsersSuccess({
                users: [
                    { payload: 'something', fullName: 'undefined undefined', routerLink: 'user/undefined' }
                ]
            });
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.loadUsers$).toBeObservable(expected);
        });
    });

    describe('loadUsers$ error', () => {
        it('should return LoadUsersFail', () => {
            UsersServiceMock.getListOfUsers.and.returnValue(throwError(new Error()));
            const action = new LoadUsers();
            const completion = new LoadUsersFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.loadUsers$).toBeObservable(expected);
            expect(loggerService.error).toHaveBeenCalled();
        });
    });

});
