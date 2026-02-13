import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = async () => {
  const dispacth = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/users/get-user`, {
          withCredentials: true,
        });
        dispacth(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;
