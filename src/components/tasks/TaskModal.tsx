import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask, updateTask, } from "../../services/task";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.string(),
  status: z.string(),
  selected_date: z.string(),
  due_date: z.string(),
  tags: z.string(),
});

export default function TaskModal({ onClose, refresh, editingTask, }: any) {
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: editingTask
    ? {
        ...editingTask,
        tags: editingTask.tags.join(", "),
      }
    : {},
  });

  const onSubmit = async (data: any) => {
    try {
      setSaving(true);

      const payload = {
        ...data,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter(Boolean)
          : [],
      };

      if (editingTask) {
        await updateTask(editingTask.id, payload);
      } else {
        await createTask(payload);
      }

      refresh();
      onClose();
    } catch (err: any) {
      console.error(err.response?.data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 sm:p-6 rounded-lg w-full max-w-md space-y-3"
      >
        <h2 className="text-lg font-bold">{editingTask ? "Edit Task" : "Add Task"}</h2>

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
        <select
          {...register("priority")}
            className="w-full rounded border p-2"
            defaultValue=""
        >
        <option value="" disabled>
          Select Priority
        </option>

        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

        {/* Status */}
        <select
          {...register("status")}
            className="w-full rounded border p-2"
            defaultValue=""
        >
        <option value="" disabled>
          Select Status
        </option>

        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

        {/* Dates */}
        <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Pick a selected date
        </label>
        <input
          {...register("selected_date")}
          type="date"
          className="w-full border p-2 rounded"
        />
        </div>

        <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Pick a due date
        </label>
        <input
          {...register("due_date")}
          type="date"
          className="w-full border p-2 rounded"
        />
        </div>

        {/* Tags */}
        <input
          {...register("tags")}
            placeholder="Tags (e.g. frontend, bug, urgent)"
            className="w-full rounded border p-2"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded text-white transition ${
            saving
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {saving
              ? editingTask
              ? "Saving..."
              : "Creating..."
              : editingTask
              ? "Save"
              : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}