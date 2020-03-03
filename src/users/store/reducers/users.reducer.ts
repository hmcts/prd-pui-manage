import { User } from '@hmcts/rpx-xui-common-lib';
import { AppConstants } from 'src/app/app.constants';
import {AppUtils} from 'src/app/utils/app-utils';
import * as fromUsers from '../actions/user.actions';

export interface UsersListState {
  userList: User[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: UsersListState = {
  userList: [],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromUsers.UserActions
): UsersListState {
  switch (action.type) {

    case fromUsers.LOAD_USERS: {
      const userList = [];
      return {
        ...state,
        userList,
        loading: true
      };
    }

    case fromUsers.LOAD_USERS_SUCCESS: {
      const payload = action.payload ? action.payload.users : null;

      const userListPayload = payload.map((item) => {
        return {
          ...item,
          selected: false
        };
      }
      );

      const userList = userListPayload.map((user) => {

        user.status = AppUtils.capitalizeString(user.idamStatus);

        AppConstants.USER_ROLES.forEach((userRoles) => {
          if (user.roles) {
            user[userRoles.roleType] = user.roles.includes(userRoles.role) ? 'Yes' : 'No';
          }
        });

        user.status = AppUtils.capitalizeString(user.idamStatus);

        return user;
      });

      return {
        ...state,
        userList,
        loaded: true,
        loading: false
      };
    }

    case fromUsers.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromUsers.SUSPEND_USER: {
      return {
        ...state,
        loading: true,
        loaded: true
      };
    }

    case fromUsers.SUSPEND_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromUsers.SUSPEND_USER_SUCCESS: {
      const user = action.payload ? action.payload : null;
      const amendedUserList = [];
      state.userList.slice(0).forEach(element => {
        const elementInstance = {...element};
        if (elementInstance['userIdentifier'] ===  user.userIdentifier) {
          elementInstance['idamStatus'] = 'SUSPENDED';
          elementInstance['status'] = 'Suspended';
        }
        amendedUserList.push(elementInstance);
      });

      return {
        ...state,
        userList: [
          ...amendedUserList
        ],
        loading: false,
        loaded: true
      };
    }

    default:
      return {
        ...state
      };

  }
}

export const getUsers = (state: UsersListState) => state.userList;
export const getUsersLoading = (state: UsersListState) => state.loading;
export const getUsersLoaded = (state: UsersListState) => state.loaded;

