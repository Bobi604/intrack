import { Sidebar } from "../../layouts/sidebar";
import { HeaderA } from "../../layouts/header";
import { Footer } from "../../components/footer";

export const DetailPage = () => {
  return (
    <>
      <Sidebar />
      <HeaderA />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 bg-gray-100 mt-20 md:ml-64 transition-all">
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Detail Jadwal Piket</h2>
            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <p>Menyapu area padmasana dan sekitarnya (lantai 1)</p>
              <p>Menyapu lantai 2</p>
              <p>Mebanten setiap hari</p>
              <p>Refill botol sunlight jika habis</p>
              <p>Buang sampah setiap hari</p>
              <p>Mengepel lantai 2 (jika diperlukan)</p>
              <p>Mengelap meja di lantai 2 (jika diperlukan)</p>
              <p>
                Menyiram tanaman dan lantai 1 agar tidak berdebu (jika
                diperlukan)
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};
