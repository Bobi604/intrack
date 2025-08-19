import { Sidebar } from "../../../layouts/sidebar";
import { HeaderA } from "../../../layouts/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { swalDialog, swalMixin } from "../../../library/sweetalert";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://intern-manage-2025-production.up.railway.app/api/users",
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fungsi delete user
const handleDeleteUser = async (id) => {
  const confirm = await swalDialog("Are you sure you want to delete this user?", "warning");

  if (!confirm.isConfirmed) return;

  try {
    const response = await axios.delete(
      `https://intern-manage-2025-production.up.railway.app/api/users/${id}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );

    swalMixin("success", response.data.message); // pakai Toast untuk feedback
    fetchData(); // pastikan ini adalah fungsi untuk refresh data user
  } catch (error) {
    console.error(error);
    swalMixin("error", "Failed to delete user.");
  }
};


  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-4">Users</h3>
          <p>Manage Internship & Staff</p>
          <div className="flex justify-end mb-4">
            <Link
              to="/createU"
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:bg-teal-600"
            >
              ADD A NEW INTERN
            </Link>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Td>NAME</Td>
                <Td>EMAIL</Td>
                <Td>ROLE</Td>
                <Td>PHOTO</Td>
                <Td>CREATED AT</Td>
                <Td>ACTION</Td>
              </Tr>
            </Thead>
            <Tbdy>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <img
                      src={`http://intern-manage-2025-production.up.railway.app/d-custs/img/avt/${user.photo}`}
                      alt="user-avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Td>
                  <Td className="xl:text-wrap">{user.date}</Td>
                  <Td>
                    <Link
                      to={`/editU/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:underline ml-2"
                    >
                      Delete
                    </button>
                  </Td>
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
