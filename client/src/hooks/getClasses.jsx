import { serverUrl } from "../main";
import axios from "axios";
import { setClass } from "../redux/classSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const getAllClasses = async () => {
  let dispatch = useDispatch();


  useEffect(() => {
    const fetchClass = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/class/get-class`, {
          withCredentials: true,
        });
        dispatch(setClass(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchClass();
  }, []);
};

export default getAllClasses;
