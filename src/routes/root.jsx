import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardAdminPage } from "../pages/admin/dashboard";
import { DashboardStaffPage } from "../pages/staff/dashboard";
import { DashboardMgPage } from "../pages/magang/dashboard";
import { JadwalPage } from "../pages/magang/jadwal";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { UsersPage } from "../pages/admin/users/index";
import { AttendancePage } from "../pages/admin/attendance";
import { ProgressPage } from "../pages/admin/progres";
import { AttendanceForm } from "../pages/admin/attendance/create";
import { EditAttendance } from "../pages/admin/attendance/edit";
import { ProgressForm } from "../pages/admin/progres/create";
import { UsersForm } from "../pages/admin/users/create";
import { Home } from "../pages/home";
import { ProfilePage } from "../pages/profile";
import { AttendanceStaffPage } from "../pages/staff/attendance";
import { InternshipPage } from "../pages/staff/magang";
import { ProgressStaffPage } from "../pages/staff/progress/laporanm";
import { EditUser } from "../pages/admin/users/edit";
import { EditProfile } from "../pages/editprofil";
import { AttendanceIntern } from "../pages/magang/absensi";
import { CreateIntership } from "../pages/staff/magang/create";
import { EditProgress } from "../pages/admin/progres/edit";
import { DetailPage } from "../pages/magang/detail";
import { ProgresPageM } from "../pages/magang/progres";

export const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route */}
        <Route index element={<Home />} />

        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        {/* dashboard routes */}

        {/* Admin, Staff, and Mg dashboard routes */}
        <Route path="/dashboardadmin" element={<DashboardAdminPage />} />
        <Route path="/dashboardstaff" element={<DashboardStaffPage />} />
        <Route path="/dashboardmg" element={<DashboardMgPage />} />

        {/* Admin routes */}
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/ceratea" element={<AttendanceForm />} />
        <Route path="/edita/:id" element={<EditAttendance />} />
        <Route path="/progress" element={<ProgressPage />} />
         <Route path="/editP/:id" element={<EditProgress />} />
        <Route path="/createP" element={<ProgressForm />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/createU" element={<UsersForm />} />
        <Route path="/editU/:id" element={<EditUser />} />

        {/* staff routes */}
        <Route path="/attendances" element={<AttendanceStaffPage />} />
        <Route path="/magangs" element={<InternshipPage />} />
        <Route path="/progresss" element={<ProgressStaffPage />} />
    <Route path="/createInternship" element={<CreateIntership/>} />

        {/* magang routes */}
        <Route path="/attendancemg" element={<AttendanceIntern />} />
        <Route path="/progressmg" element={<ProgresPageM/>} />
        <Route path="/jadwal" element={<JadwalPage />} />
        <Route path="/detail" element={<DetailPage/>} />

        {/* Default route */}
        
      </Routes>
    </BrowserRouter>
  );
};
