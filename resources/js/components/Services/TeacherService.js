import Axios from "axios";
import { PUBLIC_URL } from "../CommonURL";
export const TeacherAllInfo = async (email) => {
    //  console.log(data);
    return await Axios.get(`${PUBLIC_URL}api/Teacher/${email}`).then((res) => {
        return res.data;
        // console.log(res.data);

    });
};
export const TeacherUpdateData=async(email,data)=>{
    return await Axios.put(`${PUBLIC_URL}api/Teacher/${email}`,data).then((res) => {
        return res.data;
});
}
// getColleagueInfo
export const getColleagueInfo=async()=>{
    return await Axios.get(`${PUBLIC_URL}api/getColleagueInfo1`).then((res) => {
        return res.data;
});
}
