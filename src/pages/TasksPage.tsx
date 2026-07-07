import { useEffect } from "react";

import Navbar from "../components/Navbar";
import DateSelector from "../components/DateSelector";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";

import { useTaskStore } from "../store/useTaskStore";

export default function TasksPage() {
  const [showModal, setShowModal] = useTaskStore((state: any) => [
    state.showModal,
    state.setShowModal,
  ]);

  const {
    tasks,
    selectedDate,
    setSelectedDate,
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
    <div className="p-4">
      <Navbar />

      {/* Date selector and Add Task button */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <DateSelector onChange={setSelectedDate} />

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="mt-6">
        <KanbanBoard tasks={tasks} refresh={() => selectedDate ? fetchTasks(selectedDate) : fetchTasks()} />
      </div>

      {/* Add Task Modal */}
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