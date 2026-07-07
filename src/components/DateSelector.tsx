import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  onChange: (date: string) => void;
};

export default function DateSelector({ onChange }: Props) {
  const [selected, setSelected] = useState<Date | undefined>();

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);

    if (date) {
      const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD
      onChange(formatted);
    }
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow">
      <p className="text-sm font-medium mb-2">Select Date</p>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
      />
    </div>
  );
}