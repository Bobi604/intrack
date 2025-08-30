import { Sidebar } from "../../../layouts/sidebar";
import { HeaderA } from "../../../layouts/header";
import { Footer } from "../../../components/footer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { swalMixin } from "../../../library/sweetalert";

export const EditProgress = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    task: "",
    description: "",
    deadline: "",
    status: "pending",
    user_id: "", // 🔥 wajib ada user_id
  });

  // Ambil data progress by ID
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `https://intern-manage-2025-production.up.railway.app/api/job_interns/${id}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );
        const data = res.data.data;
        setFormData({
          task: data.task,
          description: data.description,
          deadline: data.deadline,
          status: data.status,
          user_id: data.user_id || Cookies.get("user_id"), // 🔥 kalau null, ambil dari login
        });
      } catch (error) {
        console.error("Gagal fetch progress:", error);
      }
    };
    fetchProgress();
  }, [id]);

  // Handle input perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update progress
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://intern-manage-2025-production.up.railway.app/api/job_interns/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      swalMixin("success", "Progress updated successfully!");
      navigate("/progress"); 
    } catch (error) {
      console.error("Gagal update progress:", error.response?.data || error);
      swalMixin("error", "Failed to update progress.");
    }
  };

  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-6 shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Edit Progress</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task */}
            <div>
              <label className="block font-medium mb-1">Task</label>
              <input
                type="text"
                name="task"
                value={formData.task}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                rows="4"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            {/* Status */}
                        <div>
              <label className="block font-medium mb-1">Deadline</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>


            {/* Hidden User ID */}
            <input type="hidden" name="user_id" value={formData.user_id} />

            {/* Button */}
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate("/progress")}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
