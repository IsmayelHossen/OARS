import Axios from "axios";
export const checkIfAuthenticated =()=>{
    const getLoginData = localStorage.getItem("LoginData");
     console.log('getLoginData', getLoginData);
    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success && data.access_token !== null) {
            //this user is  come from LoginRegController , localStorage set,response(login.js component)
            return data.user;
        }
        return false;
    }
    return false;
}
export const storeRegistration = async (data) => {

    return await Axios.post("http://localhost/OARS/api/register",data).then((res) => {
        return res.data;

    });
};

export const loginUser = async (data) => {
    // data.user_id = 1;
    return await Axios.post("http://localhost/OARS/api/login", data).then((res) => {
        return res.data;

    });
};
