import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DateSelector from "../components/DateSelector";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";
import Footer from "../components/Footer";

import { useTaskStore } from "../store/useTaskStore";

export default function TasksPage() {
  const [darkMode, setDarkMode] = useState(false);
  const {
    tasks,
    selectedDate,
    setSelectedDate,
    showModal,
    setShowModal,
    fetchTasks,
  } = useTaskStore();

  // Load all tasks when page first opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Reload tasks when selected date changes
  useEffect(() => {
    if (selectedDate) {
      fetchTasks(selectedDate);
    } else {
      fetchTasks();
    }
  }, [selectedDate]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
        }`}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Tasks
          </h1>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-500">
            Manage your daily work efficiently.
          </p>
          </div>
          <DateSelector onChange={setSelectedDate} />
        </div>
        <div className="mt-8 sm:mt-12">
          <KanbanBoard tasks={tasks} refresh={() => selectedDate ? fetchTasks(selectedDate) : fetchTasks()} />
        </div>

        <Footer darkMode={darkMode} />
        
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-yellow-300 text-3xl sm:text-4xl shadow-xl hover:scale-110 transition">
            +
          </button>

          {showModal && (
            <TaskModal
              onClose={() => setShowModal(false)}
              refresh={() =>
              selectedDate ? fetchTasks(selectedDate) : fetchTasks()
              }
            />
          )}
        </div>
      </div>
  );
}