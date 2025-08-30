import { HeaderA } from "../layouts/header";
import { Sidebar } from "./../layouts/sidebar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router";
import Logo from "../../src/assets/img/logo.png";

export const ProfilePage = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/user",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        console.log("User data:", res.data); // 👉 cek isi user.photo
        setUsers(res.data);
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
                  users.photo
                    ? `http://intern-manage-2025-production.up.railway.app/d-custs/img/avt/${users.photo}`
                    : "/default-avatar.png"
                }
                alt={users.name}
                className="w-full h-full object-cover rounded-full border shadow"
              />
              <Link
                to="/editprofile"
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                title="Edit Photo"
              >
                ✏️
              </Link>
            </div>

            {/* INFO USER */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="font-semibold">Name</span> : {users.name}
              </div>
              <div>
                <span className="font-semibold">Email</span> : {users.email}
              </div>
              <div>
                <span className="font-semibold">Tanggal Bergabung</span> :{" "}
                {new Date(users.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>
                <span className="font-semibold">Role</span> : {users.role}
              </div>
            </div>

            {/* BADGE / LOGO */}
            <div className="hidden md:block">
              <img
                src={Logo}
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
