import axios from "axios";
import { swalMixin } from "../../../library/sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export const AttendanceForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [validationError, setValidationError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      "https://intern-manage-2025-production.up.railway.app/api/intern_attends";

    const formData = new FormData();

    form.name && formData.append("name", form.name);
    form.tanggal && formData.append("tanggal", form.tanggal);
    form.jam_masuk && formData.append("jam_masuk", form.jam_masuk);
    form.jam_keluar && formData.append("jam_keluar", form.jam_keluar);
    form.status && formData.append("status", form.status);

    try {
      const res = await axios.post(url, formData);
      console.log(res.data);

      if (res.data) {
        swalMixin("success", `${res.data.message}`);
        navigate("/attendance");
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
      <h2 className="font-semibold text-lg mb-6">Add New Attendance</h2>

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

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="tanggal"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.tanggal && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.tanggal}
            </span>
          )}
        </div>

        {/* Check In */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check In
          </label>
          <input
            type="time"
            name="jam_masuk"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.jam_masuk && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.jam_masuk}
            </span>
          )}
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check Out
          </label>
          <input
            type="time"
            name="jam_keluar"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.jam_keluar && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.jam_keluar}
            </span>
          )}
        </div>

        {/* Keterangan */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keterangan
          </label>
          <input
            type="select"
            name="status"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            onKeyUp={(e) => {
              setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.status && (
            <span
              className="text-red-500 block mb-3
          "
            >
              {validationError.status}
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
            to="/attendance"
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            CANCLE
          </Link>
        </div>
      </form>
    </div>
  );
};
