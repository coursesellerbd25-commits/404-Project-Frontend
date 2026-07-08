import api from "./api";

// GET all tasks
export const getTasks = async () => {
  const res = await api.get("tasks/");
  return res.data;
};

// GET tasks by date
export const getTasksByDate = async (date: string) => {
  const res = await api.get(`tasks/?date=${date}`);
  return res.data;
};

// CREATE task
export const createTask = async (task: any) => {
  const res = await api.post("tasks/", task);
  return res.data;
};

// UPDATE task
export const updateTask = async (id: number, task: any) => {
  const res = await api.put(`tasks/${id}/`, task);
  return res.data;
};

// DELETE task
export const deleteTask = async (id: number) => {
  const res = await api.delete(`tasks/${id}/`);
  return res.data;
};