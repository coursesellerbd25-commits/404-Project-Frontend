import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  title: string;
  status: string;
  tasks: any[];
  refresh: () => void;
};

export default function Column({
  title,
  status,
  tasks,
  refresh,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  const filtered = tasks.filter((task) => task.status === status);

  return (
    <div ref={setNodeRef} className="w-full">
      {/* Column Title */}
      <h2 className="text-2xl font-bold mb-6">{title} ({filtered.length})</h2>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-400">
          <p className="text-sm font-medium">No tasks here</p>
          <p className="text-xs mt-1">Add a task to get started</p>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              refresh={refresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}