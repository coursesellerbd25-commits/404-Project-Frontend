import { DndContext,  DragOverlay, } from "@dnd-kit/core";
import Column from "./tasks/Column";
import { updateTask } from "../services/task";
import { useState } from "react";
import TaskCard from "./tasks/TaskCard";
import {
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function KanbanBoard({
  tasks,
  refresh,
}: {
  tasks: any[];
  refresh: () => void;
}) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );
  const [activeTask, setActiveTask] = useState<any>(null);
  const handleDragStart = (event:any) => {
    const task = tasks.find(
      (task)=> task.id === event.active.id
    );

    setActiveTask(task);
  };
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    setActiveTask(null);
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
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 mt-6">
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
      <DragOverlay>
        {
          activeTask && (
            <TaskCard
              task={activeTask}
              refresh={refresh}
            />
          )
        }
      </DragOverlay>
    </DndContext>
  );
}