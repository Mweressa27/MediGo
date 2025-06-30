import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/Profile';
import HospitalList from './pages/HospitalList';
import DoctorList from './pages/DoctorList';
import AppointmentPage from './pages/AppointmentPage';
import ProtectedRoute from './components/ProtectedRoute';
import HospitalDetail from './components/HospitalDetail';
import MyAppointments from './components/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/hospitals/:id" element={<HospitalDetail />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Protected Route Example */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
