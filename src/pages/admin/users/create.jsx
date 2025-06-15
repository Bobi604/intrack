import { Link } from "react-router";

export const UsersForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="font-semibold text-lg mb-6">Add New Attendance</h2>

      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            placeholder="Write here . . . ."
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-6 py-2 rounded-lg hover:bg-[#1e2240] transition"
          >
            ADD NEW
          </button>
          <Link
            to="/users"
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            CANCLE
          </Link>
        </div>
      </form>
    </div>
  );
};
