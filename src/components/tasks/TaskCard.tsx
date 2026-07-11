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
      className="w-[260px] sm:w-72 min-h-[250px] flex flex-col justify-between flex-shrink-0 rounded-2xl bg-cyan-400 text-white p-4 sm:p-5 shadow-md hover:-translate-y-1 transition">

      {/* Priority */}
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          task.priority === "high"
            ? "bg-red-500"
            : task.priority === "medium"
            ? "bg-yellow-500"
            : "bg-green-500"
          }
        `}
      >
        {task.priority?.toUpperCase()}
      </span>

      {/* Title */}
      <h3 className="mt-4 text-lg sm:text-xl font-bold">
        {task.title}
      </h3>

      {/* Content */}
      <div className="mt-5 flex-1">
      
      {/* Date */}
      <div className="space-y-2 text-xs sm:text-sm opacity-90">
        <p>
          📅 Selected: {task.selected_date}
        </p>

        <p>
          ⏰ Due: {task.due_date}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {task.tags?.length ? (
          task.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-white/20 px-3 py-1 text-xs"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-white/70">
            No tags
          </span>
        )}
      </div>
    </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-6 self-start text-xs sm:text-sm font-medium text-red-200 hover:text-white transition"
      >
        Delete
      </button>
    </div>
  );
}