import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "../../services/task";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.string(),
  status: z.string(),
  selected_date: z.string(),
  due_date: z.string(),
});

export default function TaskModal({ onClose, refresh }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("FORM SUBMITTED", data);
      await createTask(data);
      refresh();   // reload tasks
      onClose();   // close modal
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded-lg w-96 space-y-3"
      >
        <h2 className="text-lg font-bold">Add Task</h2>

        {/* Title */}
        <div>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">
              Title required
            </p>
          )}
        </div>

        {/* Priority */}
        <input
          {...register("priority")}
          placeholder="Priority (low / medium / high)"
          className="w-full border p-2 rounded"
        />

        {/* Status */}
        <input
          {...register("status")}
          placeholder="Status (todo / in_progress / done)"
          className="w-full border p-2 rounded"
        />

        {/* Dates */}
        <input
          {...register("selected_date")}
          type="date"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("due_date")}
          type="date"
          className="w-full border p-2 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}