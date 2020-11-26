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

export const SaveAttendance=async(temail,session,Coursecode,Usemester,data)=>{
    // console.log('student data',data);

      return await Axios.post(`http://localhost/OARS/api/saveattendence/${temail}/${session}/${Coursecode}/${Usemester}`,data).then((res)=>{

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
export const gettotalClasses=async(ccode,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/gettotalclass/${ccode}/${temail}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
//delete specific attendance

export const deleteSpecificAttendance=async(ccode,successCode,temail)=>{
    return await Axios.delete(`http://localhost/OARS/api/deleteSpecificAttendance/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}

//view specific attendance

export const getAttendanceView=async(ccode,successCode,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/ViewSpecificAttendance/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//get data for update attendance

export const GetAttendanceForUpdate=async(ccode,successCode,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/GetAttendanceForUpdate/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//update attendance data

export const UpdateAttendance=async(ccode,scode,temail,data)=>{
    return await Axios.put(`http://localhost/OARS/api/AttendanceUpdate/${ccode}/${scode}/${temail}`,data).then((res)=>{

   return res.data;
    });
}
//course code update
export const CourseCodeUpdate=async(scode,temail,ccode)=>{
    return await Axios.get(`http://localhost/OARS/api/CourseCodeUpdate/${scode}/${temail}/${ccode}`).then((res)=>{

   return res.data;
    });
}

//get all information

export const AllinformationGet1=async(temail)=>{
    return await Axios.get(`http://localhost/OARS/api/AllinformationGet/${temail}`).then((res)=>{

   return res.data;
    });
}
// getAttendaceResult
export const getAttendaceResult1=async(temail)=>{
    return await Axios.get(`http://localhost/OARS/api/getAttendaceResult/${temail}`).then((res)=>{

   return res.data;
    });
}
// IndividualAttendResult
export const IndividualAttendResult1=async(it,ccode,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/IndividualAttendResult/${it}/${ccode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//search by course code
export const SearchByCode=async(SByCode,temail)=>{
    return await Axios.get(`http://localhost/OARS/api/SearchByCourseCode/${SByCode}/${temail}`).then((res)=>{

   return res.data;
    });
}
