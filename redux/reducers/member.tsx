import { IMemberReducer } from '../interfaces/member';
import { 
  MEMBER_ADD_DATA,
  MEMBER_ADD_ERROR,
  MEMBER_ADD_REQUEST
 } from './../constants/member';

const initialState: IMemberReducer = {
  error: null,
  request: false,
  data: null
};

export const memberReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MEMBER_ADD_REQUEST:
      return {
        ...state,
        request: true,
        error: null,
        data: null
      };
    case MEMBER_ADD_ERROR:
      return {
        ...state,
        request: false,
        error: action.error,
        data: null
      };
    case MEMBER_ADD_DATA:
      return {
        ...state,
        request: false,
        data: action.data
      };

    default:
      return state;
  };
};