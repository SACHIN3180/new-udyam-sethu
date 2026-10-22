import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { VernacularVoiceWidget } from "./components/VernacularVoiceWidget";

// Pages
import { OpeningPage } from "./pages/opening/OpeningPage";
import { StudentLogin } from "./pages/student/StudentLogin";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { InstitutionLogin } from "./pages/institution/InstitutionLogin";
import { InstitutionRegister } from "./pages/institution/InstitutionRegister";
import { InstitutionDashboard } from "./pages/institution/InstitutionDashboard";
import { EmployerLogin } from "./pages/employer/EmployerLogin";
import { EmployerRegister } from "./pages/employer/EmployerRegister";
import { EmployerDashboard } from "./pages/employer/EmployerDashboard";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Opening Page Gateway */}
              <Route path="/" element={<OpeningPage />} />

              {/* Student Portal Routes */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />

              {/* Institution Portal Routes */}
              <Route path="/institution/login" element={<InstitutionLogin />} />
              <Route path="/institution/register" element={<InstitutionRegister />} />
              <Route path="/institution/dashboard" element={<InstitutionDashboard />} />

              {/* Employer Portal Routes */}
              <Route path="/employer/login" element={<EmployerLogin />} />
              <Route path="/employer/register" element={<EmployerRegister />} />
              <Route path="/employer/dashboard" element={<EmployerDashboard />} />

              {/* Admin Portal Routes (Modular Dedicated Folder) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />

          {/* Floating Vernacular Voice AI (Kannada, English, Hindi) */}
          <VernacularVoiceWidget />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
