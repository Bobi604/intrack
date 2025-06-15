export const HeaderA = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-200 md:ml-60 fixed top-0 left-0 right-0 z-10  h-16">
      <div className="text-gray-500 text-base md:text-lg font-semibold">
        Pages
      </div>
      {/* disini ada dimana page yang kita buka, misal: Dashboard, Users, Progress, Attendance */}

      <div className="sm:block w-1/3">
        <input
          type="text"
          placeholder="Ϙ Search..."
          className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      {/* logika ketika users yang login akan tertampil namanya disini */}
      <div className="text-gray-500 text-sm md:text-base">Admin Dayu</div>
    </div>
  );
};
