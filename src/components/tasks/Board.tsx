import Column from "./Column";

type BoardProps = {
  tasks: any[];
  refresh: () => void;
};

export default function Board({
  tasks,
  refresh,
}: BoardProps) {
  return (
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
  );
}