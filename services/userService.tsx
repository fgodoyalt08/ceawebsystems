import axios, {AxiosRequestConfig} from "axios";
import qs from 'qs';
import { UNAUTHORIZED_MESSAGE } from "./../constants/login"
import { memberData } from "./../types/login"
import { IUserLoginData } from './../redux/interfaces/user';
const unionTrackingApiHost: string = process.env.NEXT_PUBLIC_UNIONTRACKING_API_HOST as string;

export const loginService = async (userData: IUserLoginData) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(userData),
            url: `${unionTrackingApiHost}login`,
        } as AxiosRequestConfig;
    
        const result = await axios(options);

        return result.data?.data;
        
    } catch (error: any) {
        const jsonError = error?.toJSON();
        throw jsonError.status === 401 ? new Error(UNAUTHORIZED_MESSAGE) : error
    }
}
