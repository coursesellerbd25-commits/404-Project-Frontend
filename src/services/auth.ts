import axios from "axios";

const API = "http://127.0.0.1:8000/api/";

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${API}login/`, {
    username,
    password,
  });

  return res.data;
};