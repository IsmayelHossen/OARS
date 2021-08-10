import Axios from 'axios';
import { PUBLIC_URL } from "../CommonURL";
export const AttendanceService = async (email) => {

    return await Axios.get(`${PUBLIC_URL}api/semesterrule/${email}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
export const SemesterAllStudent=async(session)=>{
   // console.log('student data',session);

    return await Axios.get(`${PUBLIC_URL}api/semesterStudent/${session}`).then((res)=>{

    return res.data;
        //console.log('student data',res.data);

    })
}

export const SaveAttendance=async(temail,session,Coursecode,Usemester,data)=>{
    // console.log('student data',data);

      return await Axios.post(`${PUBLIC_URL}api/saveattendence/${temail}/${session}/${Coursecode}/${Usemester}`,data).then((res)=>{

    return res.data;

      console.log('attendance data',res.data);

     })
 }
 //save ct mark

 export const SaveCtMark=async(temail,session,Coursecode,ct,data)=>{
    // console.log('student data',data);

      return await Axios.post(`${PUBLIC_URL}api/SaveCtMark1/${temail}/${session}/${Coursecode}/${ct}`,data).then((res)=>{

    return res.data;

      console.log('attendance data',res.data);

     })
 }
 //get ct mark SemesterCtMark

 export const SemesterCtMark=async(session,ccode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/SemesterCtMark1/${session}/${ccode}/${temail}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
//IndividualCtMark
export const IndividualCtMark=async(session,ccode,temail,ctnum)=>{
    return await Axios.get(`${PUBLIC_URL}api/IndividualCtMark1/${session}/${ccode}/${temail}/${ctnum}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
export const getSemesterInfo=async(session,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/getsemesterinfo/${session}/${temail}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
export const gettotalClasses=async(ccode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/gettotalclass/${ccode}/${temail}`).then((res)=>{
     // console.log('semesterinfo66',res.data);
     // console.log('semesterinfo1',res.data);
   return res.data;
    });
}
//delete specific attendance

export const deleteSpecificAttendance=async(ccode,successCode,temail)=>{
    return await Axios.delete(`${PUBLIC_URL}api/deleteSpecificAttendance/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}

//view specific attendance

export const getAttendanceView=async(ccode,successCode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/ViewSpecificAttendance/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//get data for update attendance

export const GetAttendanceForUpdate=async(ccode,successCode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/GetAttendanceForUpdate/${ccode}/${successCode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//update attendance data

export const UpdateAttendance=async(ccode,scode,temail,data)=>{
    return await Axios.put(`${PUBLIC_URL}api/AttendanceUpdate/${ccode}/${scode}/${temail}`,data).then((res)=>{

   return res.data;
    });
}
//course code update
export const CourseCodeUpdate=async(scode,temail,ccode)=>{
    return await Axios.get(`${PUBLIC_URL}api/CourseCodeUpdate/${scode}/${temail}/${ccode}`).then((res)=>{

   return res.data;
    });
}

//get all information

export const AllinformationGet1=async(temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/AllinformationGet/${temail}`).then((res)=>{

   return res.data;
    });
}
// getAttendaceResult
export const getAttendaceResult1=async(temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/getAttendaceResult/${temail}`).then((res)=>{

   return res.data;
    });
}
// IndividualAttendResult
export const IndividualAttendResult1=async(it,ccode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/IndividualAttendResult/${it}/${ccode}/${temail}`).then((res)=>{

   return res.data;
    });
}
//search by course code
export const SearchByCode=async(SByCode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/SearchByCourseCode/${SByCode}/${temail}`).then((res)=>{

   return res.data;
    });
}

export const SaveAddMark=async(data)=>{
    // console.log('student data',data);

      return await Axios.post(`${PUBLIC_URL}api/SaveAddMark1`,data).then((res)=>{

    return res.data;

      console.log('attendance data',res.data);

     })
 }
//  GetStudentCTMarkByCode
export const GetStudentCTMarkByCode=async(session,ccode,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/GetStudentCTMarkByCode1/${session}/${ccode}/${temail}`).then((res)=>{

   return res.data;
    });
}
// GetCTMarks
export const GetCTMarks=async(session,ccode,bestct,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/GetCTMarks1/${session}/${ccode}/${bestct}/${temail}`).then((res)=>{

   return res.data;
    });
}
// GetCountCTMark
export const GetCountCTMark=async(session,ccode,ctcount,temail)=>{
    return await Axios.get(`${PUBLIC_URL}api/GetCountCTMark1/${session}/${ccode}/${ctcount}/${temail}`).then((res)=>{

   return res.data;
    });
}
// DeleteCTMark

export const DeleteCTMark=async(id)=>{
    return await Axios.delete(`${PUBLIC_URL}api/DeleteCTMark1/${id}`).then((res)=>{

   return res.data;
    });
}
