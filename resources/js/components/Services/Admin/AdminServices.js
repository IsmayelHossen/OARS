import Axios from 'axios';
export const GetTeacherInfo = async (email) => {

    return await Axios.get(`http://localhost/OARS/api/Infoteacher`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// SaveSemesterCourse
export const SaveSemesterCourse = async (data) => {

    return await Axios.post(`http://localhost/OARS/api/SaveSemesterCourse1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// GetSemesterCourseInfo
export const GetSemesterCourseInfo = async () => {

    return await Axios.get(`http://localhost/OARS/api/GetSemesterCourseInfo1`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
//deleteSpecificSemesterCourse

export const deleteSpecificSemesterCourse=async(email,ccode,session)=>{
    // console.log('student data',session);

     return await Axios.get(`http://localhost/OARS/api/deleteSpecificSemesterCourse1/${email}/${ccode}/${session}`).then((res)=>{

     return res.data;
         //console.log('student data',res.data);

     })
 }
