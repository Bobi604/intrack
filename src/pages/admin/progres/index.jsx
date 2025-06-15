import { SidebarA } from "../../../layouts/admin/sidebar";
import { HeaderA } from "../../../layouts/admin/header";
import { Footer } from "../../../components/footer";
import { Table, Tbdy, Td, Thead, Tr } from "../../../components/table";
import { Link } from "react-router";
import { FaPen, FaTrash } from "react-icons/fa";
export const ProgressPage = () => {
  return (
    <div className="bg-gray-200 text-gray-900">
      <HeaderA />
      <SidebarA />
      <main className="md:ml-64 p-3 pt-20 transition-all min-h-screen bg-gray-200 rounded-lg">
        <div className="bg-white p-4 shadow rounded-xl overflow-auto">
          <h3 className="text-xl font-semibold mb-3">Daily Work Report</h3>
          <p className="mb-3">Manage Daily Work Report</p>
          <div className="">
            <Link className=" px-4  border border-teal-400 rounded-lg text-teal-400 ">
              Vew all
            </Link>
          </div>
          <div className="flex justify-end mb-4">
            <Link
              to="/createP"
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:bg-teal-600"
            >
              ADD A NEW INTERN
            </Link>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Td>INTEREN'S NAME</Td>
                <Td>TASK</Td>
                <Td>DESCRIPTIONS</Td>
                <Td>DEADLINE</Td>
                <Td>BUTTON</Td>
                <Td>ACTION</Td>
              </Tr>
            </Thead>
            <Tbdy>
              <Tr>
                <Td>John Doe</Td>
                <Td>Lorem ipsum dolor sit amet.</Td>
                <Td>Lorem ipsum dolor sit amet.
                </Td>
                <Td>2023-10-01</Td>
                <Td>
                  <button className="bg-green-600 text-white rounded-lg px-5 py-1">
                    Done
                  </button>
                </Td>
                <Td>
                  <button className="text-red-500 hover:underline ml-2">
                    <FaTrash />
                    Delete
                  </button>
                  <button className="text-gray-800 hover:underline">
                    <FaPen />
                    Edit
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
