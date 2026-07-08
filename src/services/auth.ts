import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${API}/api/login/`, {
    username,
    password,
  });

  return res.data;
};