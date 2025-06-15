// src/components/Sidebar.jsx
import { FaBars, FaInfoCircle, FaHome, FaUsers, FaUser } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoIosSettings, IoMdMegaphone } from "react-icons/io";

export const SidebarA = () => {
  return (
    <>
      <div className="bg-gray-200  w-60 min-h-screen  py-0 p-4 fixed">
        <div className="text-2xl font-bold text-center text-gray-500 mb-10">
          InTrack Admin
        </div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <FaHome /> <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <FaUsers /> <span>Internship</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <ImLocation2 /> <span>Attendance</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <IoMdMegaphone /> <span>Daily Work Report</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <FaUser /> <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer">
            <FaInfoCircle />
            <span>About Us</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white cursor-pointer mt-8">
            <IoIosSettings /> <span>Log Out</span>
          </li>
        </ul>
      </div>
    </>
  );
};
