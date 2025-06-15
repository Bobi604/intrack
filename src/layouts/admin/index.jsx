export const AdminIPage = () => {
  return (
    <div className="md:ml-60 p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card title="Total Users" value="10 Intern" />
        <Card title="Attendance Today" value="10 Present" />
        <Card title="Total Progress" value="10 Progress" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Welcome to the InTrack Admin Panel
        </h3>
        <p className="text-sm text-gray-600">
          Panel ini dirancang untuk membantu Anda mengelola seluruh operasional
          program magang. Mulai dari manajemen data peserta magang, absensi
          harian, hingga laporan pekerjaan.
        </p>
      </div>
    </div>
  );
};
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}
