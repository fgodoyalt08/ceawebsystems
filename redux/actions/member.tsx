import { MEMBER_ADD_REQUEST, MEMBER_ADD_DATA, MEMBER_ADD_ERROR } from './../constants/member';
import { USER_LOGIN_DATA } from './../constants/user';
import { addMemberService } from './../../services/memberService';
import { IMemberDispatch, IMemberData } from './../interfaces/member';
import { Dispatch } from 'redux';

export const addMember = (memberData: IMemberData) => async (dispatch: Dispatch<IMemberDispatch>) => {
  try {
    dispatch({ type: MEMBER_ADD_REQUEST });
    const options = await addMemberService(memberData);
    return dispatch({ type: MEMBER_ADD_DATA, data: options });
  }
  catch (error: any) {
    dispatch({ type: MEMBER_ADD_ERROR, error });
    if(error?.message.includes("Unauthorized")) {
        localStorage.setItem("user", "{}");
        dispatch({ type: USER_LOGIN_DATA });
    }
  }
};
