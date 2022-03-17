import axios, {AxiosRequestConfig} from "axios";
const unionTrackingApiHost: string = process.env.NEXT_PUBLIC_UNIONTRACKING_API_HOST as string;
import { sickOpt } from "../redux/interfaces/sick";

export const getSickDataService = async (): Promise<sickOpt[]> => {
    try {
        const userData = JSON.parse(localStorage.getItem('user')|| "{}");
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${userData.token}`
            },
            url: `${unionTrackingApiHost}sickplan/get/all`,
        } as AxiosRequestConfig;
    
        const result = await axios(options);
        
        return result.data?.code === 200 ? result.data?.data : [];
        
    } catch (error: any) {
        throw error
    }
}
