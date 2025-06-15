import { DashboardPage } from "../../components/dashboard";
import { Footer } from "../../components/footer";
import { Table, Tbdy, Th, Thead, Tr } from "../../components/table";

export const DashboardMgPage = () => {
  return (
    <>
      {/* // This is the admin dashboard page */}
      <DashboardPage className="bg-blue-200" />
      <Table className="w-full">
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th>Jabatan</Th>
            <Th>Mulai Magang</Th>
            <Th>Selesai Magang</Th>
            <Th>Status</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbdy>
          <Tr>
            <Th>Jhon cenna</Th>
            <Th className="bg-blue-400">Magang</Th>
          </Tr>
        </Tbdy>
      </Table>

      <Footer />
    </>
  );
};
