// src/pages/attendance/absensi.jsx
import { Sidebar } from "../../layouts/sidebar";
import { HeaderA } from "../../layouts/header";
import { Footer } from "../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { swalMixin } from "../../library/sweetalert";

export const AttendanceIntern = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = Cookies.get("userId");
  const username = Cookies.get("username");
  const token = Cookies.get("token");

  // Ambil data absensi hanya untuk user login
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/tmp_ia",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const userAttendance = (res.data.data || []).filter(
          (att) => att.user_id === userId
        );

        setAttendances(userAttendance);
      } catch (error) {
        console.error("Gagal mengambil data absensi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, userId]);

  // Data absensi hari ini
  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = attendances.find((att) => att.tanggal === today);

  // ✅ Kondisi tombol
  const showCheckIn = !todayAttendance;
  const showCheckOut =
    todayAttendance && todayAttendance.jam_masuk && !todayAttendance.jam_keluar;

  // ✅ Fungsi Check In
  const handleCheckIn = async () => {
    try {
      const payload = { user_id: userId, status: "Hadir" };

      const res = await axios.post(
        "https://intern-manage-2025-production.up.railway.app/api/attend_intern",
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      swalMixin("success", res.data.message || "Check-in berhasil!");
      setAttendances((prev) => [res.data.data, ...prev]);
    } catch (error) {
      swalMixin("error", error.response?.data?.message || "Gagal check-in.");
    }
  };

  // ✅ Fungsi Check Out
  const handleCheckOut = async () => {
    try {
      const now = new Date();
      const jam_keluar = now.toTimeString().split(" ")[0];

      const payload = { user_id: userId, tanggal: today, jam_keluar };

      const res = await axios.post(
        "https://intern-manage-2025-production.up.railway.app/api/attend_intern_checkout",
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      swalMixin("success", res.data.message || "Check-out berhasil!");
      setAttendances((prev) =>
        prev.map((att) =>
          att.tanggal === today && att.user_id === userId
            ? { ...att, jam_keluar }
            : att
        )
      );
    } catch (error) {
      swalMixin("error", error.response?.data?.message || "Gagal check-out.");
    }
  };

  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />

      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-6 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-1">Attendance</h3>
          <p className="mb-4">
            Hai <span className="font-bold">{username || "User"}</span>, lakukan
            absensi harian dan lihat riwayat absensi kamu
          </p>

          {/* Tombol aksi */}
          <div className="flex justify-end mb-6 gap-3">
            {showCheckIn && (
              <button
                onClick={handleCheckIn}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-xl hover:opacity-90 shadow"
              >
                CHECK IN
              </button>
            )}
            {showCheckOut && (
              <button
                onClick={handleCheckOut}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-xl hover:opacity-90 shadow"
              >
                CHECK OUT
              </button>
            )}
          </div>

          {/* Tabel absensi */}
          {loading ? (
            <p>Loading data absensi...</p>
          ) : attendances.length === 0 ? (
            <p className="text-gray-500">Belum ada data absensi.</p>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Td>DATE</Td>
                  <Td>CHECK IN</Td>
                  <Td>CHECK OUT</Td>
                  <Td>STATUS</Td>
                </Tr>
              </Thead>
              <Tbdy>
                {attendances.map((att) => (
                  <Tr key={att.id}>
                    <Td>{att.tanggal}</Td>
                    <Td>{att.jam_masuk || "-"}</Td>
                    <Td>{att.jam_keluar || "-"}</Td>
                    <Td>{att.status}</Td>
                  </Tr>
                ))}
              </Tbdy>
            </Table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
