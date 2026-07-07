import { create } from "zustand";
import { getTasks, getTasksByDate } from "../services/task";

type TaskStore = {
  tasks: any[];
  selectedDate: string;
  showModal: boolean;

  setSelectedDate: (date: string) => void;
  setShowModal: (show: boolean) => void;

  fetchTasks: (date?: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedDate: "",
  showModal: false,

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  setShowModal: (show) => {
    set({ showModal: show });
  },

  fetchTasks: async (date?: string) => {
    try {
      const data = date
        ? await getTasksByDate(date)
        : await getTasks();

      set({ tasks: data });
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  },
}));