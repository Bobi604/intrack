import { Sidebar } from "../../../layouts/sidebar";
import { HeaderA } from "../../../layouts/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const InternshipPage = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch Users lalu filter role internship
  const fetchInterns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://intern-manage-2025-production.up.railway.app/api/users",
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      console.log("Users API response:", res.data);

      let users = [];
      if (Array.isArray(res.data)) {
        users = res.data;
      } else if (Array.isArray(res.data.data)) {
        users = res.data.data;
      }

      // ✅ Filter hanya role internship
      const filtered = users.filter((u) => u.role === "intern");
      setInterns(filtered);
    } catch (err) {
      console.error("Fetch users error:", err);
      setInterns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  // ✅ Delete User (internship)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship user?")) return;
    try {
      await axios.delete(
        `https://intern-manage-2025-production.up.railway.app/api/users/${id}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      fetchInterns(); // refresh setelah delete
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <Sidebar />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-4">Internship</h3>
          <p className="mb-4">Manage Internship</p>

          <div className="flex justify-end mb-4">
            <Link
              to="/createInternship"
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:bg-teal-600"
            >
              ADD INTERNSHIP
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : interns.length === 0 ? (
            <p className="text-center text-gray-500">No internship users found.</p>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Td>NAME</Td>
                  <Td>EMAIL</Td>
                  <Td>ROLE</Td>
                  <Td>CREATED AT</Td>
                  <Td>ACTION</Td>
                </Tr>
              </Thead>
              <Tbdy>
                {interns.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>{new Date(user.created_at).toLocaleDateString() || "-"}</Td>
                    <Td>
                      <button
                        onClick={() => navigate(`/editInternship/${user.id}`)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:underline ml-2"
                      >
                        Delete
                      </button>
                    </Td>
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
