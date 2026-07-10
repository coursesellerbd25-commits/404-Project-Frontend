import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
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
            a
          </div>

          <span className="font-medium text-gray-700">
            User
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`
            relative
            w-20
            h-10
            rounded-full
            border-2
            transition-all
            duration-300
          ${
            darkMode
              ? "border-white bg-black"
              : "border-black bg-white"
          }`}
        >
          <div className={`absolute top-1 w-7 h-7 rounded-full transition-all duration-300${
            darkMode
              ? "right-1 bg-white"
              : "left-1 bg-black"
          }`} />
        </button>

      </div>
    </nav>
  );
}