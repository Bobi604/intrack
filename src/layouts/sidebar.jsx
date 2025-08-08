// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Cookies from "js-cookie";
import { FaBars, FaHome, FaUsers } from "react-icons/fa";
import { IoMdMegaphone } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { BsClipboardData } from "react-icons/bs";
import Logo from "../assets/img/logo.png";
import axios from "axios";

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("http://192.168.0.238:8000/api/users", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        const role = Cookies.get("role ");
        if (role) {
          Cookies.set("role", role);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        Cookies.set("role", "guest"); // fallback agar sidebar tetap muncul
      }
    };

    fetchData();
  }, []);

  // Ambil role dari cookie
  const userRole = Cookies.get("role"); // "admin", "staff", atau "magang"

  // Definisi menu berdasarkan role
  const menuByRole = {
    admin: [
      { to: "/dashboardadmin", label: "Dashboard", icon: <FaHome /> },
      { to: "/users", label: "Users", icon: <FaUsers /> },
      { to: "/attendance", label: "Attendance", icon: <ImLocation2 /> },
      { to: "/progress", label: "Daily Work Report", icon: <IoMdMegaphone /> },
    ],
    staff: [
      { to: "/dashboardstaff", label: "Dashboard", icon: <FaHome /> },
      { to: "/magang", label: "Magang", icon: <BsClipboardData /> },
      { to: "/attendance", label: "Attendance", icon: <ImLocation2 /> },
      { to: "/progress", label: "Daily Work Report", icon: <IoMdMegaphone /> },
    ],
    intern: [
      { to: "/dashboardmagang", label: "Dashboard", icon: <FaHome /> },
      { to: "/users", label: "Users", icon: <FaUsers /> },
      { to: "/attendance", label: "Attendance", icon: <ImLocation2 /> },
      { to: "/progress", label: "Daily Work Report", icon: <IoMdMegaphone /> },
    ],
  };

  const links = menuByRole[userRole] || [];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        className="md:hidden p-4 text-gray-700 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-200 fixed top-0 left-0 z-40 min-h-screen w-64 p-4 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="font-bold text-xl flex items-center gap-2 mb-2 px-6">
          <img src={Logo} alt="Logo" className="h-6" />
          <span>In Track</span>
        </div>
        <h2 className="text-sm text-gray-500 px-6 capitalize">
          {userRole || "Guest"}
        </h2>

        <ul className="space-y-4">
          {links.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center space-x-3 p-2 rounded-md transition ${
                    isActive ? "bg-white text-black" : "text-gray-700"
                  } hover:bg-white hover:text-black`}
                >
                  <span className="bg-teal-400 p-2 rounded-full text-white">
                    {icon}
                  </span>
                  <span className="text-sm">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
