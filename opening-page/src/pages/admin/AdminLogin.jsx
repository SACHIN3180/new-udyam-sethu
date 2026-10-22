import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ShieldCheck, AlertCircle, ArrowRight, KeyRound, Lock } from "lucide-react";

export const AdminLogin = () => {
  const { loginAdmin, adminPassword } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@udyamssethu.gov.in");
  const [password, setPassword] = useState("admin123");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = loginAdmin(email, password);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem" }}>
      <div className="card" style={{ maxWidth: "480px", width: "100%", padding: "2.75rem", borderTop: "5px solid #f59e0b" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <ShieldCheck size={32} />
          </div>
          <span className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>
            Platform Governance
          </span>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--gray-900)" }}>
            Admin Portal Access
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginTop: "0.25rem" }}>
            Higher Education Department & State Verification Authority
          </p>
        </div>

        {/* Developer Credentials Notice as requested */}
        <div style={{ background: "#f8fafc", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <KeyRound size={16} color="#d97706" />
            <strong style={{ fontSize: "0.85rem", color: "var(--gray-900)" }}>Developer Default Credentials:</strong>
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--gray-600)", fontFamily: "monospace" }}>
            Email: <strong>admin@udyamssethu.gov.in</strong> <br />
            Password: <strong>{adminPassword}</strong>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#1e40af", marginTop: "0.4rem" }}>
            💡 You can change this password after logging in from the Admin Dashboard settings.
          </p>
        </div>

        {errorMessage && (
          <div className="animate-fade-in" style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "0.85rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Administrator Email</label>
            <input
              type="email"
              className="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: "1px solid #334155" }}
          >
            <span>Sign In to Admin Portal</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
