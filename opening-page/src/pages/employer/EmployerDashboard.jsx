import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Briefcase,
  Users,
  FileText,
  Search,
  PlusCircle,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Award,
  BookOpen,
  Calendar,
  Building,
  Target,
  QrCode,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  MapPin,
  Filter,
  Eye,
  CheckCircle2
} from "lucide-react";

export const EmployerDashboard = () => {
  const {
    currentUser,
    jobs,
    students,
    postJobByEmployer,
    updateApplicationStatus
  } = useApp();

  const navigate = useNavigate();

  // If no current user or not employer, fallback to first approved employer for demo preview
  const employerData = currentUser?.role === "employer" ? currentUser.data : {
    id: "emp-001",
    name: "Tata Elxsi Industrial Automation Hub",
    industry: "Automotive, Embedded & AI",
    contactPerson: "Siddharth Verma",
    email: "careers@tataelxsi.com",
    phone: "+91 80 2297 9100",
    location: "Hubballi / Bengaluru",
    branding: {
      tagline: "Engineering Next-Gen Smart Mobility and IoT Systems",
      logoColor: "#0284c7",
      website: "https://www.tataelxsi.com"
    }
  };

  const [activeTab, setActiveTab] = useState("applications"); // applications | jobs | talentSearch | postJob
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  // Post Job form state
  const [newJob, setNewJob] = useState({
    title: "",
    type: "Full-Time",
    roleCategory: "Software & Technology",
    location: employerData.location || "Bengaluru / Hubballi",
    stipendOrSalary: "₹ 7.0 - 9.5 LPA",
    eligibility: "B.E / B.Tech (CSE, ISE, ECE)",
    minCgpa: 7.0,
    requiredSkills: "React.js, Node.js, Python, SQL",
    description: "",
    deadline: "2026-11-30"
  });

  // Calculate applications received for this employer's jobs
  const employerJobs = jobs.filter((j) => j.employerId === employerData.id || j.employerName === employerData.name);
  
  // Aggregate all applicants across all jobs posted by this employer
  const allApplications = employerJobs.flatMap((job) =>
    (job.applicants || []).map((app) => {
      const studentDetails = students.find((s) => s.id === app.studentId);
      return {
        ...app,
        jobId: job.id,
        jobTitle: job.title,
        student: studentDetails
      };
    })
  );

  const handlePostJob = (e) => {
    e.preventDefault();
    postJobByEmployer(employerData.id, newJob);
    alert("Job vacancy posted successfully! It is now visible to all eligible Karnataka students.");
    setActiveTab("jobs");
  };

  const handleStatusChange = (jobId, studentId, newStatus) => {
    updateApplicationStatus(jobId, studentId, newStatus);
    if (selectedCandidate && selectedCandidate.studentId === studentId) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Filtered talent pool search
  const filteredStudents = students.filter((std) => {
    const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.branch.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (skillFilter === "all") return matchesSearch;
    const matchesSkill = std.skills.some((s) => s.name.toLowerCase().includes(skillFilter.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          {/* Company Branding Card */}
          <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "1px solid #fde68a", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: employerData.branding?.logoColor || "#d97706", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                {employerData.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#78350f", lineHeight: 1.2 }}>
                  {employerData.name}
                </h4>
                <span className="badge badge-amber" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                  Verified Employer
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#92400e", fontStyle: "italic", lineHeight: 1.4 }}>
              "{employerData.branding?.tagline || "Innovating talent ecosystems"}"
            </p>
            {employerData.branding?.website && (
              <a
                href={employerData.branding.website}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "0.75rem", color: "#b45309", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.4rem", fontWeight: 600 }}
              >
                <span>Visit Corporate Site</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "applications" ? "active" : ""}`}
              onClick={() => { setActiveTab("applications"); setSelectedCandidate(null); }}
            >
              <Users size={18} />
              <span>Applications Received</span>
              {allApplications.length > 0 && (
                <span className="badge badge-amber" style={{ marginLeft: "auto", fontSize: "0.7rem" }}>
                  {allApplications.length}
                </span>
              )}
            </button>

            <button
              className={`sidebar-item ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => { setActiveTab("jobs"); setSelectedCandidate(null); }}
            >
              <Briefcase size={18} />
              <span>Manage Job Postings ({employerJobs.length})</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "postJob" ? "active" : ""}`}
              onClick={() => { setActiveTab("postJob"); setSelectedCandidate(null); }}
            >
              <PlusCircle size={18} />
              <span>Post New Vacancy / Intern</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "talentSearch" ? "active" : ""}`}
              onClick={() => { setActiveTab("talentSearch"); setSelectedCandidate(null); }}
            >
              <Search size={18} />
              <span>Verified Talent Search</span>
              <span className="badge badge-blue" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                AI Match
              </span>
            </button>
          </nav>
        </div>

        <div className="sidebar-user-card">
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-900)" }}>
            {employerData.contactPerson}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
            {employerData.email}
          </p>
          <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
            Account Approved & Active
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-body">
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
              Employer Intelligence & Hiring Dashboard
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--gray-600)" }}>
              {employerData.name} • {employerData.location}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => setActiveTab("postJob")}
              className="btn btn-primary btn-sm"
              style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}
            >
              <PlusCircle size={16} />
              <span>Post New Role</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div className="stat-val">{employerJobs.length}</div>
              <div className="stat-label">Active Vacancies</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dbeafe", color: "#1e40af" }}>
              <Users size={22} />
            </div>
            <div>
              <div className="stat-val">{allApplications.length}</div>
              <div className="stat-label">Total Applicants</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
              <Target size={22} />
            </div>
            <div>
              <div className="stat-val">93.4%</div>
              <div className="stat-label">Avg AI Competency Match</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f3e8ff", color: "#7c3aed" }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="stat-val">{students.length}</div>
              <div className="stat-label">Verified Regional Pool</div>
            </div>
          </div>
        </div>

        {/* TAB 1: APPLICATIONS RECEIVED & CANDIDATE DETAILS */}
        {activeTab === "applications" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                  Candidates Applications & Portfolios
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                  Review verified student profiles, attendance, academic records, certificates & AI match scores
                </p>
              </div>
            </div>

            {allApplications.length === 0 ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--gray-500)" }}>
                <Users size={40} style={{ margin: "0 auto 1rem auto", opacity: 0.3 }} />
                <h4>No applications received yet</h4>
                <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  Post vacancies to attract verified talent from top colleges across Karnataka.
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: selectedCandidate ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
                {/* Applications List */}
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Job Applied</th>
                        <th>AI Fit Score</th>
                        <th>CGPA / Sem</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApplications.map((app, idx) => (
                        <tr
                          key={idx}
                          style={{
                            background: selectedCandidate?.studentId === app.studentId ? "#f0fdfa" : "inherit",
                            cursor: "pointer"
                          }}
                          onClick={() => setSelectedCandidate(app)}
                        >
                          <td>
                            <div>
                              <strong style={{ color: "var(--gray-900)" }}>
                                {app.student?.name || app.studentName}
                              </strong>
                              <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
                                {app.student?.institutionName}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{app.jobTitle}</span>
                          </td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                background: app.fitScore >= 90 ? "#dcfce7" : "#fef3c7",
                                color: app.fitScore >= 90 ? "#15803d" : "#b45309",
                                fontWeight: 800
                              }}
                            >
                              <Sparkles size={12} /> {app.fitScore}% Fit
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                              {app.student?.cgpa ? `${app.student.cgpa} CGPA` : "Awaiting Exams"}
                            </span>
                            <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>
                              Sem {app.student?.semester}
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                app.status === "Interview Scheduled"
                                  ? "badge-green"
                                  : app.status === "Shortlisted"
                                  ? "badge-blue"
                                  : "badge-amber"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: "0.75rem", gap: "0.25rem" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCandidate(app);
                              }}
                            >
                              <Eye size={13} />
                              <span>View Portfolio</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Detailed Candidate Portfolio View Panel */}
                {selectedCandidate && selectedCandidate.student && (
                  <div className="card animate-fade-in" style={{ padding: "1.75rem", maxHeight: "80vh", overflowY: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--gray-200)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)" }}>
                            {selectedCandidate.student.name}
                          </h3>
                          <span className="badge badge-green">
                            <CheckCircle2 size={12} /> Verified Identity
                          </span>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                          {selectedCandidate.student.branch} • {selectedCandidate.student.institutionName}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                          USN: {selectedCandidate.student.usn} • Email: {selectedCandidate.student.email}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedCandidate(null)}
                        style={{ color: "var(--gray-400)", padding: "0.25rem" }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* AI Competency Fit Callout */}
                    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#166534", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Sparkles size={16} /> AI Match & Competency Fit: {selectedCandidate.fitScore}%
                        </span>
                        <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>
                          High Potential Fit
                        </span>
                      </div>
                      <p style={{ fontSize: "0.825rem", color: "#14532d", lineHeight: 1.5 }}>
                        {selectedCandidate.fitReason}
                      </p>
                    </div>

                    {/* Core Student Metrics */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                      <div style={{ background: "var(--gray-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--gray-200)" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 600 }}>ATTENDANCE</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: selectedCandidate.student.attendance >= 75 ? "#16a34a" : "#dc2626" }}>
                          {selectedCandidate.student.attendance}%
                        </div>
                      </div>

                      <div style={{ background: "var(--gray-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--gray-200)" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 600 }}>ACADEMIC CGPA</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--gray-900)" }}>
                          {selectedCandidate.student.cgpa || "1st Sem"}
                        </div>
                      </div>

                      <div style={{ background: "var(--gray-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--gray-200)" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 600 }}>EMPLOYABILITY</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e40af" }}>
                          {selectedCandidate.student.employabilityScore}/100
                        </div>
                      </div>
                    </div>

                    {/* Verified Skills */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: "0.6rem" }}>
                        Verified Skills & Proficiency
                      </h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {selectedCandidate.student.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              background: "#ffffff",
                              border: "1px solid var(--gray-200)",
                              padding: "0.4rem 0.65rem",
                              borderRadius: "var(--radius-sm)",
                              fontSize: "0.8rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem"
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{skill.name}</span>
                            <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 700 }}>
                              {skill.score}%
                            </span>
                            {skill.verified && <CheckCircle size={12} color="#16a34a" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resume Bio & Projects */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: "0.4rem" }}>
                        Candidate Summary & Projects
                      </h4>
                      <p style={{ fontSize: "0.825rem", color: "var(--gray-600)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                        {selectedCandidate.student.resumeDetails?.bio}
                      </p>

                      {selectedCandidate.student.resumeDetails?.projects?.map((proj, pIdx) => (
                        <div key={pIdx} style={{ background: "var(--gray-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)", marginBottom: "0.5rem", border: "1px solid var(--gray-200)" }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-900)" }}>
                            {proj.title}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>
                            Tech: {proj.tech}
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "var(--gray-600)", marginTop: "0.25rem" }}>
                            {proj.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Certificates */}
                    {selectedCandidate.student.certificates?.length > 0 && (
                      <div style={{ marginBottom: "1.5rem" }}>
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: "0.5rem" }}>
                          Verified Certifications
                        </h4>
                        {selectedCandidate.student.certificates.map((cert, cIdx) => (
                          <div key={cIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--gray-700)", marginBottom: "0.35rem" }}>
                            <Award size={14} color="#d97706" />
                            <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hiring Actions */}
                    <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "1.25rem" }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                        Update Application Status
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleStatusChange(selectedCandidate.jobId, selectedCandidate.studentId, "Shortlisted")}
                          className="btn btn-sm btn-secondary"
                          style={{ background: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe" }}
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedCandidate.jobId, selectedCandidate.studentId, "Interview Scheduled")}
                          className="btn btn-sm btn-primary"
                          style={{ background: "#059669" }}
                        >
                          Schedule Interview
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedCandidate.jobId, selectedCandidate.studentId, "Hired / Selected")}
                          className="btn btn-sm btn-success"
                        >
                          Mark as Hired
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedCandidate.jobId, selectedCandidate.studentId, "Rejected")}
                          className="btn btn-sm btn-secondary"
                          style={{ color: "#dc2626" }}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE JOB POSTINGS */}
        {activeTab === "jobs" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                  Current Vacancies & Campus Drives
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                  Postings created by {employerData.name}
                </p>
              </div>
              <button onClick={() => setActiveTab("postJob")} className="btn btn-primary btn-sm" style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                <PlusCircle size={15} /> Post New Vacancy
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {employerJobs.map((job) => (
                <div key={job.id} className="card" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span className="badge badge-amber">{job.type}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>Deadline: {job.deadline}</span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0.35rem" }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "0.75rem" }}>
                    {job.location} • <strong style={{ color: "#16a34a" }}>{job.stipendOrSalary}</strong>
                  </p>
                  <p style={{ fontSize: "0.825rem", color: "var(--gray-600)", lineHeight: 1.5, marginBottom: "1rem" }}>
                    {job.description}
                  </p>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", marginBottom: "0.35rem" }}>
                      REQUIRED SKILLS:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {job.requiredSkills.map((sk, idx) => (
                        <span key={idx} className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e40af" }}>
                      👥 {job.applicants?.length || 0} Candidates Applied
                    </span>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      View Candidates
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: POST NEW VACANCY FORM */}
        {activeTab === "postJob" && (
          <div className="card" style={{ maxWidth: "750px", padding: "2.5rem" }}>
            <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              Create New Job Vacancy / Internship
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1.75rem" }}>
              Specify role competency requirements. Our AI will automatically score Karnataka students against these parameters.
            </p>

            <form onSubmit={handlePostJob}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Job / Internship Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Graduate Software Engineer (Full Stack)"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-input"
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time (Graduate Trainee)</option>
                    <option value="Internship (6 Months + PPO)">Internship (6 Months + PPO)</option>
                    <option value="Apprenticeship (NATS)">Apprenticeship (NATS)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Role Category</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Cloud & AI / Embedded"
                    value={newJob.roleCategory}
                    onChange={(e) => setNewJob({ ...newJob, roleCategory: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Compensation / Salary (LPA / Stipend)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ₹ 7.5 - 9.0 LPA"
                    value={newJob.stipendOrSalary}
                    onChange={(e) => setNewJob({ ...newJob, stipendOrSalary: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bengaluru / Kalaburagi / Remote"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum CGPA Requirement</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="7.0"
                    value={newJob.minCgpa}
                    onChange={(e) => setNewJob({ ...newJob, minCgpa: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Application Deadline</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Required Skills (Comma separated for AI Match) *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. React.js, Python, SQL, Cloud Basics"
                    value={newJob.requiredSkills}
                    onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginTop: "0.25rem", display: "block" }}>
                    💡 The AI Employability Engine will compare student verified competencies with these exact skills.
                  </span>
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Job Description & Responsibilities</label>
                  <textarea
                    rows={4}
                    className="form-input"
                    required
                    placeholder="Describe core project responsibilities, technologies used, and career growth..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                  <span>Publish Job Vacancy to Karnataka Colleges</span>
                  <ArrowRight size={16} />
                </button>
                <button type="button" onClick={() => setActiveTab("jobs")} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: VERIFIED TALENT SEARCH */}
        {activeTab === "talentSearch" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Verified Digital Workforce Talent Pool
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                Filter across verified students in Kalyana Karnataka and statewide colleges
              </p>
            </div>

            {/* Filter Bar */}
            <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: "240px", display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--gray-50)", padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)" }}>
                <Search size={18} color="var(--gray-400)" />
                <input
                  type="text"
                  placeholder="Search by student name, college or branch..."
                  style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "0.9rem" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Filter size={16} color="var(--gray-500)" />
                <select
                  className="form-input"
                  style={{ width: "auto", padding: "0.5rem 0.85rem" }}
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                >
                  <option value="all">All Skills</option>
                  <option value="React">React.js</option>
                  <option value="Python">Python / Data Science</option>
                  <option value="Embedded">Embedded Systems</option>
                  <option value="Cloud">Cloud / AWS</option>
                </select>
              </div>
            </div>

            {/* Talent Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {filteredStudents.map((std) => (
                <div key={std.id} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span className="badge badge-green">
                        <CheckCircle2 size={12} /> Verified Identity
                      </span>
                      <span className="badge badge-blue" style={{ fontWeight: 800 }}>
                        {std.employabilityScore}/100 Score
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)" }}>
                      {std.name}
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-600)", marginBottom: "0.5rem" }}>
                      {std.branch} • {std.institutionName}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--gray-700)", marginBottom: "1rem" }}>
                      <span>CGPA: <strong>{std.cgpa ? std.cgpa : "Awaiting Exams"}</strong></span>
                      <span>Attendance: <strong>{std.attendance}%</strong></span>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", marginBottom: "0.35rem" }}>
                        TOP VERIFIED SKILLS:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                        {std.skills.slice(0, 3).map((sk, sIdx) => (
                          <span key={sIdx} className="badge badge-amber" style={{ fontSize: "0.7rem" }}>
                            {sk.name} ({sk.score}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCandidate({
                        studentId: std.id,
                        student: std,
                        fitScore: std.employabilityScore,
                        fitReason: "Direct profile inspection from statewide verified talent database."
                      });
                      setActiveTab("applications");
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    View Complete Verified Dossier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
