import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(username, password);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      navigate("/tasks");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className={`min-h-screen overflow-y-auto relative flex items-center justify-center px-5 sm:px-6 lg:px-4 transition-colors duration-300 ${
      darkMode
      ? "bg-black text-white"
      : "bg-white text-black"
      }`}
    >

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12 rounded-full border transition-all duration-300 ${
          darkMode ? "border-white" : "border-black"
          }`}
      >
        <div className={`absolute top-1 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full transition-all duration-300 ${
          darkMode
            ? "right-1 bg-white"
            : "left-1 bg-black"
          }`}
        />
      </button>

      <div className="w-full max-w-sm sm:max-w-md text-center">

        {/* Logo */}
        <h1 className="flex items-end justify-center text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide">
          <span>4</span>
            <span
              className={`mx-1.5 relative -top-2 inline-block h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-full ${
                darkMode ? "bg-white" : "bg-black"
              }`}
            />
          <span>4</span>
        </h1>

        <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl font-bold">
          Welcome Back
        </h2>

        <p className={`mt-3 text-base sm:text-lg px-2 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Sign in to continue managing your tasks and annotations.
        </p>

        <form
          onSubmit={handleLogin}
          className={`mt-8 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-left transition-colors duration-300 ${
            darkMode
              ? "border border-white bg-black"
              : "border border-black bg-white"
          }`}
        >

          {/* Email */}

          <label className={`block mb-2 text-base sm:text-lg ${
                  darkMode ? "text-white" : "text-black"
                }`}
          >
            Email Address
          </label>

          <input
            type="text"
            placeholder="example@email.com"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg outline-none mb-8 transition-colors ${
              darkMode
                ? "bg-[#9EB2CF] text-white placeholder:text-gray-100"
                : "bg-slate-300 text-black placeholder:text-white"
            }`}
          />

          {/* Password */}

          <label className={`block mb-2 text-base sm:text-lg ${
                  darkMode ? "text-white" : "text-black"
                  }`}
          >
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg outline-none transition-colors ${
                darkMode
                  ? "bg-[#9EB2CF] text-white placeholder:text-gray-100"
                  : "bg-slate-300 text-black placeholder:text-white"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              ) : (
                <EyeOff className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              )}
            </button>

          </div>

          <button
            type="button"
            className={`mt-8 text-base sm:text-lg transition-colors ${
              darkMode
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
            }`}
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl py-3 sm:py-4 text-lg sm:text-xl font-medium text-white bg-gradient-to-r from-cyan-400 to-teal-400 hover:opacity-90 transition"
          >
            Login
          </button>

          <p className={`text-center mt-8 sm:mt-10 text-sm sm:text-base ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
          >
            © 2026 404 Project
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;