import { IUserReducer } from '../interfaces/user';
import { 
  USER_LOGIN_DATA,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST
 } from './../constants/user';

const initialState: IUserReducer = {
  error: null,
  request: false,
  data: null
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        request: true,
        error: null,
        data: null
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        request: false,
        error: action.error,
        data: null
      };
    case USER_LOGIN_DATA:
      return {
        ...state,
        request: false,
        data: action.data
      };

    default:
      return state;
  };
};