import Axios from 'axios';
export const PasswordForgetEmail = async (data) => {
  //  console.log('password data',data);
    return await Axios.post(`http://localhost/OARS/api/PasswordForgetEmail1`,data).then((res) => {
       return res.data;
      console.log('attendance data',res.data.data);

    });
};
//ResetPasswordSave

export const ResetPasswordSave = async (data) => {
    //  console.log('password data',data);
      return await Axios.post(`http://localhost/OARS/api/ResetPasswordSave1`,data).then((res) => {
         return res.data;
        console.log('attendance data',res.data.data);

      });
  };
  //Rese
