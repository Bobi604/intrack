// src/components/SidebarA.jsx
import { useState } from "react";
import { FaBars, FaHome, FaUsers, FaInfoCircle } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoMdMegaphone, IoIosSettings } from "react-icons/io";
import { Link, useLocation } from "react-router";
import Logo from "../../assets/img/logo.png"; // Adjust the path as necessary

export const SidebarA = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboardadmin", icon: <FaHome />, label: "Dashboard" },
    { to: "/users", icon: <FaUsers />, label: "Users" },
    { to: "/attendance", icon: <ImLocation2 />, label: "Attendance" },
    { to: "/progress", icon: <IoMdMegaphone />, label: "Daily Work Report" },
    { to: "/about", icon: <FaInfoCircle />, label: "About Us" },
    { to: "/login", icon: <IoIosSettings />, label: "Log Out" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="md:hidden p-4 text-gray-700 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-200 fixed top-0 left-0 z-40 min-h-screen w-64 p-4 transition-transform duration-300 ease-in-out transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="font-bold text-xl flex items-center gap-2 ">
          <img src={Logo} alt="Logo" className="h-6" /> In Track
        </div>
        <h2 className="text-1xl gap-2 text-gray-500 mb-10 mx-6">Admin</h2>
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
                  onClick={() => setIsOpen(false)} // close sidebar on link click (mobile)
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

      {/* Overlay on mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
