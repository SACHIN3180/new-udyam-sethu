import React from "react";
import { useApp } from "../context/AppContext";
import { Mail, X, CheckCircle, Clock, Send } from "lucide-react";

export const EmailSimulatorModal = ({ isOpen, onClose }) => {
  const { simulatedEmails } = useApp();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--gray-200)", paddingBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ background: "#dbeafe", padding: "0.5rem", borderRadius: "8px", color: "#1e40af" }}>
              <Mail size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--gray-900)" }}>
                Simulated Government Dispatch & Email Inbox
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                Real-time delivery verification for registration approval & notifications
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: "var(--gray-500)", padding: "0.25rem" }}>
            <X size={20} />
          </button>
        </div>

        {simulatedEmails.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--gray-500)" }}>
            <Mail size={42} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
            <p style={{ fontWeight: 600 }}>No simulated emails sent yet in this session.</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
              When an employer or institution registers or gets approved by admin, official dispatches appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {simulatedEmails.map((email) => (
              <div
                key={email.id}
                style={{
                  border: "1px solid var(--gray-200)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem",
                  background: email.subject.includes("Approved") ? "#f0fdf4" : "#fffbeb",
                  borderLeft: `5px solid ${email.subject.includes("Approved") ? "#16a34a" : "#d97706"}`
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div>
                    <span className={`badge ${email.subject.includes("Approved") ? "badge-green" : "badge-amber"}`} style={{ marginBottom: "0.35rem" }}>
                      {email.subject.includes("Approved") ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {email.subject.includes("Approved") ? "Official Clearance" : "Pending Action"}
                    </span>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                      {email.subject}
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>
                      To: <strong>{email.recipientName}</strong> &lt;{email.to}&gt;
                    </p>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{email.sentAt}</span>
                </div>
                <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--gray-200)", whiteSpace: "pre-line", fontSize: "0.875rem", color: "var(--gray-700)" }}>
                  {email.body}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Inbox
          </button>
        </div>
      </div>
    </div>
  );
};
