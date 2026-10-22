import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Building2, AlertCircle, Clock, Lightbulb, ArrowRight, ShieldCheck } from "lucide-react";

export const InstitutionLogin = () => {
  const { loginInstitution } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingModal, setPendingModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = loginInstitution(email, password);
    if (result.success) {
      navigate("/institution/dashboard");
    } else if (result.pendingApproval) {
      setPendingModal(true);
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleQuickLogin = (instEmail) => {
    setEmail(instEmail);
    setPassword("institution123");
    const result = loginInstitution(instEmail, "institution123");
    if (result.success) {
      navigate("/institution/dashboard");
    } else if (result.pendingApproval) {
      setPendingModal(true);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem" }}>
      <div className="card" style={{ maxWidth: "480px", width: "100%", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "#f0fdfa", color: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <Building2 size={28} />
          </div>
          <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
            Institution Portal
          </span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
            Sign In to Institution Portal
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginTop: "0.25rem" }}>
            Manage student credentials, batch analytics, campus drives, and verified identities
          </p>
        </div>

        {/* Pending Approval Modal/Alert */}
        {pendingModal && (
          <div className="approval-banner animate-fade-in" style={{ flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Clock size={22} className="approval-banner-icon" />
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#92400e" }}>
                  Awaiting Administrator Approval
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#b45309", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Your registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted.
                </p>
              </div>
            </div>
            <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid #fde68a", display: "flex", gap: "0.5rem", alignItems: "flex-start", marginTop: "0.5rem" }}>
              <Lightbulb size={16} color="#d97706" style={{ flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontSize: "0.8rem", color: "#78350f" }}>
                <strong>💡 Tip:</strong> Switch to the <strong>Admin Portal</strong> to accept this institution registration, then sign in directly.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <Link to="/admin/login" className="btn btn-sm btn-secondary" style={{ fontSize: "0.75rem" }}>
                Open Admin Portal to Approve
              </Link>
            </div>
          </div>
        )}

        {errorMessage && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "0.85rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Official Institution Email</label>
            <input
              type="email"
              className="form-input"
              required
              placeholder="dean@hkespda.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <a href="#forgot" style={{ fontSize: "0.8rem", color: "var(--primary)" }}>Forgot?</a>
            </div>
            <input
              type="password"
              className="form-input"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
            <span>Sign In to Institution</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: "1.75rem", textAlign: "center", fontSize: "0.875rem", color: "var(--gray-600)" }}>
          New college or university?{" "}
          <Link to="/institution/register" style={{ color: "#0d9488", fontWeight: 700, textDecoration: "underline" }}>
            Register Institution
          </Link>
        </div>

        {/* Demo Quick Logins */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--gray-200)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", marginBottom: "0.75rem", textAlign: "center" }}>
            Demo Quick Login Pre-sets
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              onClick={() => handleQuickLogin("dean@hkespda.edu.in")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.8rem" }}
            >
              <span>HKES PDA College of Engg (Kalaburagi)</span>
              <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>Approved</span>
            </button>
            <button
              onClick={() => handleQuickLogin("admin@bitmballari.edu.in")}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: "space-between", width: "100%", fontSize: "0.8rem" }}
            >
              <span>BITM Ballari (Pending Approval Demo)</span>
              <span className="badge badge-amber" style={{ fontSize: "0.65rem" }}>Pending</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
