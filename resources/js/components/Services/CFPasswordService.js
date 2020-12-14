import Axios from 'axios';
import { PUBLIC_URL } from "../CommonURL";
export const PasswordForgetEmail = async (data) => {
  //  console.log('password data',data);
    return await Axios.post(`${PUBLIC_URL}api/PasswordForgetEmail1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
//ResetPasswordSave

export const ResetPasswordSave = async (data) => {
    //  console.log('password data',data);
      return await Axios.post(`${PUBLIC_URL}api/ResetPasswordSave1`,data).then((res) => {
         return res.data;
        console.log('attendance data',res.data.data);

      });
  };
  //Rese
