import { Sidebar } from "../../../layouts/sidebar";
import { HeaderA } from "../../../layouts/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link } from "react-router";
import { FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const ProgressStaffPage = () => {
  const [progress, setProgress] = useState([]);

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/job_interns",
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );
        console.log("API Raw Response:", res.data);
        setProgress(res.data.data); // ✅ langsung ambil array
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk update status menjadi "done"
  const markAsDone = (id) => {
    setProgress((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "done" } : item))
    );
  };

  // Pisahkan pending & done
  const pendingTasks = progress.filter((p) => p.status !== "done");
  const doneTasks = progress.filter((p) => p.status === "done");

  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-3">Daily Work Report</h3>
          <p className="mb-3">Manage Daily Work Report</p>

          <div className="flex justify-end mb-4">
            <Link
              to="/createP"
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:bg-teal-600"
            >
              ADD A NEW REPORT
            </Link>
          </div>

          {/* ================= Pending Task ================= */}
          <h4 className="text-lg font-semibold mb-2 text-red-600">
            Pending Tasks
          </h4>
          <Table>
            <Thead>
              <Tr>
                <Td>INTERN'S NAME</Td>
                <Td>TASK</Td>
                <Td>DESCRIPTION</Td>
                <Td>DEADLINE</Td>
                <Td>STATUS</Td>
  
              </Tr>
            </Thead>
            <Tbdy>
              {pendingTasks.length > 0 ? (
                pendingTasks.map((progres) => (
                  <Tr key={progres.id}>
                    <Td>{progres.user?.name}</Td>
                    <Td className="xl:text-wrap">{progres.task}</Td>
                    <Td className="xl:text-wrap">{progres.description}</Td>
                    <Td>{progres.deadline}</Td>
                    <Td>
                      <button
                        onClick={() => markAsDone(progres.id)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Mark as Done
                      </button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="6" className="text-center text-gray-500">
                    No pending tasks 🎉
                  </Td>
                </Tr>
              )}
            </Tbdy>
          </Table>

          {/* ================= Done Task ================= */}
          <h4 className="text-lg font-semibold mt-6 mb-2 text-green-600">
            Completed Tasks
          </h4>
          <Table>
            <Thead>
              <Tr>
                <Td>INTERN'S NAME</Td>
                <Td>TASK</Td>
                <Td>DESCRIPTION</Td>
                <Td>DEADLINE</Td>
                <Td>STATUS</Td>

              </Tr>
            </Thead>
            <Tbdy>
              {doneTasks.length > 0 ? (
                doneTasks.map((progres) => (
                  <Tr key={progres.id}>
                    <Td>{progres.user?.name}</Td>
                    <Td className="xl:text-wrap">{progres.task}</Td>
                    <Td className="xl:text-wrap">{progres.description}</Td>
                    <Td>{progres.deadline}</Td>
                    <Td>
                      <span className="text-green-600 font-bold">Done</span>
                    </Td>

                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="6" className="text-center text-gray-500">
                    No completed tasks yet
                  </Td>
                </Tr>
              )}
            </Tbdy>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
