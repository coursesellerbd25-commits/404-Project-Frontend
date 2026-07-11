import { NavLink } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({
  darkMode,
  setDarkMode,
}: NavbarProps) {
  return (
    <nav className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between rounded-3xl bg-yellow-300 px-5 sm:px-8 py-5 shadow-sm">

      {/* Left - 404 Logo */}
      <div>
        <h1 className="flex items-end text-4xl font-light tracking-wide">
          <span className={darkMode ? "text-white" : "text-black"}>
            4
          </span>

          <span
            className={`mx-1 relative -top-1.5 inline-block h-7 w-7 rounded-full ${
              darkMode ? "bg-white" : "bg-black"
            }`}
          />

          <span className={darkMode ? "text-white" : "text-black"}>
            4
          </span>
        </h1>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center gap-6 sm:gap-10">

        <NavLink to="/tasks">
          {({ isActive }) => (
            <div
              className={`relative pb-1 text-lg transition ${
                isActive
                  ? `font-semibold ${darkMode ? "text-cyan-400" : "text-black"}`
                  : `${
                    darkMode
                      ? "text-gray-300 hover:text-cyan-400"
                      : "text-gray-700 hover:text-black"
                    }`
              }`}
            >
              Tasks

                {isActive && (
                  <span className={`absolute left-0 -bottom-0.5 h-[5px] w-full rounded-full ${
                                      darkMode ? "bg-cyan-400" : "bg-black"
                                  }`} 
                  />
                )}
            </div>
          )}
        </NavLink>

        <NavLink to="/annotations">
          {({ isActive }) => (
            <div
              className={`relative pb-1 text-lg transition ${
                isActive
                  ? `font-semibold ${darkMode ? "text-cyan-400" : "text-black"}`
                  : `${
                    darkMode
                      ? "text-gray-300 hover:text-cyan-400"
                      : "text-gray-700 hover:text-black"
                    }`
              }`}
            >
              Annotate

                {isActive && (
                  <span className={`absolute left-0 -bottom-0.5 h-[5px] w-full rounded-full ${
                                      darkMode ? "bg-cyan-400" : "bg-black"
                                  }`} 
                  />
                )}
            </div>
          )}
        </NavLink>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 flex-wrap justify-center">

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
            w-16 h-8
            sm:w-20
            sm:h-10
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
          <div className={`absolute top-1 w-5 h-5 sm:w-7 sm:h-7 rounded-full transition-all duration-300 ${
            darkMode
              ? "right-1 bg-white"
              : "left-1 bg-black"
          }`} />
        </button>

      </div>
    </nav>
  );
}