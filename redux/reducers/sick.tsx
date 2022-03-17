import { IState } from '../interfaces/sick';
import { SICK_REQUEST, SICK_DATA, SICK_ERROR } from './../constants/sick';

const initialState: IState = {
  request: false,
  error: null,
  data: null
};

export const sickReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SICK_REQUEST:
      return {
        ...state,
        request: true,
        error: null,
        data: null
      };
    case SICK_DATA:
      return {
        ...state,
        request: false,
        error: null,
        data: action.data
      };
    case SICK_ERROR:
      return {
        ...state,
        request: false,
        error: action.error,
        data: null
      };
    default:
      return state;
  };
};