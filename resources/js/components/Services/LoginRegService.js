import Axios from "axios";
import { PUBLIC_URL } from "../CommonURL";
export const checkIfAuthenticated =()=>{
    const getLoginData = localStorage.getItem("LoginData");
    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success && data.access_token !== null) {
            //this user is  come from LoginRegController response
            return data.user;
        }
        return false;
    }
    return false;
}
export const storeRegistration = async (data) => {

    return await Axios.post(`${PUBLIC_URL}api/register`,data).then((res) => {
        return res.data;

    });
};

export const loginUser = async (data) => {
    // data.user_id = 1;
    return await Axios.post(`${PUBLIC_URL}api/login`, data).then((res) => {
        return res.data;

    });
};
