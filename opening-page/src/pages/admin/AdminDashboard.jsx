import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  ShieldCheck,
  Building2,
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  KeyRound,
  Save,
  Search,
  ExternalLink,
  Mail,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Lock
} from "lucide-react";

export const AdminDashboard = () => {
  const {
    institutions,
    employers,
    students,
    approveRegistration,
    rejectRegistration,
    adminPassword,
    updateAdminPassword,
    simulatedEmails
  } = useApp();

  const [activeTab, setActiveTab] = useState("pending"); // pending | employers | institutions | password | activity
  const [searchTerm, setSearchTerm] = useState("");

  // Change Password form state
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  // Filter pending approvals
  const pendingEmployers = employers.filter((e) => e.status === "pending");
  const pendingInstitutions = institutions.filter((i) => i.status === "pending");
  const totalPending = pendingEmployers.length + pendingInstitutions.length;

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;

  const handleApprove = (type, id, name) => {
    approveRegistration(type, id);
    alert(`Success! ${name} has been Approved by the Admin.\n\nAn official approval dispatch has been sent: "You have been Approved by the Admin so you can login using the credentials."`);
  };

  const handleReject = (type, id, name) => {
    if (window.confirm(`Are you sure you want to decline registration for ${name}?`)) {
      rejectRegistration(type, id);
      alert(`Registration request for ${name} was marked as Rejected.`);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwdMsg("");

    if (currentPwd !== adminPassword) {
      setPwdMsg("Error: Current password does not match.");
      return;
    }

    if (newPwd.length < 6) {
      setPwdMsg("Error: New password must be at least 6 characters long.");
      return;
    }

    if (newPwd !== confirmPwd) {
      setPwdMsg("Error: New password and confirmation do not match.");
      return;
    }

    updateAdminPassword(newPwd);
    setPwdMsg("Success: Admin password updated successfully! You can use this new password on your next sign-in.");
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };

  return (
    <div className="dashboard-layout">
      {/* Admin Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", border: "1px solid #334155", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f59e0b", color: "#000000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800 }}>State Admin</h4>
                <span className="badge badge-amber" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                  Super Administrator
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              Karnataka Higher Education Dept
            </p>
          </div>

          <nav className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              <Clock size={18} />
              <span>Pending Approvals</span>
              {totalPending > 0 && (
                <span className="badge badge-amber" style={{ marginLeft: "auto", fontSize: "0.7rem" }}>
                  {totalPending} Action{totalPending > 1 ? "s" : ""}
                </span>
              )}
            </button>

            <button
              className={`sidebar-item ${activeTab === "employers" ? "active" : ""}`}
              onClick={() => setActiveTab("employers")}
            >
              <Briefcase size={18} />
              <span>All Employers ({employers.length})</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "institutions" ? "active" : ""}`}
              onClick={() => setActiveTab("institutions")}
            >
              <Building2 size={18} />
              <span>All Institutions ({institutions.length})</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              <KeyRound size={18} />
              <span>Change Password</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              <Activity size={18} />
              <span>Platform Web Usage</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-user-card">
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-900)" }}>
            admin@udyamssethu.gov.in
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
            Root Platform Security
          </p>
          <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
            Active Government Session
          </span>
        </div>
      </aside>

      {/* Main Body */}
      <main className="dashboard-body">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
              Platform Administrator Command Center
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--gray-600)" }}>
              Governance, Institutional Approvals, Employer Clearances & Statewide Talent Analytics
            </p>
          </div>
        </div>

        {/* 4 Statewide Overview Stat Cards as requested */}
        <div className="stats-grid">
          {/* Total Employers */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div className="stat-val">{employers.length}</div>
              <div className="stat-label">Total Employers ({employers.filter(e => e.status === "approved").length} Approved)</div>
            </div>
          </div>

          {/* Total Institutions */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#ccfbf1", color: "#0d9488" }}>
              <Building2 size={22} />
            </div>
            <div>
              <div className="stat-val">{institutions.length}</div>
              <div className="stat-label">Total Institutions ({institutions.filter(i => i.status === "approved").length} Approved)</div>
            </div>
          </div>

          {/* Total Students */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dbeafe", color: "#1e40af" }}>
              <Users size={22} />
            </div>
            <div>
              <div className="stat-val">{totalStudents}</div>
              <div className="stat-label">Total Students Registered</div>
            </div>
          </div>

          {/* Actively Using */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
              <Activity size={22} />
            </div>
            <div>
              <div className="stat-val">{activeStudents}</div>
              <div className="stat-label">Actively Using Web Platform</div>
            </div>
          </div>
        </div>

        {/* TAB 1: PENDING APPROVALS FOR EMPLOYERS & INSTITUTIONS */}
        {activeTab === "pending" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Pending Registration Approvals ({totalPending})
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                When you approve or reject an applicant, an official clearance email is automatically triggered notifying them that they can sign in.
              </p>
            </div>

            {totalPending === 0 ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--gray-500)" }}>
                <CheckCircle size={40} color="#16a34a" style={{ margin: "0 auto 1rem auto" }} />
                <h4 style={{ color: "var(--gray-800)" }}>All Registrations Cleared!</h4>
                <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  There are no pending employer or institution requests requiring administrator approval at this time.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Pending Employers */}
                {pendingEmployers.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#d97706", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Briefcase size={18} /> Pending Employer Clearances ({pendingEmployers.length})
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {pendingEmployers.map((emp) => (
                        <div key={emp.id} className="card" style={{ padding: "1.5rem", borderLeft: "5px solid #d97706" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
                            <div>
                              <span className="badge badge-amber" style={{ marginBottom: "0.35rem" }}>
                                Awaiting Approval
                              </span>
                              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-900)" }}>
                                {emp.name}
                              </h3>
                              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                                {emp.industry} • 📍 {emp.location}
                              </p>
                            </div>

                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => handleApprove("employer", emp.id, emp.name)}
                                className="btn btn-success btn-sm"
                                style={{ gap: "0.35rem" }}
                              >
                                <CheckCircle size={15} /> Approve Employer
                              </button>
                              <button
                                onClick={() => handleReject("employer", emp.id, emp.name)}
                                className="btn btn-danger btn-sm"
                                style={{ gap: "0.35rem" }}
                              >
                                <XCircle size={15} /> Reject
                              </button>
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", background: "var(--gray-50)", padding: "0.85rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "var(--gray-700)" }}>
                            <div>Contact: <strong>{emp.contactPerson}</strong></div>
                            <div>Email: <strong>{emp.email}</strong></div>
                            <div>Phone: <strong>{emp.phone}</strong></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pending Institutions */}
                {pendingInstitutions.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0d9488", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Building2 size={18} /> Pending Institution Clearances ({pendingInstitutions.length})
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {pendingInstitutions.map((inst) => (
                        <div key={inst.id} className="card" style={{ padding: "1.5rem", borderLeft: "5px solid #0d9488" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
                            <div>
                              <span className="badge badge-amber" style={{ marginBottom: "0.35rem" }}>
                                Awaiting Approval
                              </span>
                              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-900)" }}>
                                {inst.name}
                              </h3>
                              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                                Code: <strong>{inst.code}</strong> • {inst.region}
                              </p>
                            </div>

                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => handleApprove("institution", inst.id, inst.name)}
                                className="btn btn-success btn-sm"
                                style={{ gap: "0.35rem" }}
                              >
                                <CheckCircle size={15} /> Approve Institution
                              </button>
                              <button
                                onClick={() => handleReject("institution", inst.id, inst.name)}
                                className="btn btn-danger btn-sm"
                                style={{ gap: "0.35rem" }}
                              >
                                <XCircle size={15} /> Reject
                              </button>
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", background: "var(--gray-50)", padding: "0.85rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "var(--gray-700)" }}>
                            <div>Dean / Principal: <strong>{inst.contactPerson}</strong></div>
                            <div>College Email: <strong>{inst.email}</strong></div>
                            <div>Accreditation: <strong>{inst.accreditation}</strong></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL EMPLOYERS DIRECTORY */}
        {activeTab === "employers" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Statewide Employer Directory ({employers.length})
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                Complete list of registered corporate and hiring partners
              </p>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Industry Sector</th>
                    <th>Contact Person</th>
                    <th>Official Email</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employers.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <strong>{emp.name}</strong>
                      </td>
                      <td>{emp.industry}</td>
                      <td>{emp.contactPerson}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{emp.email}</td>
                      <td>{emp.location}</td>
                      <td>
                        <span className={`badge ${emp.status === "approved" ? "badge-green" : emp.status === "pending" ? "badge-amber" : "badge-red"}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td>
                        {emp.status === "pending" && (
                          <button
                            onClick={() => handleApprove("employer", emp.id, emp.name)}
                            className="btn btn-success btn-sm"
                            style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                          >
                            Approve
                          </button>
                        )}
                        {emp.status === "approved" && (
                          <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALL INSTITUTIONS DIRECTORY */}
        {activeTab === "institutions" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Statewide Academic Institutions ({institutions.length})
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                Colleges, universities, and polytechnics under Karnataka Higher Education
              </p>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>College Name</th>
                    <th>Code</th>
                    <th>Region</th>
                    <th>College Email</th>
                    <th>Accreditation</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map((inst) => (
                    <tr key={inst.id}>
                      <td>
                        <strong>{inst.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{inst.contactPerson}</div>
                      </td>
                      <td><span className="badge badge-blue">{inst.code}</span></td>
                      <td>{inst.region}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{inst.email}</td>
                      <td>{inst.accreditation}</td>
                      <td>
                        <span className={`badge ${inst.status === "approved" ? "badge-green" : inst.status === "pending" ? "badge-amber" : "badge-red"}`}>
                          {inst.status}
                        </span>
                      </td>
                      <td>
                        {inst.status === "pending" && (
                          <button
                            onClick={() => handleApprove("institution", inst.id, inst.name)}
                            className="btn btn-success btn-sm"
                            style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                          >
                            Approve
                          </button>
                        )}
                        {inst.status === "approved" && (
                          <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>Verified</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CHANGE ADMIN PASSWORD */}
        {activeTab === "password" && (
          <div className="card" style={{ maxWidth: "560px", padding: "2.5rem" }}>
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                <KeyRound size={26} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Change Admin Password
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginTop: "0.25rem" }}>
                Update root credentials for admin@udyamssethu.gov.in. Changes persist across application sessions.
              </p>
            </div>

            {pwdMsg && (
              <div
                style={{
                  background: pwdMsg.startsWith("Error") ? "#fee2e2" : "#f0fdf4",
                  border: `1px solid ${pwdMsg.startsWith("Error") ? "#fca5a5" : "#bbf7d0"}`,
                  color: pwdMsg.startsWith("Error") ? "#991b1b" : "#166534",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.25rem",
                  fontSize: "0.875rem"
                }}
              >
                {pwdMsg}
              </div>
            )}

            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="Enter current password (default: admin123)"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password (Minimum 6 characters)</label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="Enter new strong password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="Confirm new password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", background: "#0f172a" }}>
                <Save size={16} /> Save New Password
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: PLATFORM WEB USAGE & AUDIT LOGS */}
        {activeTab === "activity" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              Statewide Platform Analytics & Web Traffic
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "1.75rem" }}>
              Total student activity, institutional adoption, and verified identity generation in real-time.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ background: "var(--gray-50)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                  Active Student Portal Sessions
                </h4>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1e40af" }}>
                  {activeStudents} / {totalStudents}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>
                  Students accessing AI assessment engine and placements
                </p>
              </div>

              <div style={{ background: "var(--gray-50)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                  Simulated Notification Dispatches
                </h4>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0d9488" }}>
                  {simulatedEmails.length}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>
                  Official registration approvals and notification events logged
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
