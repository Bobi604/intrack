import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardAdminPage } from "../pages/admin/dashboard";
import { DashboardStaffPage } from "../pages/staff/dashboard";
import { DashboardMgPage } from "../pages/magang/dashboard";
import { JadwalPage } from "../pages/magang/jadwal";
import { AdminIPage } from "../layouts/admin/index";
import LoginPage from "../pages/login";
import { RegisterPage } from "../pages/register";
import { UsersPage } from "../pages/admin/users/index";
import { AttendancePage } from "../pages/admin/attendance";
import { ProgressPage } from "../pages/admin/progres";
import { AttendanceForm } from "../pages/admin/attendance/create";
import { ProgressForm } from "../pages/admin/progres/create";
import { UsersForm } from "../pages/admin/users/create";

export const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route */}
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />

        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* dashboard routes */}
        <Route path="/adminI" element={<AdminIPage />} />

        {/* Admin, Staff, and Mg dashboard routes */}
        <Route path="/dashboardadmin" element={<DashboardAdminPage />} />
        <Route path="/dashboardstaff" element={<DashboardStaffPage />} />
        <Route path="/dashboardmg" element={<DashboardMgPage />} />

        {/* Magang routes */}
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/ceratea" element={<AttendanceForm />} />
        <Route path="/jadwal" element={<JadwalPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/createP" element={<ProgressForm />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/createU" element={<UsersForm />} />

        {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
};
