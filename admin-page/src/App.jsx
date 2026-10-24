
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import Applications from "./contents/Applications";
import Employers from "./pages/Employers";
import Institutions from "./pages/Institutions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/companies" element={<Employers />} />
        <Route path="/admin/institutions" element={<Institutions />} />
        <Route path="/admin/reports" element={<Reports/>}/>
        <Route path="/admin/settings" element={<Settings/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
