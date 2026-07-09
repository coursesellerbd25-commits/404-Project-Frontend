import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-white relative flex items-center justify-center px-4">

      {/* Theme Toggle */}
      <button
        className="absolute top-8 right-8 w-24 h-12 border border-black rounded-full flex items-center px-2"
      >
        <div className="w-8 h-8 rounded-full bg-black"></div>
      </button>

      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <h1 className="text-6xl font-light tracking-widest">
          4<span className="inline-block w-10 h-10 rounded-full bg-black mx-1 align-middle"></span>4
        </h1>

        <h2 className="mt-8 text-4xl font-bold">
          Welcome Back
        </h2>

        <p className="mt-3 text-gray-600 text-lg">
          Sign in to continue managing your tasks and annotations.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10 border border-black rounded-3xl p-10 text-left"
        >

          {/* Email */}

          <label className="block mb-2 text-lg">
            Email Address
          </label>

          <input
            type="text"
            placeholder="example@email.com"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl bg-slate-300 px-5 py-4 text-lg outline-none mb-8"
          />

          {/* Password */}

          <label className="block mb-2 text-lg">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-300 px-5 py-4 text-lg outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <Eye size={22} />
              ) : (
                <EyeOff size={22} />
              )}
            </button>

          </div>

          <button
            type="button"
            className="mt-8 text-lg hover:underline"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl py-4 text-white text-xl font-medium bg-gradient-to-r from-cyan-400 to-teal-400 hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="text-center mt-10 text-gray-600">
            © 2026 404 Project
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;