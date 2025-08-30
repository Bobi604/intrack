import { HeaderA } from "../layouts/header";
import { Sidebar } from "./../layouts/sidebar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const EditProfile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/user",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        setUser(res.data);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // UPDATE PROFILE (nama, email, foto)
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axios.post(
        `https://intern-manage-2025-production.up.railway.app/api/users/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profil berhasil diperbarui!");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Gagal update profil!");
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-4 pt-20 transition-all min-h-screen">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile Admin</h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* FOTO */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
                <img
                  src={
                    user.photo && user.photo !== "-"
                      ? `http://intern-manage-2025-production.up.railway.app/d-custs/img/avt/${user.photo}`
                      : "/default-avatar.png"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <input
                type="file"
                className="mt-3"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            {/* FORM */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block font-medium">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
