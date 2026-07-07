import { DndContext } from "@dnd-kit/core";
import Column from "./tasks/Column";
import { updateTask } from "../services/task";

export default function KanbanBoard({
  tasks,
  refresh,
}: {
  tasks: any[];
  refresh: () => void;
}) {
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    try {
      await updateTask(taskId, {
        status: newStatus,
      });

      refresh();
    } catch (err) {
      console.error("Drag update failed", err);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Column
          title="To Do"
          status="todo"
          tasks={tasks}
          refresh={refresh}
        />

        <Column
          title="In Progress"
          status="in_progress"
          tasks={tasks}
          refresh={refresh}
        />

        <Column
          title="Done"
          status="done"
          tasks={tasks}
          refresh={refresh}
        />
      </div>
    </DndContext>
  );
}