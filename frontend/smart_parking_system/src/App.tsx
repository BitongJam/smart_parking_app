import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import ParkingLocationForm from "./components/Admin/ParkingLocationForm";
import ParkingLocationList from "./components/Admin/ParkingLocationList";
import ParkingLocationReservation from "./components/Admin/ParkingLocationReservation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import UserRegistration from "./components/UserManagement/UserRegistration";
import BasicUserDashboard from "./components/BasicUser/BasicUserDashboard";
import BasicUserProtectedRoute from "./components/BasicUser/BasicUserProtectedRoute";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import UserManagementList from "./components/UserManagement/UserManagemetList";
import BasicUserNavbar from "./components/BasicUser/BasicUserNavbar";
import UserProfile from "./components/UserManagement/UserProfile";

function App() {
  return (
    <>
      {/* <ParkingLocationList /> */}
      {/* <ParkingLocationForm/> */}
      {/* <ParkingLocationLotForm/> */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register-user" element={<UserRegistration />} />
          {/* End -- Public Routes */}


          {/* Admin Routes */}
          <Route
            path="/"
            element={
              <AdminProtectedRoute>
                <Navbar />
                <MainLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="parking-location" element={<ParkingLocationList />} />
            <Route
              path="parking-location/create"
              element={<ParkingLocationForm />}
            />
            <Route
              path="parking-location/:id"
              element={<ParkingLocationReservation />}
            />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="user-management" element={ <UserManagementList/>}/>

            <Route path="user-profile" element={<UserProfile/>}/>
          </Route>
          {/* end -- Admin Routes */}

          {/* Client User Routes */}
          <Route
            path="/client"
            element={
              <BasicUserProtectedRoute>
                <BasicUserNavbar/>
                <MainLayout />
              </BasicUserProtectedRoute>
            }
          >
            <Route path="user-profile" element={<UserProfile/>}/>
            <Route path="dashboard" element={<BasicUserDashboard />} />
          </Route>
            {/* End -- Client user Routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
