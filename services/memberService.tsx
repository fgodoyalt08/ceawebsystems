import axios, {AxiosRequestConfig} from "axios";
import { UNAUTHORIZED_MESSAGE } from "./../constants/login"
import { IMemberData } from "./../redux/interfaces/member"
const unionTrackingApiHost: string = process.env.NEXT_PUBLIC_UNIONTRACKING_API_HOST as string;


export const addMemberService = async (memberData: IMemberData) => {
    try {
        const userData = JSON.parse(localStorage.getItem('user')|| "{}");
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${userData.token}`
            },
            data: memberData,
            url: `${unionTrackingApiHost}member`,
        } as AxiosRequestConfig;
    
        const result = await axios(options);
        return result.data;
        
    } catch (error: any) {
        const jsonError = error?.toJSON();
        throw jsonError.status === 401 ? new Error(UNAUTHORIZED_MESSAGE) : new Error(error.response?.data?.message)
    }
}
