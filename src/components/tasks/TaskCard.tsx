import { deleteTask } from "../../services/task";
import {
  useDraggable,
} from "@dnd-kit/core";

type TaskCardProps = {
  task: any;
  refresh: () => void;
};

export default function TaskCard({
  task,
  refresh,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
  ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
  : undefined;

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      refresh();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-lg shadow hover:shadow-md transition mb-3">
      {/* Title */}
      <h3 className="font-semibold text-gray-800">
        {task.title}
      </h3>

      {/* Priority */}
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded ${getPriorityColor(
          task.priority
        )}`}
      >
        {task.priority.toUpperCase()}
      </span>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {task.tags?.length ? (
          task.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">
            No tags
          </span>
        )}
      </div>

      {/* Due Date */}
      <p className="text-xs text-gray-500 mt-3">
        📅 Due: {task.due_date}
      </p>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-3 text-xs text-red-600 hover:text-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}