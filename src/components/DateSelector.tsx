import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  onChange: (date: string) => void;
};

export default function DateSelector({ onChange }: Props) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(true);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);

    if (date) {
      const formatted = date.toISOString().split("T")[0];
      onChange(formatted);
    }
  };

  return (
    <div className="w-72 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium text-black">
          📅{" "}
          {selected
            ? selected.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Select Date"}
        </span>

        <span
          className={`text-black transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Calendar */}
      {open && (
        <div className="border-t border-gray-200 p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}