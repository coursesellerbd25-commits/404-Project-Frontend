import { NavLink } from "react-router-dom";
import { Moon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl bg-yellow-300 px-8 py-4 shadow-md">

      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl font-bold">
          404
        </div>

        <span className="text-xl font-bold">
          TaskFlow
        </span>
      </div>

      {/* Center - Navigation */}
      <div className="flex items-center gap-8">

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black border-b-2 border-black pb-1"
              : "text-gray-700 hover:text-black transition"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/annotations"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black border-b-2 border-black pb-1"
              : "text-gray-700 hover:text-black transition"
          }
        >
          Annotate
        </NavLink>

      </div>

      {/* Right - User */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white font-semibold">
          a
        </div>

        {/* Theme Button */}
        <button className="rounded-full bg-white p-2 shadow hover:bg-gray-100 transition">
          <Moon size={18} />
        </button>

      </div>

    </nav>
  );
}