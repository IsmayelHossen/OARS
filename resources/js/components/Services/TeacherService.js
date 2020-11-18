import Axios from "axios";

export const TeacherAllInfo = async (email) => {
    //  console.log(data);
    return await Axios.get(`http://localhost/OARS/api/Teacher/${email}`).then((res) => {
        return res.data;
        // console.log(res.data);

    });
};
export const TeacherUpdateData=async(email,data)=>{
    return await Axios.put(`http://localhost/OARS/api/Teacher/${email}`,data).then((res) => {
        return res.data;
});
}
