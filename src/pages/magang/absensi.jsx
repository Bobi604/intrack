// import React, { useEffect, useState } from "react";
// import axios from "axios";
import Cookies from "js-cookie";

const InternAttendance = () => {
  // const [attendances, setAttendances] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");

  // const token = Cookies.get("token"); // token dari login
  // const userId = Cookies.get("userId"); // id user login
  // const role = Cookies.get("role"); // role = "internship"

  // // Fetch data absensi
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       "https://intern-manage-2025-production.up.railway.app/attend_intern",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     setAttendances(res.data);
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     setMessage("Gagal mengambil data absensi");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Kirim aksi absensi
  // const handleAction = async (action) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "https://intern-manage-2025-production.up.railway.app/attend_intern",
  //       {
  //         user_id: userId,
  //         action: action, // "checkin", "checkout", "ijin", "sakit"
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     setMessage(`✅ ${action} berhasil`);
  //     fetchData(); // refresh data
  //   } catch (err) {
  //     console.error("Action error:", err);
  //     setMessage("❌ Gagal melakukan absensi");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (role === "internship") {
  //     fetchData();
  //   } else {
  //     setMessage("⚠️ Anda tidak memiliki akses ke halaman ini");
  //   }
  // }, []);

  // return (
  //   <div className="p-6">
  //     <h1 className="text-2xl font-bold mb-4">Absensi Magang</h1>

  //     {message && (
  //       <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
  //         {message}
  //       </div>
  //     )}

  //     {/* Tombol aksi */}
  //     <div className="flex gap-3 mb-6">
  //       <button
  //         onClick={() => handleAction("checkin")}
  //         className="px-4 py-2 bg-green-600 text-white rounded-lg"
  //       >
  //         Check-in
  //       </button>
  //       <button
  //         onClick={() => handleAction("checkout")}
  //         className="px-4 py-2 bg-red-600 text-white rounded-lg"
  //       >
  //         Check-out
  //       </button>
  //       <button
  //         onClick={() => handleAction("ijin")}
  //         className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
  //       >
  //         Ijin
  //       </button>
  //       <button
  //         onClick={() => handleAction("sakit")}
  //         className="px-4 py-2 bg-gray-600 text-white rounded-lg"
  //       >
  //         Sakit
  //       </button>
  //     </div>

  //     {/* Tabel absensi */}
  //     <div className="overflow-x-auto bg-white shadow rounded-lg">
  //       <table className="w-full border">
  //         <thead className="bg-gray-100">
  //           <tr>
  //             <th className="border px-4 py-2">Tanggal</th>
  //             <th className="border px-4 py-2">Jam Masuk</th>
  //             <th className="border px-4 py-2">Jam Keluar</th>
  //             <th className="border px-4 py-2">Status</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {loading ? (
  //             <tr>
  //               <td colSpan="4" className="text-center py-4">
  //                 Loading...
  //               </td>
  //             </tr>
  //           ) : attendances.length > 0 ? (
  //             attendances.map((a, i) => (
  //               <tr key={i}>
  //                 <td className="border px-4 py-2">{a.tanggal}</td>
  //                 <td className="border px-4 py-2">{a.jam_masuk || "-"}</td>
  //                 <td className="border px-4 py-2">{a.jam_keluar || "-"}</td>
  //                 <td className="border px-4 py-2">{a.status}</td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="4" className="text-center py-4">
  //                 Belum ada data absensi
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default InternAttendance;
