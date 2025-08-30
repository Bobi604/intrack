import { useEffect, useState } from "react";
import { HeaderA } from "../../layouts/header";
import { Sidebar } from "../../layouts/sidebar";
import { Footer } from "../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../components/table";
import { FaUsers } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoMdMegaphone } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

export const DashboardMgPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [attendances, setAttendance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://intern-manage-2025-production.up.railway.app/api/tmp_ia",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        
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

      <main className="md:ml-64 p-6 pt-20 transition-all min-h-screen">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 shadow rounded-xl flex justify-between items-center bg-white">
            <div>
              <p className="text-gray-500">Jadwal Piket</p>
              <h2 className="text-2xl font-semibold text-decoration-line: underline">
                10 Intern
              </h2>
              <Link
                to="/jadwal"
                className="text-black display: flex align-items: center"
              >
                Check It
                <FaArrowRightLong />
              </Link>
            </div>
            <FaUsers className="text-teal-500 text-3xl" />
          </div>

          <div className="p-4 shadow rounded-xl flex justify-between items-center bg-white">
            <div>
              <p className="text-gray-500">Attendance Today</p>
              <h2 className="text-2xl font-semibold">10 Present</h2>
              <Link to="/attendancemg" className="text-black">
                Check It
                <FaArrowRightLong />
              </Link>
            </div>
            <ImLocation2 className="text-teal-500 text-3xl" />
          </div>

          <div className="p-4 shadow rounded-xl flex justify-between items-center bg-white">
            <div>
              <p className="text-gray-500">Total Work</p>
              <h2 className="text-2xl font-semibold">10 Progress</h2>
              <Link to="/progressmg" className="text-black">
                Check It
                <FaArrowRightLong />
              </Link>
            </div>
            <IoMdMegaphone className="text-teal-500 text-3xl" />
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-8 rounded-xl bg-white">
            <h3 className="text-xl font-semibold mb-4">
              Welcome to the InTrack Admin Panel
            </h3>
            <p className="text-sm text-gray-600">
              Panel ini dirancang untuk membantu Anda mengelola seluruh
              operasional program magang. Mulai dari manajemen data peserta
              magang, absensi harian, hingga laporan pekerjaan.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-white">
            <h3 className="text-xl font-semibold mb-4">Work Progress</h3>
            <ul className=" pl-5 space-y-2 ">
              <IoDocumentText />
              <h4>Design UI/UX</h4>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              <h4>Database Sistem</h4>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              <h4>Frontend</h4>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </ul>
          </div>
        </section>

        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-4">
            Today's Intership Absence
          </h3>
          <Table className="min-w-full">
            <Thead>
              <Tr>
                
                <Td>DATE</Td>
                <Td>CHECK IN TIME</Td>
                <Td>CHECK OUT TIME</Td>
                <Td>STATUS</Td>
              </Tr>
            </Thead>
            <Tbdy>
              {attendances.map((att) => (
                <Tr key={att.id}>
                  <Td>{att.tanggal}</Td>
                  <Td>{att.jam_masuk}</Td>
                  <Td>{att.jam_keluar}</Td>
                  <Td>{att.status}</Td>
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
