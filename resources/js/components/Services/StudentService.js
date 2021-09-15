import Axios from "axios";
import { PUBLIC_URL } from "../CommonURL";
export const StudentAllInfo =async(email) => {
      //  console.log(data);
    return await Axios.get(`${PUBLIC_URL}api/Student/${email}`).then((res) => {
       return res.data;
       // console.log('data',res.data);



    });
};
//get teacher data
export const GetteacherData =async() => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/GetteacherData1`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};

export const StudenUpdateData = async (email,data) => {
    //  console.log(data);
    return await Axios.put(`${PUBLIC_URL}api/Student/${email}`,data).then((res) => {
        return res.data;
        // console.log(res.data);

    });
};
// ct mark result GetCTMarks(this.props.it,this.props.courseCode,temail);
export const GetCTMarks=async(it,courseCode,temail) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/GetCTMarks2/${it}/${courseCode}/${temail}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
// AttendanceResultInfo

export const AttendanceResultInfo=async(email) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/AttendanceResultInfo1/${email}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
//StudentSemResultInfo
export const StudentSemResultInfo=async(it,semester) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/StudentSemResultInfo1/${it}/${semester}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
//IndividualAttendResult course waize
export const SemesterWithCourseCodeRes=async(it,courseCode) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/IndividualAttendResult1/${it}/${courseCode}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};

//TeacherInformation
export const TeacherInformation=async(temail) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/TeacherInformation1/${temail}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
// classmateGet
export const classmateGet=async(session,email) => {
    //  console.log(data);
  return await Axios.get(`${PUBLIC_URL}api/classmateGet1/${session}/${email}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
