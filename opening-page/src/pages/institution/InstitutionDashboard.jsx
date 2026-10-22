import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Building2,
  Users,
  UserPlus,
  Send,
  Undo2,
  Download,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  Briefcase,
  TrendingUp,
  Search,
  CheckCircle,
  FileSpreadsheet,
  FileText,
  FileCheck,
  Edit,
  Save,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  CheckCircle2,
  Filter
} from "lucide-react";

export const InstitutionDashboard = () => {
  const {
    currentUser,
    students,
    notifications,
    campusDrives,
    addStudentByInstitution,
    updateStudentByInstitution,
    sendNotification,
    undoNotification,
    broadcastCampusDrive
  } = useApp();

  // Institution profile fallback for demo
  const instData = currentUser?.role === "institution" ? currentUser.data : {
    id: "inst-001",
    name: "HKES Poojya Doddappa Appa College of Engineering",
    code: "PDA-KLB-01",
    region: "Kalaburagi (Kalyana Karnataka)",
    email: "dean@hkespda.edu.in",
    contactPerson: "Dr. B. S. Kulkarni",
    totalStudents: 1240,
    activeStudents: 1115,
    inactiveStudents: 125,
    avgAttendance: 86.4,
    avgScore: 78.2,
    assessmentsCompleted: 3420,
    studentsAtRisk: 42,
    activityParticipation: "91%",
    placementCellHead: "Prof. Rajeshwari Patil",
    accreditation: "NAAC A+ / NBA Tier-1"
  };

  const [activeTab, setActiveTab] = useState("overview"); // overview | students | createStudent | broadcast | campusDrives | intelligence | export
  const [searchStudent, setSearchStudent] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  // Form: Create new student & email credentials
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "", // College email e.g. student@college.edu
    usn: "",
    phone: "",
    branch: "Computer Science & Engineering",
    semester: 3,
    hasWrittenExams: true,
    cgpa: 8.2,
    attendance: 88
  });

  // Form: Send notification / update
  const [notifForm, setNotifForm] = useState({
    targetStudentId: "all",
    title: "",
    message: "",
    category: "Academic & Placement"
  });

  // Form: Post campus selection drive
  const [driveForm, setDriveForm] = useState({
    companyName: "",
    packageInfo: "₹ 7.5 LPA",
    driveDate: "2026-11-25",
    venue: "Main Auditorium / Lab 4",
    eligibleBranches: "CSE, ISE, ECE",
    minAttendance: 75,
    minCgpa: 7.0
  });

  // Filter students belonging to this institution
  const collegeStudents = students.filter(
    (s) => s.institutionId === instData.id || s.institutionName === instData.name
  );

  // Institution notifications
  const sentNotifications = notifications.filter(
    (n) => n.institutionId === instData.id || n.institutionId === "inst-001"
  );

  // Handle Add Student
  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.email.includes("@")) {
      alert("Please provide a valid college domain email for the student.");
      return;
    }

    addStudentByInstitution(instData.id, newStudentForm);
    alert(`Student credentials created successfully!\nThe student can now login to the Student Portal with: ${newStudentForm.email}`);
    setNewStudentForm({
      name: "",
      email: "",
      usn: "",
      phone: "",
      branch: "Computer Science & Engineering",
      semester: 1,
      hasWrittenExams: false,
      cgpa: "",
      attendance: 85
    });
    setActiveTab("students");
  };

  // Handle Edit Student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudentByInstitution(editingStudent.id, editingStudent);
      alert("Student profile updated successfully! The student will instantly see these changes.");
      setEditingStudent(null);
    }
  };

  // Handle Send Notification
  const handleSendNotif = (e) => {
    e.preventDefault();
    sendNotification(
      instData.id,
      notifForm.targetStudentId,
      notifForm.title,
      notifForm.message,
      notifForm.category
    );
    alert("Notification sent! It is now visible in the student's dashboard.");
    setNotifForm({ targetStudentId: "all", title: "", message: "", category: "Academic & Placement" });
  };

  // Handle Undo / Reverse Notification
  const handleUndoNotif = (notifId) => {
    if (window.confirm("Are you sure you want to reverse / recall this notification from students' inboxes?")) {
      undoNotification(notifId);
      alert("Notification has been REVERSED / RECALLED successfully.");
    }
  };

  // Handle Broadcast Drive
  const handleBroadcastDrive = (e) => {
    e.preventDefault();
    broadcastCampusDrive(instData.id, driveForm);
    alert("Campus recruitment drive announced and broadcasted to students!");
    setDriveForm({
      companyName: "",
      packageInfo: "₹ 7.5 LPA",
      driveDate: "2026-11-25",
      venue: "Main Auditorium / Lab 4",
      eligibleBranches: "CSE, ISE, ECE",
      minAttendance: 75,
      minCgpa: 7.0
    });
    setActiveTab("campusDrives");
  };

  // Client-side Exporters (PDF, Excel, Word)
  const downloadExcel = () => {
    const headers = ["ID", "Name", "USN", "College Email", "Branch", "Semester", "CGPA", "Attendance %", "Employability Score", "Status"];
    const rows = collegeStudents.map((s) => [
      s.id,
      `"${s.name}"`,
      s.usn,
      s.email,
      `"${s.branch}"`,
      s.semester,
      s.cgpa || "Awaiting Exams",
      s.attendance,
      s.employabilityScore,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Udyam_Sethu_Students_${instData.code || "Col"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWordDoc = () => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Udyam Sethu Student Report</title></head>
      <body>
        <h1>${instData.name} - Student Performance Dossier</h1>
        <p><strong>Code:</strong> ${instData.code} | <strong>Region:</strong> ${instData.region}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <table border="1" cellspacing="0" cellpadding="5">
          <tr style="background:#e2e8f0;">
            <th>Name</th><th>USN</th><th>Official Email</th><th>Branch</th><th>Sem</th><th>CGPA</th><th>Attendance</th><th>AI Score</th>
          </tr>
          ${collegeStudents.map((s) => `
            <tr>
              <td>${s.name}</td>
              <td>${s.usn}</td>
              <td>${s.email}</td>
              <td>${s.branch}</td>
              <td>${s.semester}</td>
              <td>${s.cgpa || "Awaiting"}</td>
              <td>${s.attendance}%</td>
              <td>${s.employabilityScore}/100</td>
            </tr>
          `).join("")}
        </table>
      </body>
      </html>
    `;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Udyam_Sethu_Students_${instData.code || "Col"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const printPdf = () => {
    window.print();
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar with all required navigation tabs */}
      <aside className="dashboard-sidebar">
        <div>
          {/* Institution Header Card */}
          <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)", border: "1px solid #99f6e4", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#0d9488", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                {instData.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#134e4a", lineHeight: 1.2 }}>
                  {instData.name}
                </h4>
                <span className="badge badge-green" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                  {instData.code} • {instData.accreditation}
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#0f766e" }}>
              Placement Head: <strong>{instData.placementCellHead}</strong>
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              <Users size={18} />
              <span>Student Management ({collegeStudents.length})</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "createStudent" ? "active" : ""}`}
              onClick={() => setActiveTab("createStudent")}
            >
              <UserPlus size={18} />
              <span>Assign College Email / Login</span>
              <span className="badge badge-blue" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                Add
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "broadcast" ? "active" : ""}`}
              onClick={() => setActiveTab("broadcast")}
            >
              <Megaphone size={18} />
              <span>Updates & Undo (Reverse)</span>
              {sentNotifications.filter((n) => !n.isReversed).length > 0 && (
                <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                  {sentNotifications.filter((n) => !n.isReversed).length}
                </span>
              )}
            </button>

            <button
              className={`sidebar-item ${activeTab === "campusDrives" ? "active" : ""}`}
              onClick={() => setActiveTab("campusDrives")}
            >
              <Briefcase size={18} />
              <span>Campus Selection Drives</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "intelligence" ? "active" : ""}`}
              onClick={() => setActiveTab("intelligence")}
            >
              <Award size={18} />
              <span>Institutional Intelligence</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "export" ? "active" : ""}`}
              onClick={() => setActiveTab("export")}
            >
              <Download size={18} />
              <span>Download Reports (PDF/XLS/DOC)</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-user-card">
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-900)" }}>
            {instData.contactPerson}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
            {instData.email}
          </p>
          <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem" }}>
            <CheckCircle2 size={12} /> NAAC Verified Institution
          </span>
        </div>
      </aside>

      {/* Main Body */}
      <main className="dashboard-body">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
              Institution Employability Operating System
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--gray-600)" }}>
              {instData.name} • {instData.region}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => setActiveTab("createStudent")}
              className="btn btn-primary btn-sm"
              style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}
            >
              <UserPlus size={16} />
              <span>Generate Student Login</span>
            </button>
            <button onClick={() => setActiveTab("broadcast")} className="btn btn-secondary btn-sm">
              <Megaphone size={16} />
              <span>Broadcast Update</span>
            </button>
          </div>
        </div>

        {/* 8 Required Key Metrics Grid */}
        <div className="stats-grid">
          {/* 1. Total Students */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dbeafe", color: "#1e40af" }}>
              <Users size={22} />
            </div>
            <div>
              <div className="stat-val">{collegeStudents.length || instData.totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>

          {/* 2. Active Students */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="stat-val">{collegeStudents.filter((s) => s.status === "Active").length || instData.activeStudents}</div>
              <div className="stat-label">Active Students</div>
            </div>
          </div>

          {/* 3. Average Attendance */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
              <Calendar size={22} />
            </div>
            <div>
              <div className="stat-val">{instData.avgAttendance}%</div>
              <div className="stat-label">Avg Attendance</div>
            </div>
          </div>

          {/* 4. Average Score */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f3e8ff", color: "#7c3aed" }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="stat-val">{instData.avgScore} / 100</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>

          {/* 5. Inactive Students */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f1f5f9", color: "#64748b" }}>
              <Users size={22} />
            </div>
            <div>
              <div className="stat-val">{instData.inactiveStudents}</div>
              <div className="stat-label">Inactive Students</div>
            </div>
          </div>

          {/* 6. Assessments Completed */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#ccfbf1", color: "#0d9488" }}>
              <FileCheck size={22} />
            </div>
            <div>
              <div className="stat-val">{instData.assessmentsCompleted}</div>
              <div className="stat-label">Assessments Done</div>
            </div>
          </div>

          {/* 7. Students at Risk */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <div className="stat-val">{collegeStudents.filter((s) => s.atRisk).length || instData.studentsAtRisk}</div>
              <div className="stat-label">Students at Risk (&lt;75%)</div>
            </div>
          </div>

          {/* 8. Activity Participation */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef9c3", color: "#ca8a04" }}>
              <Award size={22} />
            </div>
            <div>
              <div className="stat-val">{instData.activityParticipation}</div>
              <div className="stat-label">Activity Participation</div>
            </div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Quick Action Banner */}
            <div className="card" style={{ padding: "1.75rem", background: "linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)", color: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span className="badge" style={{ background: "rgba(255, 255, 255, 0.2)", color: "#ffffff", marginBottom: "0.5rem" }}>
                    Student Onboarding Engine
                  </span>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                    Official College Email Credential Provisioning
                  </h3>
                  <p style={{ fontSize: "0.875rem", opacity: 0.9, maxWidth: "600px" }}>
                    Students can ONLY sign in with the official email created by your institution. Create individual credentials or bulk sync to allow students access to their AI dashboards.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={() => setActiveTab("createStudent")} className="btn btn-secondary" style={{ fontWeight: 700 }}>
                    <UserPlus size={16} /> Assign Student Email
                  </button>
                  <button onClick={() => setActiveTab("broadcast")} className="btn btn-primary" style={{ background: "#f59e0b", color: "#000000" }}>
                    <Megaphone size={16} /> Send Update
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Students Table Preview */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)" }}>
                    Registered Students & Credentials
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                    Showing students registered under {instData.name}
                  </p>
                </div>
                <button onClick={() => setActiveTab("students")} className="btn btn-secondary btn-sm">
                  View All ({collegeStudents.length})
                </button>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student Name / USN</th>
                      <th>College Assigned Email</th>
                      <th>Branch & Sem</th>
                      <th>CGPA</th>
                      <th>Attendance</th>
                      <th>AI Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeStudents.map((std) => (
                      <tr key={std.id}>
                        <td>
                          <strong>{std.name}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{std.usn}</div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#1e40af", fontWeight: 600 }}>
                            {std.email}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.85rem" }}>{std.branch}</div>
                          <span className="badge badge-blue" style={{ fontSize: "0.65rem" }}>
                            Sem {std.semester}
                          </span>
                        </td>
                        <td>
                          <strong style={{ color: std.cgpa ? "inherit" : "#64748b" }}>
                            {std.cgpa ? std.cgpa : "Awaiting Exams (1st Sem)"}
                          </strong>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: std.attendance >= 75 ? "#16a34a" : "#dc2626" }}>
                            {std.attendance}%
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-amber" style={{ fontWeight: 800 }}>
                            {std.employabilityScore}/100
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${std.atRisk ? "badge-red" : "badge-green"}`}>
                            {std.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT MANAGEMENT & EDITING */}
        {activeTab === "students" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                  All Registered Students & Records
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                  Edit student information, academic marks, attendance and college login emails
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setActiveTab("createStudent")} className="btn btn-primary btn-sm" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
                  <UserPlus size={15} /> Add Student
                </button>
                <button onClick={downloadExcel} className="btn btn-secondary btn-sm">
                  <FileSpreadsheet size={15} color="#16a34a" /> Export Excel
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="card" style={{ padding: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Search size={18} color="var(--gray-400)" />
              <input
                type="text"
                placeholder="Search student by name, USN, or assigned email..."
                style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
              />
            </div>

            {/* Students Table */}
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Name & USN</th>
                    <th>Institution Email (Login)</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>CGPA</th>
                    <th>Attendance</th>
                    <th>Risk Alert</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collegeStudents
                    .filter((s) =>
                      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
                      s.usn.toLowerCase().includes(searchStudent.toLowerCase()) ||
                      s.email.toLowerCase().includes(searchStudent.toLowerCase())
                    )
                    .map((std) => (
                      <tr key={std.id}>
                        <td>
                          <strong>{std.name}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{std.usn}</div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#1e40af" }}>
                            {std.email}
                          </span>
                        </td>
                        <td>{std.branch}</td>
                        <td>
                          <span className="badge badge-blue">Sem {std.semester}</span>
                        </td>
                        <td>
                          <strong>
                            {std.cgpa ? std.cgpa : <span style={{ color: "var(--gray-500)", fontStyle: "italic" }}>1st Sem (No exams)</span>}
                          </strong>
                        </td>
                        <td>
                          <strong style={{ color: std.attendance >= 75 ? "#16a34a" : "#dc2626" }}>
                            {std.attendance}%
                          </strong>
                        </td>
                        <td>
                          {std.atRisk ? (
                            <span className="badge badge-red" style={{ gap: "0.2rem" }}>
                              <AlertTriangle size={12} /> At Risk (&lt;75%)
                            </span>
                          ) : (
                            <span className="badge badge-green">Normal</span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => setEditingStudent(std)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem", gap: "0.3rem" }}
                          >
                            <Edit size={13} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal: Edit Student Records */}
            {editingStudent && (
              <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                    Edit Student Records: {editingStudent.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "1.5rem" }}>
                    Updates will immediately sync to the student's dashboard view.
                  </p>

                  <form onSubmit={handleUpdateStudent}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingStudent.name}
                          onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Official College Email</label>
                        <input
                          type="email"
                          className="form-input"
                          value={editingStudent.email}
                          onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Current Semester</label>
                        <select
                          className="form-input"
                          value={editingStudent.semester}
                          onChange={(e) => setEditingStudent({ ...editingStudent, semester: Number(e.target.value) })}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Written IA / Sem Exams?</label>
                        <select
                          className="form-input"
                          value={editingStudent.hasWrittenExams ? "yes" : "no"}
                          onChange={(e) => setEditingStudent({ ...editingStudent, hasWrittenExams: e.target.value === "yes" })}
                        >
                          <option value="yes">Yes (Exams Written - CGPA shown)</option>
                          <option value="no">No (1st Sem - CGPA hidden)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">CGPA (Visible only if exams written)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-input"
                          disabled={editingStudent.semester === 1 && !editingStudent.hasWrittenExams}
                          value={editingStudent.cgpa || ""}
                          onChange={(e) => setEditingStudent({ ...editingStudent, cgpa: Number(e.target.value) })}
                          placeholder={editingStudent.semester === 1 && !editingStudent.hasWrittenExams ? "CGPA hidden for 1st sem" : "e.g. 8.75"}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Attendance Percentage (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          className="form-input"
                          value={editingStudent.attendance}
                          onChange={(e) => setEditingStudent({ ...editingStudent, attendance: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                      <button type="button" onClick={() => setEditingStudent(null)} className="btn btn-secondary">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ background: "#0d9488" }}>
                        <Save size={16} /> Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CREATE STUDENT & ASSIGN COLLEGE EMAIL */}
        {activeTab === "createStudent" && (
          <div className="card" style={{ maxWidth: "720px", padding: "2.5rem" }}>
            <div style={{ marginBottom: "1.75rem" }}>
              <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
                Credential Generator
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Provision Official Student College Email & Access
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginTop: "0.25rem" }}>
                The student can only log into the Student Portal using this institution email.
              </p>
            </div>

            <form onSubmit={handleCreateStudent}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Rahul Kulkarni"
                    value={newStudentForm.name}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">University Seat Number (USN) *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. 3PD23CS089"
                    value={newStudentForm.usn}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, usn: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official College Email (Login ID) *</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="student.name@college.edu.in"
                    value={newStudentForm.email}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Engineering Branch *</label>
                  <select
                    className="form-input"
                    value={newStudentForm.branch}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, branch: e.target.value })}
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Information Science & Engineering">Information Science & Engineering</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical & Electronics">Electrical & Electronics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Semester *</label>
                  <select
                    className="form-input"
                    value={newStudentForm.semester}
                    onChange={(e) => {
                      const sem = Number(e.target.value);
                      setNewStudentForm({
                        ...newStudentForm,
                        semester: sem,
                        hasWrittenExams: sem > 1
                      });
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Written IA / Sem Exams?</label>
                  <select
                    className="form-input"
                    value={newStudentForm.hasWrittenExams ? "yes" : "no"}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, hasWrittenExams: e.target.value === "yes" })}
                  >
                    <option value="yes">Yes (CGPA will be visible)</option>
                    <option value="no">No (1st Sem: CGPA hidden per rule)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Initial CGPA (If exams written)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    disabled={!newStudentForm.hasWrittenExams}
                    placeholder={!newStudentForm.hasWrittenExams ? "CGPA hidden for 1st sem" : "e.g. 8.5"}
                    value={newStudentForm.cgpa}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, cgpa: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Attendance Percentage (%) *</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    required
                    placeholder="85"
                    value={newStudentForm.attendance}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, attendance: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Student Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 91104 00000"
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: "#f0fdfa", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid #99f6e4", marginTop: "1rem", marginBottom: "1.5rem", fontSize: "0.825rem", color: "#134e4a" }}>
                🔒 <strong>Student Authentication Note:</strong> Once assigned, this student can immediately navigate to the Student Portal and sign in directly using this official email.
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
                  <UserPlus size={16} /> Create Student Credentials
                </button>
                <button type="button" onClick={() => setActiveTab("students")} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: BROADCAST UPDATES & UNDO / REVERSE NOTIFICATIONS */}
        {activeTab === "broadcast" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}>
              {/* Send Form */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                  Send Update to Students
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "1.5rem" }}>
                  Notify an individual student or broadcast to the entire college. You can reverse any notification anytime!
                </p>

                <form onSubmit={handleSendNotif}>
                  <div className="form-group">
                    <label className="form-label">Target Audience</label>
                    <select
                      className="form-input"
                      value={notifForm.targetStudentId}
                      onChange={(e) => setNotifForm({ ...notifForm, targetStudentId: e.target.value })}
                    >
                      <option value="all">📢 All Students in Institution (Broadcast)</option>
                      {collegeStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          👤 {s.name} ({s.usn} - {s.branch})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-input"
                      value={notifForm.category}
                      onChange={(e) => setNotifForm({ ...notifForm, category: e.target.value })}
                    >
                      <option value="Placement">Campus Placement & Drives</option>
                      <option value="Academic">Internal Assessment & Exams</option>
                      <option value="Training">Technical Upskilling & Workshop</option>
                      <option value="Attendance">Attendance & Mentorship Counseling</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notification Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Mandatory Pre-Placement Mock Interview"
                      value={notifForm.title}
                      onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details *</label>
                    <textarea
                      rows={4}
                      className="form-input"
                      required
                      placeholder="Write the full instructions or updates for the student..."
                      value={notifForm.message}
                      onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", background: "#0d9488" }}>
                    <Send size={16} /> Send Notification to Students
                  </button>
                </form>
              </div>

              {/* History with UNDO / REVERSE */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-900)" }}>
                      Dispatched Notifications & Reversal Center
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                      Every update sent to students can be recalled or reversed here
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {sentNotifications.map((notif) => {
                    const recipient = notif.targetStudentId === "all"
                      ? "All Students (Broadcast)"
                      : collegeStudents.find((s) => s.id === notif.targetStudentId)?.name || "Target Student";

                    return (
                      <div
                        key={notif.id}
                        className="card"
                        style={{
                          padding: "1.25rem",
                          borderLeft: `5px solid ${notif.isReversed ? "#dc2626" : "#0d9488"}`,
                          background: notif.isReversed ? "#fef2f2" : "#ffffff"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <div>
                            <span className={`badge ${notif.isReversed ? "badge-red" : "badge-green"}`} style={{ marginBottom: "0.35rem" }}>
                              {notif.isReversed ? "Reversed / Revoked" : notif.category}
                            </span>
                            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: notif.isReversed ? "#991b1b" : "var(--gray-900)", textDecoration: notif.isReversed ? "line-through" : "none" }}>
                              {notif.title}
                            </h4>
                            <p style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>
                              Recipient: <strong>{recipient}</strong>
                            </p>
                          </div>

                          {!notif.isReversed && (
                            <button
                              onClick={() => handleUndoNotif(notif.id)}
                              className="btn btn-danger btn-sm"
                              style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", gap: "0.35rem" }}
                              title="Reverse / Recall this notification from the student's dashboard"
                            >
                              <Undo2 size={13} />
                              <span>Undo / Reverse</span>
                            </button>
                          )}
                        </div>

                        <p style={{ fontSize: "0.85rem", color: notif.isReversed ? "#7f1d1d" : "var(--gray-700)", lineHeight: 1.5, background: notif.isReversed ? "#fee2e2" : "var(--gray-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)" }}>
                          {notif.message}
                        </p>

                        <div style={{ fontSize: "0.725rem", color: "var(--gray-400)", marginTop: "0.5rem" }}>
                          Sent at: {new Date(notif.sentAt).toLocaleString()}
                          {notif.isReversed && ` • Revoked at: ${new Date(notif.reversedAt).toLocaleString()}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CAMPUS RECRUITMENT DRIVES */}
        {activeTab === "campusDrives" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                  Company Campus Selection Drives
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                  Organize and broadcast company hiring drives to eligible students
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }}>
              {/* Drives List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {campusDrives.map((drive) => (
                  <div key={drive.id} className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <span className="badge badge-blue" style={{ marginBottom: "0.35rem" }}>
                          {drive.status}
                        </span>
                        <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-900)" }}>
                          {drive.companyName}
                        </h4>
                      </div>
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>
                        {drive.packageInfo}
                      </span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem", color: "var(--gray-700)", margin: "0.75rem 0" }}>
                      <div>📅 <strong>Date:</strong> {drive.driveDate}</div>
                      <div>📍 <strong>Venue:</strong> {drive.venue}</div>
                      <div>🎓 <strong>Branches:</strong> {drive.eligibleBranches}</div>
                      <div>⚡ <strong>Criteria:</strong> Min {drive.minCgpa} CGPA & {drive.minAttendance}% Attn</div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#0d9488" }}>
                      <span>✓ Broadcasted to all eligible students</span>
                      <span className="badge badge-green">Open for Applications</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Broadcast Drive Form */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                  Announce New Campus Drive
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginBottom: "1.25rem" }}>
                  This will dispatch real-time alerts to students meeting eligibility.
                </p>

                <form onSubmit={handleBroadcastDrive}>
                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Bosch Global Software"
                      value={driveForm.companyName}
                      onChange={(e) => setDriveForm({ ...driveForm, companyName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Package Info / CTC</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="₹ 8.5 LPA"
                      value={driveForm.packageInfo}
                      onChange={(e) => setDriveForm({ ...driveForm, packageInfo: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Drive Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={driveForm.driveDate}
                      onChange={(e) => setDriveForm({ ...driveForm, driveDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Venue / Online Link</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="College Auditorium / Online Test"
                      value={driveForm.venue}
                      onChange={(e) => setDriveForm({ ...driveForm, venue: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Eligible Branches</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="CSE, ISE, ECE"
                      value={driveForm.eligibleBranches}
                      onChange={(e) => setDriveForm({ ...driveForm, eligibleBranches: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", background: "#0d9488" }}>
                    Broadcast Drive to Students
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INSTITUTIONAL INTELLIGENCE */}
        {activeTab === "intelligence" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Institutional Employability Intelligence
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                Department-wise skill gaps, batch readiness segmentation, and curriculum recommendations
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
              {/* Department Skill Gap */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "1rem" }}>
                  Department-Wise Skill Gap Analysis
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    { dept: "Computer Science (CSE)", readiness: 88, gap: "Cloud Orchestration (K8s)" },
                    { dept: "Information Science (ISE)", readiness: 84, gap: "CI/CD & System Design" },
                    { dept: "Electronics & Comm (ECE)", readiness: 71, gap: "Embedded Linux & Python" },
                    { dept: "Mechanical Engg", readiness: 65, gap: "CAD Automation & IoT Sensors" }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontWeight: 600 }}>{item.dept}</span>
                        <span style={{ fontWeight: 700, color: item.readiness >= 80 ? "#16a34a" : "#d97706" }}>
                          {item.readiness}% Ready
                        </span>
                      </div>
                      <div style={{ height: "6px", background: "var(--gray-200)", borderRadius: "9999px", overflow: "hidden" }}>
                        <div style={{ width: `${item.readiness}%`, height: "100%", background: item.readiness >= 80 ? "#16a34a" : "#d97706" }} />
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginTop: "0.2rem", display: "block" }}>
                        Top Gap: {item.gap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Recommendation Engine */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "1rem" }}>
                  AI Training Recommendations
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "0.85rem", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e40af" }}>
                      Hands-on Docker & Microservices Bootcamp
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#1e3a8a", marginTop: "0.2rem" }}>
                      Target: 6th Sem CSE/ISE. Addresses the 38% deficiency in containerization skills.
                    </p>
                  </div>

                  <div style={{ background: "#fef3c7", border: "1px solid #fde68a", padding: "0.85rem", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400e" }}>
                      Remedial Aptitude & Communication Sprint
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#78350f", marginTop: "0.2rem" }}>
                      Target: 42 Students at Risk. Scheduled with vernacular voice AI assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: DOWNLOAD REPORTS (PDF, EXCEL, WORD) */}
        {activeTab === "export" && (
          <div className="card" style={{ maxWidth: "680px", padding: "2.5rem" }}>
            <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              Export Student Data & Compliance Reports
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "2rem" }}>
              Download complete institution records in official PDF, Microsoft Excel, or Microsoft Word formats.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Excel Download */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", background: "var(--gray-50)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                      Microsoft Excel (.CSV / .XLS)
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                      Includes USN, Name, College Email, Branch, CGPA, Attendance, and Employability scores.
                    </p>
                  </div>
                </div>
                <button onClick={downloadExcel} className="btn btn-success btn-sm">
                  <Download size={14} /> Download Excel
                </button>
              </div>

              {/* Word Document Download */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", background: "var(--gray-50)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#dbeafe", color: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                      Microsoft Word (.DOC)
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                      Formatted institutional dossier with NAAC accreditation details and student tables.
                    </p>
                  </div>
                </div>
                <button onClick={downloadWordDoc} className="btn btn-primary btn-sm">
                  <Download size={14} /> Download Word
                </button>
              </div>

              {/* Printable PDF */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", background: "var(--gray-50)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                      Printable PDF Dossier
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                      Generate high-resolution printable document for university inspection & accreditation.
                    </p>
                  </div>
                </div>
                <button onClick={printPdf} className="btn btn-secondary btn-sm">
                  <Download size={14} /> Print / Save as PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
