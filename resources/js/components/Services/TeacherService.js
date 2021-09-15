import Axios from "axios";
import { PUBLIC_URL } from "../CommonURL";
export const TeacherAllInfo = async (email) => {
    //  console.log(data);
    return await Axios.get(`${PUBLIC_URL}api/Teacher/${email}`).then((res) => {
        return res.data;
        // console.log(res.data);

    });
};
//get moreinfo
export const GetMoreinf1 = async (email) => {
    //  console.log(data);
    return await Axios.get(`${PUBLIC_URL}api/GetMoreinf2/${email}`).then((res) => {
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
export const getColleagueInfo=async(email)=>{
    return await Axios.get(`${PUBLIC_URL}api/getColleagueInfo1/${email}`).then((res) => {
        return res.data;
});
}
// SaveMoreInfo
export const SaveMoreInfo=async(data)=>{
    return await Axios.post(`${PUBLIC_URL}api/SaveMoreInfo1`,data).then((res) => {
        return res.data;
});
}
//get routine for teacher
// GetRoutineResult
export const GetRoutineResult= async(email) => {
    // console.log('info',infodata);
     return await Axios.get(`${PUBLIC_URL}api/GetRoutineResult2/${email}`).then((res) => {
        return res.data;


     });
 }
