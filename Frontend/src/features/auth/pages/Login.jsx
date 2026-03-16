import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-[#31b8c6]">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-center text-zinc-400">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#31b8c6] py-3 font-semibold text-zinc-950 transition hover:bg-[#2ca8b5]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#31b8c6] transition hover:text-[#67d5df]"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
