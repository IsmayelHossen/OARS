import Axios from 'axios';
export const AttendanceService = async (email) => {

    return await Axios.get(`http://localhost/OARS/api/semesterrule/${email}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
export const SemesterAllStudent=async(session)=>{
   // console.log('student data',session);

    return await Axios.get(`http://localhost/OARS/api/semesterStudent/${session}`).then((res)=>{

    return res.data;
        //console.log('student data',res.data);

    })
}

export const SaveAttendance=async(temail,session,Coursecode,data)=>{
    // console.log('student data',data);

      return await Axios.post(`http://localhost/OARS/api/saveattendence/${temail}/${session}/${Coursecode}`,data).then((res)=>{

    return res.data;

      console.log('attendance data',res.data);

     })
 }
export const getSemesterInfo=async(session,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/getsemesterinfo/${session}/${temail}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
