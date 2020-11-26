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

// AttendanceResultInfo

export const AttendanceResultInfo=async(email) => {
    //  console.log(data);
  return await Axios.get(`http://localhost/OARS/api/AttendanceResultInfo1/${email}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
//StudentSemResultInfo
export const StudentSemResultInfo=async(it,semester) => {
    //  console.log(data);
  return await Axios.get(`http://localhost/OARS/api/StudentSemResultInfo1/${it}/${semester}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
//IndividualAttendResult course waize
export const SemesterWithCourseCodeRes=async(it,courseCode) => {
    //  console.log(data);
  return await Axios.get(`http://localhost/OARS/api/IndividualAttendResult1/${it}/${courseCode}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};

//TeacherInformation
export const TeacherInformation=async(temail) => {
    //  console.log(data);
  return await Axios.get(`http://localhost/OARS/api/TeacherInformation1/${temail}`).then((res) => {
     return res.data;
     // console.log('data',res.data);



  });
};
