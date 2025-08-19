import { HeaderA } from "../layouts/header";
import { Sidebar } from "./../layouts/sidebar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const ProfilePage = () => {
  const [user, setUser] = useState({});

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
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-4 pt-20 transition-all min-h-screen">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Profile</h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* FOTO */}
            <div className="relative w-40 h-40">
              <img
                src={
                  user.photo
                    ? `http://intern-manage-2025-production.up.railway.app/d-custs/img/avt/${user.photo}`
                    : "/default-avatar.png"
                }
                alt={user.name}
                className="w-full h-full object-cover rounded-full border shadow"
              />
              <button
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                title="Edit Photo"
              >
                ✏️
              </button>
            </div>

            {/* INFO USER */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="font-semibold">Name</span> : {user.name}
              </div>
              <div>
                <span className="font-semibold">Email</span> : {user.email}
              </div>
              <div>
                <span className="font-semibold">Tanggal Bergabung</span> :{" "}
                {new Date(user.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>
                <span className="font-semibold">Role</span> : {user.role}
              </div>
            </div>

            {/* BADGE / LOGO */}
            <div className="hidden md:block">
              <img
                src="/in-track-badge.png"
                alt="In Track"
                className="w-40 rounded-lg shadow"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
