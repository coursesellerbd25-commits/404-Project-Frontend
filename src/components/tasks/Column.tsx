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
    <div ref={setNodeRef} className="bg-gray-100 rounded-xl p-4 min-h-[500px]">
      {/* Column Title */}
      <h2 className="font-bold text-lg mb-4">{title}</h2>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-center text-gray-400">
          <p className="text-sm font-medium">No tasks here</p>
          <p className="text-xs mt-1">Add a task to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
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