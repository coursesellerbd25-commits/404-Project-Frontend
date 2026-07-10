import { NavLink } from "react-router-dom";
import { Moon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-3xl bg-yellow-300 px-8 py-5 shadow-sm">

      {/* Left - 404 Logo */}
      <div>
        <h1 className="flex items-end text-4xl font-light tracking-wide">
          <span>4</span>

          <span
            className="
              mx-1
              relative
              -top-1.5
              inline-block
              h-7
              w-7
              rounded-full
              bg-black
            "
          />

          <span>4</span>
        </h1>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center gap-10">

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `text-lg transition ${
              isActive
                ? "font-semibold text-black"
                : "text-gray-700 hover:text-black"
            }`
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/annotations"
          className={({ isActive }) =>
            `text-lg transition ${
              isActive
                ? "font-semibold text-black"
                : "text-gray-700 hover:text-black"
            }`
          }
        >
          Annotate
        </NavLink>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* User */}
        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-4
            py-2
            shadow-sm
            hover:shadow
            transition
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-white">
            A
          </div>

          <span className="font-medium text-gray-700">
            User
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-white
            shadow-sm
            hover:shadow
            transition
          "
        >
          <Moon size={18} />
        </button>

      </div>
    </nav>
  );
}