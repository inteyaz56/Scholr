import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setTeacherData } from "../redux/teacherSlice";

const getAllTeacher = async () => {
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      const fetchTeacher = async () => {
        try {
          let teacher = await axios.get(`${serverUrl}/api/users/get-teacher`, {
            withCredentials: true,
          });
          dispatch(setTeacherData(teacher.data));
        } catch (error) {
          console.log(error);
        }
      };

      fetchTeacher();
    }, []);
  } catch (error) {
    console.log(error);
  }
};

export default getAllTeacher;
