import Axios from "axios";
import { PUBLIC_URL } from "../CommonURL";
export const AllPostRetrive =async() => {
      //  console.log(data);
    return await Axios.get(`${PUBLIC_URL}api/AllPostRetrive1`).then((res) => {
       return res.data;
       // console.log('data',res.data);



    });
};
