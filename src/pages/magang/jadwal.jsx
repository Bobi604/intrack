import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../../layouts/sidebar";
import { HeaderA } from "../../layouts/header";
import { Footer } from "../../components/footer";
import { Link } from "react-router";

export const JadwalPage = () => {
  const [jadwal, setJadwal] = useState([]);
  const [hariIndex, setHariIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // ambil token dari login
        const response = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/cod",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJadwal(response.data.data || []);
      } catch (error) {
        console.error("Error fetch jadwal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextDay = () => {
    setHariIndex((prev) => (prev + 1) % days.length);
  };

  const prevDay = () => {
    setHariIndex((prev) => (prev - 1 + days.length) % days.length);
  };

  // Filter jadwal sesuai hari
  const jadwalHari = jadwal.filter(
    (item) => item.hari?.toLowerCase() === days[hariIndex].toLowerCase()
  );

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 ">
      <HeaderA />
      <Sidebar />

      <div className="p-6 sm:ml-64">
        <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-6">Jadwal Piket</h1>

          {/* Navigasi Hari */}
          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={prevDay}
              className="px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              ◀
            </button>
            <h2 className="text-xl font-bold">{days[hariIndex]}</h2>
            <button
              onClick={nextDay}
              className="px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              ▶
            </button>
          </div>

          {/* List Orang */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {jadwalHari.length > 0 ? (
              jadwalHari.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white"
                >
                  <img
                    src={
                      user.photo && user.photo !== "-"
                        ? user.photo
                        : "https://via.placeholder.com/150"
                    }
                    alt={user.name}
                    className="w-36 h-36 object-cover rounded-lg mb-3 shadow"
                  />
                  <h3 className="font-bold text-lg uppercase">{user.name}</h3>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500">Tidak ada jadwal</p>
            )}
          </div>

          {/* Button Detail */}
          <Link
            to="/detail"
            className="mt-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-3 rounded-md hover:opacity-90"
          >
            DETAIL PIKET
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
