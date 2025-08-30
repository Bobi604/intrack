import { Link, useNavigate } from "react-router";
import Logo from "../../src/assets/img/logo.png";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { swalMixin } from "../library/sweetalert";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (form.password !== form.password_confirmation) {
      setErrors({
        password_confirmation: ["Password confirmation does not match."],
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://intern-manage-2025-production.up.railway.app/api/register",
        form
      );

      const { token, user } = res.data;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      swalMixin("success", "Register successful!");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        swalMixin("error", "Register failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-teal-400 text-white py-9 px-4 text-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-bold text-xl flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-6" /> InTrack
          </div>
          <div className="space-x-4 text-sm">
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
            <Link to="/login" className="hover:underline">
              Sign In
            </Link>
          </div>
        </div>
        <div className="mt-7">
          <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg -mt-20">
          <h2 className="text-lg font-medium text-center mb-4">Register</h2>

          <div className="text-center text-gray-400 mb-4">or</div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                required

              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm your password"
                value={form.password_confirmation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                required
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Role</option>
                <option value="intern">Intern</option>
                
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.role}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-400 text-white py-2 rounded-lg font-semibold hover:bg-teal-500 transition disabled:opacity-60"
            >
              {loading ? "Processing..." : "SIGN UP"}
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
