import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { GraduationCap, AlertCircle, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";

export const StudentLogin = () => {
  const { loginStudent, students } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = loginStudent(email);
    if (result.success) {
      navigate("/student/dashboard");
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleQuickLogin = (studentEmail) => {
    setEmail(studentEmail);
    setErrorMessage("");
    const result = loginStudent(studentEmail);
    if (result.success) {
      navigate("/student/dashboard");
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem" }}>
      <div className="card" style={{ maxWidth: "500px", width: "100%", padding: "2.75rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <GraduationCap size={30} />
          </div>
          <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
            Student Gateway
          </span>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--gray-900)" }}>
            Student Portal Sign In
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginTop: "0.35rem" }}>
            Access your AI Employability Score, verified workforce identity, and placement drives
          </p>
        </div>

        {/* Institution College Email Requirement Notice */}
        <div style={{ background: "#f8fafc", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <Mail size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "0.825rem", color: "var(--gray-700)", lineHeight: 1.5 }}>
            <strong>Official College Email Required:</strong> Please enter the official institutional email address provided by your college. Personal Gmail accounts cannot be used.
          </div>
        </div>

        {/* Error Alert if unregistered email is entered */}
        {errorMessage && (
          <div className="animate-fade-in" style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
            <div style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
              <strong>Authentication Error:</strong> {errorMessage}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Official College Email Address</label>
            <input
              type="email"
              className="form-input"
              required
              placeholder="e.g. rahul.kulkarni@hkespda.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
            <span>Sign In to Student Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Test Accounts Picker */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--gray-200)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", marginBottom: "0.75rem", textAlign: "center" }}>
            Demo Test Profiles (Pre-configured by Institutions)
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {/* Rahul - Senior with CGPA */}
            <button
              onClick={() => handleQuickLogin("rahul.kulkarni@hkespda.edu.in")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.8rem", textAlign: "left" }}
            >
              <div>
                <strong>Rahul Kulkarni (6th Sem)</strong>
                <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>rahul.kulkarni@hkespda.edu.in • CGPA 8.84</div>
              </div>
              <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>CGPA Active</span>
            </button>

            {/* Sneha - 1st Sem without exams -> CGPA Hidden */}
            <button
              onClick={() => handleQuickLogin("sneha.patil@hkespda.edu.in")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.8rem", textAlign: "left" }}
            >
              <div>
                <strong>Sneha Patil (1st Sem - New Student)</strong>
                <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>sneha.patil@hkespda.edu.in • No Exams Yet</div>
              </div>
              <span className="badge badge-blue" style={{ fontSize: "0.65rem" }}>CGPA Hidden (Rule)</span>
            </button>

            {/* Basavaraj - At risk / low attendance */}
            <button
              onClick={() => handleQuickLogin("basavaraj.b@hkespda.edu.in")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.8rem", textAlign: "left" }}
            >
              <div>
                <strong>Basavaraj B. (6th Sem - At Risk)</strong>
                <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>basavaraj.b@hkespda.edu.in • 64% Attendance</div>
              </div>
              <span className="badge badge-red" style={{ fontSize: "0.65rem" }}>Trend Decreasing</span>
            </button>

            {/* Test Invalid Email to trigger validation error */}
            <button
              onClick={() => handleQuickLogin("unregistered.student@gmail.com")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.75rem", color: "var(--gray-500)" }}
            >
              <span>Test Unregistered Email (Verify Error Prompt)</span>
              <span className="badge badge-amber" style={{ fontSize: "0.65rem" }}>Will Reject</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
