import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (
  email: string,
  password: string
) => {
  const res = await axios.post(`${API}/api/login/`, {
    email,
    password,
  });

  return res.data;
};