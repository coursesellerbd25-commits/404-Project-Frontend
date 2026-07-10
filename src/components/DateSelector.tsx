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
    <div className="w-72 rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium">
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
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Calendar */}
      {open && (
        <div className="border-t p-3 text-black">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            className="text-black"
          />
        </div>
      )}
    </div>
  );
}