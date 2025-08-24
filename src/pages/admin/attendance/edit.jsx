import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Cookies from "js-cookie";
import { swalMixin } from "../../../library/sweetalert";

export const EditAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    user_id: "",
    tanggal: "",
    jam_masuk: "",
    jam_keluar: "",
    status: "",
  });

  const [users, setUsers] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data.data);
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch attendance detail
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.get(
          `https://intern-manage-2025-production.up.railway.app/api/intern_attends/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setForm(res.data.data);
      } catch (err) {
        console.error("Attendance fetch failed:", err);
      }
    };
    fetchAttendance();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationError({});
    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        `https://intern-manage-2025-production.up.railway.app/api/intern_attends/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      swalMixin("success", res.data.message || "Attendance updated!");
      navigate("/attendance");
    } catch (err) {
      console.error("Update error:", err);
      if (err.response?.status === 422) {
        setValidationError(err.response.data.errors);
      } else {
        swalMixin("error", "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Attendance</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* User Dropdown */}
        <div>
          <label className="block font-medium">User</label>
          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">-- Select user --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          {validationError.user_id && (
            <p className="text-red-500 text-sm">{validationError.user_id}</p>
          )}
        </div>

        {/* Date */}
        <InputField
          label="Tanggal"
          name="tanggal"
          type="date"
          value={form.tanggal || ""}
          onChange={handleChange}
          error={validationError.tanggal}
        />

        {/* Check In */}
        <InputField
          label="Check In"
          name="jam_masuk"
          type="time"
          value={form.jam_masuk || ""}
          onChange={handleChange}
          error={validationError.jam_masuk}
        />

        {/* Check Out */}
        <InputField
          label="Check Out"
          name="jam_keluar"
          type="time"
          value={form.jam_keluar || ""}
          onChange={handleChange}
          error={validationError.jam_keluar}
        />

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <textarea
            name="status"
            value={form.status || ""}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded"
          />
          {validationError.status && (
            <p className="text-red-500 text-sm">{validationError.status}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Update"}
          </button>
          <Link
            to="/attendance"
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, error }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
