import axios from "axios";
import { swalMixin } from "../../../library/sweetalert";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";

export const UsersForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [validationError, setValidationError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://192.168.0.238:8000/api/users";

    const formData = new FormData();

    form.name && formData.append("name", form.name);
    form.email && formData.append("email", form.email);
    form.password && formData.append("password", form.password);
    form.password_confirmation &&
      formData.append("password_confirmation", form.password_confirmation);
    form.role && formData.append("role", form.role);

    try {
      const res = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      console.log(res.data);

      if (res.data) {
        swalMixin("success", `${res.data.message}`);
        navigate("/users");
      }
    } catch (error) {
      console.error(error);

      if (error.status === 422) {
        setValidationError(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="font-semibold text-lg mb-6">Add New Users</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.name && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.name}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.email && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.email}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.password && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.password}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Confirmation
          </label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.password && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.password}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="intern">Intern</option>
            <option value="staff">Staff</option>
          </select>
          {validationError.role && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.role}
            </span>
          )}
        </div>
        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-6 py-2 rounded-lg hover:bg-[#1e2240] transition"
          >
            ADD NEW
          </button>
          <Link
            to="/users"
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            CANCLE
          </Link>
        </div>
      </form>
    </div>
  );
};
