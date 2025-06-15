import { SidebarA } from "../../../layouts/admin/sidebar";
import { HeaderA } from "../../../layouts/admin/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link } from "react-router";

export const UsersPage = () => {
  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <SidebarA />
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
                <Td>CREATED AT</Td>
                <Td>ACTION</Td>
              </Tr>
            </Thead>
            <Tbdy>
              <Tr>
                <Td>John Doe</Td>
                <Td>Jhon@doe.com</Td>
                <Td>Intern</Td>
                <Td>2023-10-01</Td>
                <Td>
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline ml-2">
                    Delete
                  </button>
                </Td>
              </Tr>
            </Tbdy>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
