import Axios from 'axios';
import { PUBLIC_URL } from "../../CommonURL";
export const GetTeacherInfo = async (email) => {

    return await Axios.get(`${PUBLIC_URL}api/Infoteacher`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// SaveSemesterCourse
export const SaveSemesterCourse = async (data) => {

    return await Axios.post(`${PUBLIC_URL}api/SaveSemesterCourse1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// GetSemesterCourseInfo
export const GetSemesterCourseInfo = async () => {

    return await Axios.get(`${PUBLIC_URL}api/GetSemesterCourseInfo1`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
//deleteSpecificSemesterCourse

export const deleteSpecificSemesterCourse=async(email,ccode,session)=>{
    // console.log('student data',session);

     return await Axios.get(`${PUBLIC_URL}api/deleteSpecificSemesterCourse1/${email}/${ccode}/${session}`).then((res)=>{

     return res.data;
         //console.log('student data',res.data);

     })
 }
//  GetSemcCourseUpdateData

export const GetSemcCourseUpdateData=async(email,ccode,session)=>{
    // console.log('student data',session);

     return await Axios.get(`${PUBLIC_URL}api/GetSemcCourseUpdateData1/${email}/${ccode}/${session}`).then((res)=>{

     return res.data;
         //console.log('student data',res.data);

     })
 }
 //UpdateSemesterCourse

export const UpdateSemesterCourse=async(data)=>{
    // console.log('student data',session);

     return await Axios.post(`${PUBLIC_URL}api/UpdateSemesterCourse1`,data).then((res)=>{

     return res.data;
         //console.log('student data',res.data);

     })
 }
//  NoticeSave
export const NoticeSave=async(data)=>{
    // console.log('student data',session);

     return await Axios.post(`${PUBLIC_URL}api/NoticeSave1`,data).then((res)=>{

     return res.data;
         //console.log('student data',res.data);

     });
    }
    export const getNoticeData= async () => {

        return await Axios.get(`${PUBLIC_URL}api/getNoticeData1`).then((res) => {
           return res.data;
          console.log('attendance data',res.data.data);

        });
    };
    // GetSessionActiveData
    export const GetSessionActiveData= async () => {

        return await Axios.get(`${PUBLIC_URL}api/GetSessionActiveData1`).then((res) => {
           return res.data;
          console.log('attendance data',res.data.data);

        });
    };
    // GetSessionStudent
    export const GetSessionStudent= async (session) => {

        return await Axios.get(`${PUBLIC_URL}api/GetSessionStudent1/${session}`).then((res) => {
           return res.data;
          console.log('attendance data',res.data.data);

        });
    };
    // SaveSemesterCourseTitle
    export const SaveSemesterCourseTitle=async(data)=>{
        // console.log('student data',session);

         return await Axios.post(`${PUBLIC_URL}api/SaveSemesterCourseTitle1`,data).then((res)=>{

         return res.data;
             //console.log('student data',res.data);

         });
        }
        // GetSemesterCourseTitleInfo
        export const GetSemesterCourseTitleInfo= async (session) => {

            return await Axios.get(`${PUBLIC_URL}api/GetSemesterCourseTitleInfo1`).then((res) => {
               return res.data;
              console.log('attendance data',res.data.data);

            });
        };
        //deleteSpecificSemesterCoursetitle

        export const deleteSpecificSemesterCoursetitle= async (ccode,ctitle) => {

            return await Axios.delete(`${PUBLIC_URL}api/deleteSpecificSemesterCoursetitle1/${ccode}/${ctitle}`).then((res) => {
               return res.data;
              console.log('attendance data',res.data.data);

            });
        };
//getSemesterCode
export const getSemesterCode= async(semester) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterCode1/${semester}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterCodeTitle
export const getSemesterCodeTitle= async(ccode) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterCodeTitle1/${ccode}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// GetActiveSessioninfo
export const GetActiveSessioninfo= async() => {

    return await Axios.get(`${PUBLIC_URL}api/GetActiveSessioninfo1`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSessionStudent
export const getSessionStudent= async(session) => {

    return await Axios.get(`${PUBLIC_URL}api/getSessionStudent/${session}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterInfo
export const getSemesterInfoR= async(session) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterInfoR1/${session}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterCodeMR
export const getSemesterCodeMR= async(session,semester,theorylab) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterCodeMR1/${session}/${semester}/${theorylab}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterCTitleMR
export const getSemesterCTitleMR= async(session,courseCode) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterCTitleMR1/${session}/${courseCode}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterAttendanceMark
export const getSemesterAttendanceMark= async(session,courseCode,it) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterAttendanceMark1/${session}/${courseCode}/${it}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getSemesterCTMark
export const getSemesterCTMark= async(session,courseCode,it) => {

    return await Axios.get(`${PUBLIC_URL}api/getSemesterCTMark1/${session}/${courseCode}/${it}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// SaveSemesterResult
export const SaveSemesterResult= async(data) => {

    return await Axios.post(`${PUBLIC_URL}api/SaveSemesterResult1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// FinalResultByIt
export const FinalResultByIt= async(it) => {

    return await Axios.get(`${PUBLIC_URL}api/FinalResultByIt1/${it}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// deleteSpecificSemesterCCResult
export const deleteSpecificSemesterCCResult= async(it,courseCode,session) => {

    return await Axios.get(`${PUBLIC_URL}api/deleteSpecificSemesterCCResult1/${it}/${courseCode}/${session}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
//AllSession
export const AllSession= async() => {

    return await Axios.get(`${PUBLIC_URL}api/AllSession`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// SearchSemesterWiseResult
export const SearchSemesterWiseResult= async(session,semester) => {

    return await Axios.get(`${PUBLIC_URL}api/SearchSemesterWiseResult1/${session}/${semester}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// GPAMark
export const GPAMark= async(it,semester) => {

    return await Axios.get(`${PUBLIC_URL}api/GPAMark1/${it}/${semester}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};

// GradeSheetResult
export const GradeSheetResult= async(it,semester) => {

    return await Axios.get(`${PUBLIC_URL}api/GradeSheetResult1/${it}/${semester}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getlpgrade
export const getlpgrade= async() => {

    return await Axios.get(`${PUBLIC_URL}api/getlpgrade1`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// getmemberRequest
export const getmemberRequest= async() => {

    return await Axios.get(`${PUBLIC_URL}api/getmemberRequest1`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
export const getmemberRequest2= async() => {

    return await Axios.get(`${PUBLIC_URL}api/getmemberRequest2`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// RequestInfoData
export const RequestInfoData= async(infodata) => {
   // console.log('info',infodata);
    return await Axios.get(`${PUBLIC_URL}api/RequestInfoData1/${infodata}`).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// AcceptRequestDone
export const AcceptRequestDone= async(who,email) => {
    // console.log('info',infodata);
     return await Axios.get(`${PUBLIC_URL}api/AcceptRequestDone1/${who}/${email}`).then((res) => {
        return res.data;
       console.log('attendance data',res.data.data);

     });
 };
//  GetAllMsg
export const GetAllMsg= async(friendid,myid) => {
    // console.log('info',infodata);
     return await Axios.get(`${PUBLIC_URL}api/GetAllMsg1/${friendid}/${myid}`).then((res) => {
        return res.data;
       console.log('attendance data',res.data.data);

     });
 };
//  saveMsg
 export const saveMsg= async(data) => {

    return await Axios.post(`${PUBLIC_URL}api/saveMsg1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
// AllFriendData
export const AllFriendData= async(myid) => {
    // console.log('info',infodata);
     return await Axios.get(`${PUBLIC_URL}api/AllFriendData1/${myid}`).then((res) => {
        return res.data;
       console.log('attendance data',res.data.data);

     });
 };
