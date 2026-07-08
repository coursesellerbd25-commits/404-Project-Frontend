import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold text-gray-800">
        404
      </h1>

      <div className="flex gap-3">
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/annotations"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Annotations
        </NavLink>
      </div>
    </nav>
  );
}