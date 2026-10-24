import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { EmailSimulatorModal } from "./EmailSimulatorModal";
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Globe,
  Wifi,
  Mail,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export const Navbar = () => {
  const {
    currentUser,
    logout,
    language,
    setLanguage,
    lowBandwidth,
    setLowBandwidth,
    simulatedEmails
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!currentUser) return "/";
    switch (currentUser.role) {
      case "student":
        return "/student/dashboard";
      case "institution":
        return "/institution/dashboard";
      case "employer":
        return "/employer/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <div className="brand-emblem">
              <span>ಉ</span>
            </div>
            <div className="brand-text">
              <h1>UDYAM SETHU</h1>
              <span>ಉದ್ಯಮ ಸೇತು • Employability Operating System</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-links" style={{ display: window.innerWidth < 990 ? "none" : "flex" }}>
            <Link
              to="/"
              className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/student/login"
              className={`nav-item ${location.pathname.startsWith("/student") ? "active" : ""}`}
            >
              Students
            </Link>
            <Link
              to="/institution/login"
              className={`nav-item ${location.pathname.startsWith("/institution") ? "active" : ""}`}
            >
              Institutions
            </Link>
            <Link
              to="/employer/login"
              className={`nav-item ${location.pathname.startsWith("/employer") ? "active" : ""}`}
            >
              Employers
            </Link>
          </div>

          {/* Controls: Language, Low-BW, Simulated Email, User Profile */}
          <div className="nav-controls">
            {/* Low Bandwidth Toggle */}
            <button
              onClick={() => {
                const nextState = !lowBandwidth;
                setLowBandwidth(nextState);
                if (nextState) {
                  document.body.classList.add("low-bandwidth-active");
                } else {
                  document.body.classList.remove("low-bandwidth-active");
                }
              }}
              className={`btn btn-sm ${lowBandwidth ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "0.75rem", padding: "0.35rem 0.65rem", display: "none" }} // Show on larger screens
              title="Toggle Low Bandwidth Mode (for 2G/3G networks in rural areas)"
            >
              <Wifi size={14} />
              <span>{lowBandwidth ? "2G Lite Active" : "Lite Mode"}</span>
            </button>

            {/* Language Selector */}
            <div className="lang-selector">
              <button 
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === "kn" ? "active" : ""}`}
                onClick={() => setLanguage("kn")}
                title="ಕನ್ನಡ"
              >
                ಕನ್ನಡ
              </button>
              <button
                className={`lang-btn ${language === "hi" ? "active" : ""}`}
                onClick={() => setLanguage("hi")}
                title="हिंदी"
              >
                हिन्दी
              </button>
            </div>

            {/* Email Dispatch Viewer Button */}
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ position: "relative", padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
              title="View Simulated Government Dispatches & Approval Mails"
            >
              <Mail size={16} />
              <span style={{ display: "none" }}>Dispatches</span>
              {simulatedEmails.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "#dc2626",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "0.65rem",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800
                  }}
                >
                  {simulatedEmails.length}
                </span>
              )}
            </button>

            {/* Auth Button or User Menu */}
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Link
                  to={getDashboardLink()}
                  className="btn btn-primary btn-sm"
                  style={{ gap: "0.4rem" }}
                >
                  <span>Dashboard</span>
                  <ChevronRight size={14} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Logout"
                  style={{ padding: "0.45rem" }}
                >
                  <LogOut size={16} color="#dc2626" />
                </button>
              </div>
            ) : (
              <Link to="/student/login" className="btn btn-primary btn-sm">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm"
              style={{ padding: "0.4rem", display: "none" }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Simulated Email Modal */}
      <EmailSimulatorModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </>
  );
};
