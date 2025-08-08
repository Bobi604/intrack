import { Sidebar } from "../../../layouts/sidebar";
import { HeaderA } from "../../../layouts/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link } from "react-router";
import { FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AttendancePage = () => {
  const [attendances, setAttendance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://192.168.0.238:8000/api/intern_attends",
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );
        console.log("Data fetched successfully:", res.data);
        setAttendance(res.data.data);
      } catch (error) {
        console.error("Error in Sidebar component:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-4">ATTANDANCE</h3>
          <p>Manage Attandance</p>
          <div className="flex justify-end mb-4">
            <Link
              to="/ceratea"
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:bg-teal-600"
            >
              ADD A NEW INTERN
            </Link>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Td>NAME</Td>
                <Td>DATE</Td>
                <Td>CHECK IN</Td>
                <Td>CHECK OUT</Td>
                <Td>KETERANGAN</Td>
                <Td>ACTION</Td>
              </Tr>
            </Thead>
            <Tbdy>
              {attendances.map((attendance) => (
                <Tr key={attendance.id}>
                  <Td>{attendance.user.name}</Td>
                  <Td>{attendance.tanggal}</Td>
                  <Td>{attendance.jam_masuk}</Td>
                  <Td>{attendance.jam_keluar}</Td>
                  <Td>{attendance.status}</Td>
                  <Td>
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline ml-2">
                      Delete
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbdy>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
