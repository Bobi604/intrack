import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import Logo from "../../src/assets/img/logo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const res = await axios.post(
        "https://192.168.0.238:8000/api/login",
        form
      );

      const token = res.data.token.plainTextToken;
      const role = res.data.token.accessToken.abilities; // Ambil "admin", "staff", "magang"
      const user = res.data?.user;

      // Simpan ke cookies
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", role || "");
      Cookies.set("username", user?.name || "");
      Cookies.set("userId", user?.id || "");

      // Arahkan berdasarkan role
      if (role === "admin") navigate("/dashboardadmin");
      else if (role === "staff") navigate("/dashboardstaff");
      else if (role === "attendance") navigate("/dashboardmagang");
      else navigate("/dashboardadmin");
    } catch (err) {
      console.error(err);
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-700 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and password to sign in
          </p>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-400 text-white font-semibold py-2 rounded-md hover:bg-teal-500 transition"
            >
              SIGN IN
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <span className="text-teal-400 font-semibold cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-teal-300 rounded-l-3xl relative">
        <div className="text-center text-white">
          <img src={Logo} alt="Logo" className="w-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">In Track</h1>
        </div>
      </div>
    </div>
  );
};
