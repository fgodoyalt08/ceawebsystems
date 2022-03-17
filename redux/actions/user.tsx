import { Dispatch } from 'redux';
import { loginService } from './../../services/userService';
import { IUserDispatch, IUserLoginData } from '../interfaces/user';
import {
  USER_LOGIN_DATA,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST
} from './../constants/user';

export const login = (loginData: IUserLoginData) => async (dispatch: Dispatch<IUserDispatch>) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const result = await loginService(loginData);
    localStorage.setItem('user', JSON.stringify(result))
    return dispatch({ type: USER_LOGIN_DATA, data: result });
  }
  catch (error) {
    dispatch({ type: USER_LOGIN_ERROR, error });
  }
};
