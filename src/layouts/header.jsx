import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

export const HeaderA = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/users",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const username = Cookies.get("role") || "Guest";

  // Mapping pathname ke nama halaman
  const pageTitles = {
    "/dashboardadmin": "Dashboard",
    "/dashboardstaff": "Dashboard",
    "/dashboardmagang": "Dashboard",
    "/users": "Users",
    "/magang": "Magang",
    "/attendance": "Attendance",
    "/progress": "Daily Work Report",
    "/profile": "Profile",
    "/about": "About Us",
  };

  const currentPage = pageTitles[location.pathname] || "Pages";

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchQuery.toLowerCase();

    if (keyword.includes("user")) navigate("/users");
    else if (keyword.includes("magang")) navigate("/magang");
    else if (keyword.includes("progress") || keyword.includes("report"))
      navigate("/progress");
    else if (keyword.includes("attend")) navigate("/attendance");
    else if (keyword.includes("dashboard")) navigate("/dashboardadmin");
    else alert("Tidak ditemukan");

    setSearchQuery("");
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center px-12 md:px-13 py-2 bg-gray-200 md:ml-60 fixed top-0 left-0 right-0 z-10 gap-2 md:gap-0">
      {/* Row pertama: judul dan profil */}
      <div className="flex justify-between items-center w-full">
        {/* Page Info */}
        <div className="text-gray-500 text-base md:text-lg font-semibold ">
          <h1 className="text-black text-base md:text-lg font-semibold">
            Pages
          </h1>
          {currentPage}
        </div>

        {/* Profile di kanan */}
        <div className="relative ml-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={`http://intern-manage-2025-production.up.railway.app/d-custs/img/avt/${user.photo}`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-gray-700 hidden sm:block">
              {username}
            </span>
            <FaChevronDown className="text-sm hidden sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Row kedua: search */}
      <form onSubmit={handleSearch} className="w-full md:w-1/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search..."
          className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </form>
    </div>
  );
};
