import Axios from "axios";

export const StudentAllInfo =async(email) => {
      //  console.log(data);
    return await Axios.get(`http://localhost/OARS/api/Student/${email}`).then((res) => {
       return res.data;
       // console.log('data',res.data);



    });
};
export const StudenUpdateData = async (email,data) => {
    //  console.log(data);
    return await Axios.put(`http://localhost/OARS/api/Student/${email}`,data).then((res) => {
        return res.data;
        // console.log(res.data);

    });
};
