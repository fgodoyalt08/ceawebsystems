import { SICK_REQUEST, SICK_DATA, SICK_ERROR } from './../constants/sick';
import { USER_LOGIN_DATA } from './../constants/user';
import { getSickDataService } from './../../services/sickService';
import { ISickDispatch } from './../interfaces/sick';
import { Dispatch } from 'redux';

export const getSickData = () => async (dispatch: Dispatch<ISickDispatch>) => {
  try {
    dispatch({ type: SICK_REQUEST });
    const options = await getSickDataService();
    return dispatch({ type: SICK_DATA, data: options });
  }
  catch (error: any) {
    dispatch({ type: SICK_ERROR, error });
    if(error?.toJSON().status === 400 && error?.toJSON().message.includes("Unauthenticated")) {
        localStorage.setItem("user", "{}");
        dispatch({ type: USER_LOGIN_DATA });
    }
  }
};
