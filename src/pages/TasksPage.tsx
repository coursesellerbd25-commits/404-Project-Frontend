import { useEffect } from "react";

import Navbar from "../components/Navbar";
import DateSelector from "../components/DateSelector";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";

import { useTaskStore } from "../store/useTaskStore";

export default function TasksPage() {
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
    <div className="max-w-7xl mx-auto px-8 py-8">
      <Navbar />

      <div className="mt-12 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-bold">
            Tasks
          </h1>
          <p className="mt-5 text-gray-500">
            Manage your daily work efficiently.
          </p>
          </div>
          <DateSelector onChange={setSelectedDate} />
        </div>
        <div className="mt-12">
          <KanbanBoard tasks={tasks} refresh={() => selectedDate ? fetchTasks(selectedDate) : fetchTasks()} />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-10 right-10 h-16 w-16 rounded-full bg-yellow-300 text-4xl shadow-xl hover:scale-110 transition">
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
  );
}