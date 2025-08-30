import { Sidebar } from "../../layouts/sidebar";
import { HeaderA } from "../../layouts/header";
import { Footer } from "../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { swalMixin } from "../../library/sweetalert";

export const ProgresPageM = () => {
  const [progress, setProgress] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/tmp_ji",
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );
        setProgress(res.data.data); // ambil array
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchData();
  }, []);

  // ================= PATCH STATUS DONE =================
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        "https://intern-manage-2025-production.up.railway.app/api/intern_job",
        { id, status: newStatus }, // body
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );

      // update state lokal
      setProgress((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      swalMixin("success", "Status updated!");
    } catch (error) {
      console.error("Gagal update status:", error.response?.data || error);
      swalMixin("error", "Failed to update status.");
    }
  };

  // ================= FILTER =================
  const pendingTasks = progress.filter((p) => p.status !== "done");
  const doneTasks = progress.filter((p) => p.status === "done");

  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-3">
            Daily Work Report (Manager)
          </h3>
          <p className="mb-3">Intern Daily Progress Overview</p>

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
                <Td>ACTION</Td>
              </Tr>
            </Thead>
            <Tbdy>
              {pendingTasks.length > 0 ? (
                pendingTasks.map((progres) => (
                  <Tr key={progres.id}>
                    <Td>{progres.user?.name}</Td>
                    <Td>{progres.task}</Td>
                    <Td>{progres.description}</Td>
                    <Td>{progres.deadline}</Td>
                    <Td>{progres.status}</Td>
                    <Td>
                      <button
                        onClick={() => updateStatus(progres.id, "done")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700"
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
                    <Td>{progres.task}</Td>
                    <Td>{progres.description}</Td>
                    <Td>{progres.deadline}</Td>
                    <Td>
                      <span className="text-green-600 font-bold">Done</span>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="5" className="text-center text-gray-500">
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
