import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  GraduationCap,
  Sparkles,
  QrCode,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Briefcase,
  BookOpen,
  Calendar,
  Award,
  Bell,
  Users,
  Target,
  FileText,
  Bot,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Mic,
  Volume2,
  Undo2,
  Download,
  Building,
  MapPin
} from "lucide-react";

export const StudentDashboard = () => {
  const {
    currentUser,
    students,
    notifications,
    campusDrives,
    jobs,
    applyToJob,
    language
  } = useApp();

  const navigate = useNavigate();

  // If current logged-in user is student, use their data; else fallback to Rahul Kulkarni for demo
  const studentData = currentUser?.role === "student" ? currentUser.data : students[0];

  const [activeTab, setActiveTab] = useState("overview"); // overview | employability | identity | academics | jobs | assessments | resume | alumni
  const [appliedJobs, setAppliedJobs] = useState({});
  const [resumeBio, setResumeBio] = useState(studentData.resumeDetails?.bio || "");
  const [mockInterviewFeedback, setMockInterviewFeedback] = useState(null);
  const [isInterviewing, setIsInterviewing] = useState(false);

  // Filter notifications sent to this specific student OR "all" students by their institution
  const studentNotifications = notifications.filter((n) => {
    const isTarget = n.targetStudentId === "all" || n.targetStudentId === studentData.id;
    const isFromCollege = n.institutionId === studentData.institutionId || n.institutionId === "inst-001";
    return isTarget && isFromCollege;
  });

  // Calculate if student has written exams (Strict rule for 1st sem CGPA hiding)
  const isFirstSemWithoutExams = Number(studentData.semester) === 1 && !studentData.hasWrittenExams;

  const handleApply = (jobId) => {
    const res = applyToJob(jobId, studentData.id);
    if (res.success) {
      setAppliedJobs((prev) => ({ ...prev, [jobId]: res.fitScore }));
      alert(`Application submitted successfully! Your AI Competency Fit Score is ${res.fitScore}%. The employer has received your verified portfolio.`);
    }
  };

  const startMockInterview = () => {
    setIsInterviewing(true);
    setMockInterviewFeedback(null);
    setTimeout(() => {
      setIsInterviewing(false);
      setMockInterviewFeedback({
        score: "89/100",
        feedback: "Excellent technical problem explanation. Demonstrated strong clarity in REST APIs and Database Indexing. To improve further, practice concise trade-off analysis between SQL and NoSQL in distributed setups.",
        recommendation: "Ready for Tata Elxsi and Bosch Technical Round 1."
      });
    }, 2000);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div>
          {/* Student Profile Card */}
          <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "1px solid #bfdbfe", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#1e40af", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem" }}>
                {studentData.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e3a8a", lineHeight: 1.2 }}>
                  {studentData.name}
                </h4>
                <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                  Sem {studentData.semester} • {studentData.usn}
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#1e40af", fontWeight: 600 }}>
              {studentData.institutionName}
            </p>
          </div>

          {/* Sidebar Menu */}
          <nav className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <Target size={18} />
              <span>Student Overview</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "employability" ? "active" : ""}`}
              onClick={() => setActiveTab("employability")}
            >
              <Sparkles size={18} />
              <span>AI Employability Engine</span>
              <span className="badge badge-blue" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                {studentData.employabilityScore}
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "identity" ? "active" : ""}`}
              onClick={() => setActiveTab("identity")}
            >
              <QrCode size={18} />
              <span>Verified Digital Identity</span>
              <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                QR
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "academics" ? "active" : ""}`}
              onClick={() => setActiveTab("academics")}
            >
              <BookOpen size={18} />
              <span>Academic Performance</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              <Briefcase size={18} />
              <span>Placements & Drives</span>
              {jobs.length > 0 && (
                <span className="badge badge-amber" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                  {jobs.length}
                </span>
              )}
            </button>

            <button
              className={`sidebar-item ${activeTab === "assessments" ? "active" : ""}`}
              onClick={() => setActiveTab("assessments")}
            >
              <Bot size={18} />
              <span>AI Mock Interview & Tests</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "resume" ? "active" : ""}`}
              onClick={() => setActiveTab("resume")}
            >
              <FileText size={18} />
              <span>Live Resume Builder</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === "alumni" ? "active" : ""}`}
              onClick={() => setActiveTab("alumni")}
            >
              <Users size={18} />
              <span>Alumni Mentorship Network</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-user-card">
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-900)" }}>
            College Issued Email:
          </p>
          <p style={{ fontSize: "0.75rem", color: "#1e40af", fontFamily: "monospace", wordBreak: "break-all" }}>
            {studentData.email}
          </p>
          <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem" }}>
            <CheckCircle2 size={12} /> Institution Verified
          </span>
        </div>
      </aside>

      {/* Main Body */}
      <main className="dashboard-body">
        {/* Top Greeting & Trend Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
              Welcome, {studentData.name} 👋
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--gray-600)" }}>
              {studentData.branch} • {studentData.institutionName}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Performance Trend Indicator as requested: increasing or decreasing */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-md)",
                background: studentData.employabilityTrendDirection === "up" ? "#dcfce7" : "#fee2e2",
                border: `1px solid ${studentData.employabilityTrendDirection === "up" ? "#86efac" : "#fca5a5"}`
              }}
            >
              {studentData.employabilityTrendDirection === "up" ? (
                <TrendingUp size={18} color="#15803d" />
              ) : (
                <TrendingDown size={18} color="#b91c1c" />
              )}
              <span style={{ fontSize: "0.825rem", fontWeight: 700, color: studentData.employabilityTrendDirection === "up" ? "#15803d" : "#b91c1c" }}>
                Trend: {studentData.employabilityTrend}
              </span>
            </div>

            <button
              onClick={() => setActiveTab("identity")}
              className="btn btn-secondary btn-sm"
              style={{ gap: "0.35rem" }}
            >
              <QrCode size={16} />
              <span>View QR ID</span>
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS RECEIVED FROM INSTITUTION (With dynamic updates & undo indicator) */}
        {studentNotifications.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Bell size={18} color="#1e40af" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Official Updates from {studentData.institutionName}
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {studentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: notif.isReversed ? "#fef2f2" : "#eff6ff",
                    border: `1px solid ${notif.isReversed ? "#fca5a5" : "#bfdbfe"}`,
                    borderLeft: `5px solid ${notif.isReversed ? "#dc2626" : "#2563eb"}`
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className={`badge ${notif.isReversed ? "badge-red" : "badge-blue"}`} style={{ fontSize: "0.65rem" }}>
                        {notif.isReversed ? "⚠️ Revoked / Reversed by Institution" : notif.category}
                      </span>
                      <strong style={{ fontSize: "0.95rem", color: notif.isReversed ? "#991b1b" : "#1e3a8a", textDecoration: notif.isReversed ? "line-through" : "none" }}>
                        {notif.title}
                      </strong>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
                      {new Date(notif.sentAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: notif.isReversed ? "#7f1d1d" : "var(--gray-700)", lineHeight: 1.5 }}>
                    {notif.isReversed
                      ? "This update has been officially reversed/cancelled by your institution placement & academic cell."
                      : notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 Quick Stat Cards */}
        <div className="stats-grid" style={{ marginBottom: "2rem" }}>
          {/* Employability Score */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dbeafe", color: "#1e40af" }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div className="stat-val">{studentData.employabilityScore} / 100</div>
              <div className="stat-label">AI Employability Score</div>
            </div>
          </div>

          {/* CGPA with 1st SEMESTER HIDING RULE */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
              <Award size={22} />
            </div>
            <div>
              <div className="stat-val" style={{ fontSize: isFirstSemWithoutExams ? "1.05rem" : "1.65rem", color: isFirstSemWithoutExams ? "#92400e" : "var(--gray-900)" }}>
                {isFirstSemWithoutExams ? (
                  <span>First Semester (Awaiting IA/Sem Results)</span>
                ) : (
                  <span>{studentData.cgpa} CGPA</span>
                )}
              </div>
              <div className="stat-label">
                {isFirstSemWithoutExams ? "CGPA Status" : "Current Cumulative GPA"}
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: studentData.attendance >= 75 ? "#dcfce7" : "#fee2e2", color: studentData.attendance >= 75 ? "#16a34a" : "#dc2626" }}>
              <Calendar size={22} />
            </div>
            <div>
              <div className="stat-val" style={{ color: studentData.attendance >= 75 ? "#16a34a" : "#dc2626" }}>
                {studentData.attendance}%
              </div>
              <div className="stat-label">
                {studentData.attendance >= 75 ? "Attendance (Good Standing)" : "Attendance (At Risk)"}
              </div>
            </div>
          </div>

          {/* Verified Credentials */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#ccfbf1", color: "#0d9488" }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="stat-val">5 / 5</div>
              <div className="stat-label">Digital Verified Identity</div>
            </div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2rem" }}>
            {/* Left Col: Upcoming Exams & Campus Drives */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Upcoming Assessments & Exams */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "1rem" }}>
                  Upcoming Internal Assessments & University Exams
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontSize: "0.75rem", color: "#d97706", fontWeight: 700, textTransform: "uppercase" }}>
                      Upcoming IA (Internal Assessment)
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-900)", marginTop: "0.25rem" }}>
                      {studentData.academicRecords?.upcomingIA || "Internal Assessment 2 (Scheduled)"}
                    </div>
                  </div>

                  <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: 700, textTransform: "uppercase" }}>
                      Upcoming VTU Semester Examinations
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-900)", marginTop: "0.25rem" }}>
                      {studentData.academicRecords?.upcomingExams || "Semester End Examinations"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Campus Drives from Institution */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)" }}>
                    College Campus Selection Drives
                  </h3>
                  <button onClick={() => setActiveTab("jobs")} className="btn btn-secondary btn-sm">
                    View All ({campusDrives.length})
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {campusDrives.map((drive) => (
                    <div key={drive.id} style={{ border: "1px solid var(--gray-200)", padding: "1rem", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                          {drive.companyName}
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>
                          📅 {drive.driveDate} • 📍 {drive.venue}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1rem", fontWeight: 800, color: "#16a34a" }}>
                          {drive.packageInfo}
                        </div>
                        <button onClick={() => setActiveTab("jobs")} className="btn btn-primary btn-sm" style={{ marginTop: "0.25rem", fontSize: "0.75rem" }}>
                          Apply / Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: AI Skills & Vernacular Help */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Verified Skills */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "1rem" }}>
                  Top Verified Skills
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {studentData.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          {skill.name}
                          {skill.verified && <CheckCircle size={13} color="#16a34a" />}
                        </span>
                        <span style={{ fontWeight: 700, color: "#1e40af" }}>{skill.score}%</span>
                      </div>
                      <div style={{ height: "6px", background: "var(--gray-200)", borderRadius: "9999px", overflow: "hidden" }}>
                        <div style={{ width: `${skill.score}%`, height: "100%", background: "#2563eb" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vernacular Voice Guidance Callout */}
              <div className="card" style={{ padding: "1.5rem", background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)", border: "1px solid #99f6e4" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Bot size={20} color="#0f766e" />
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#134e4a" }}>
                    ಕನ್ನಡ AI ಮಾರ್ಗದರ್ಶನ (Vernacular AI)
                  </h4>
                </div>
                <p style={{ fontSize: "0.825rem", color: "#115e59", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  "ನನ್ನ Employability Score ಯಾಕೆ ಕಡಿಮೆ ಇದೆ?" ಎಂದು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ ಮತ್ತು ವಿವರವಾದ AI ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ.
                </p>
                <button
                  onClick={() => setActiveTab("employability")}
                  className="btn btn-primary btn-sm"
                  style={{ background: "#0d9488", fontSize: "0.8rem", width: "100%" }}
                >
                  <Volume2 size={14} /> ಸ್ಕೋರ್ ವಿವರಣೆ ಆಲಿಸಿ (Kannada Audio)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI EMPLOYABILITY ENGINE */}
        {activeTab === "employability" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
                    Technical Pillar #1
                  </span>
                  <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--gray-900)" }}>
                    AI Employability Score Analysis: {studentData.employabilityScore} / 100
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
                    Continuous AI evaluation based on academics, assessments, verified skills, and project repos.
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1e40af", lineHeight: 1 }}>
                    {studentData.employabilityScore}
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 700 }}>
                    {studentData.employabilityTrend}
                  </span>
                </div>
              </div>

              {/* Explainable Score in Preferred Language */}
              <div style={{ background: "#f8fafc", border: "1px solid var(--gray-200)", padding: "1.25rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                  🤖 Explain My Employability Score (ಕನ್ನಡ / English):
                </h4>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-700)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  <strong>English:</strong> Your score is strong in Fullstack Web Development (92%) and Data Structures (88%). To reach the top 5% bracket, complete practical projects in Docker Containerization and AWS Cloud Deployments.
                </p>
                <p style={{ fontSize: "0.875rem", color: "#0f766e", lineHeight: 1.6, background: "#f0fdfa", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid #ccfbf1" }}>
                  <strong>ಕನ್ನಡ ವಿವರಣೆ:</strong> ನಿಮ್ಮ React.js (92%) ಮತ್ತು ಅಲ್ಗಾರಿದಮ್‌ಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಕೌಶಲ್ಯವಿದೆ. ಆದರೆ ಕ್ಲೌಡ್ ತಂತ್ರಜ್ಞಾನ (AWS) ಮತ್ತು ಡಾಕರ್ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಕಡಿಮೆ ಇರುವುದರಿಂದ ನಿಮ್ಮ ಅಂಕವು 88 ಆಗಿದೆ. ಸಿಫಾರಸು ಮಾಡಲಾದ ಡಾಕರ್ ವರ್ಕ್‌ಶಾಪ್ ಮುಗಿಸಿದರೆ ನಿಮ್ಮ ಅಂಕವು 94+ ಗೆ ಏರುತ್ತದೆ.
                </p>
              </div>

              {/* Skill Gaps & Recommended Upskilling */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ border: "1px solid #fee2e2", background: "#fef2f2", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#991b1b", marginBottom: "0.75rem" }}>
                    Identified Skill Gaps
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#7f1d1d" }}>
                    {studentData.skillGaps?.map((gap, idx) => (
                      <li key={idx}>• {gap}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ border: "1px solid #bfdbfe", background: "#eff6ff", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e40af", marginBottom: "0.75rem" }}>
                    Recommended Next Steps & Upskilling
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#1e3a8a" }}>
                    {studentData.recommendedCourses?.map((rec, idx) => (
                      <li key={idx}>✓ {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VERIFIED DIGITAL WORKFORCE IDENTITY */}
        {activeTab === "identity" && (
          <div className="card" style={{ maxWidth: "680px", padding: "2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
                Technical Pillar #2
              </span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Verified Digital Workforce Identity
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
                “Not just a resume — a verified digital identity of what you can actually do.”
              </p>
            </div>

            {/* Cryptographic ID Card Box */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                color: "#ffffff",
                padding: "2rem",
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 15px 30px rgba(15, 23, 42, 0.3)",
                border: "2px solid #334155",
                position: "relative",
                marginBottom: "2rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    GOVERNMENT OF KARNATAKA • UDYAM SETHU
                  </div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "0.2rem" }}>
                    {studentData.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    {studentData.usn} • {studentData.branch}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
                    {studentData.institutionName}
                  </p>
                </div>

                {/* Simulated QR Code Box */}
                <div style={{ background: "#ffffff", padding: "0.6rem", borderRadius: "10px", textAlign: "center" }}>
                  <QrCode size={70} color="#0f172a" />
                  <div style={{ fontSize: "0.6rem", color: "#000000", fontWeight: 800, marginTop: "0.2rem" }}>
                    SCAN TO VERIFY
                  </div>
                </div>
              </div>

              {/* 5 Verifications Status Matrix */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", borderTop: "1px solid #334155", paddingTop: "1.25rem", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>Academic Verification: <strong>Verified</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>Skills Assessment: <strong>Verified (88%)</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>Project & Repos: <strong>Verified</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>College Domain Email: <strong>Authenticated</strong></span>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#94a3b8" }}>
                <span>Token: {studentData.verifiedIdentity?.verifiedId || "UDS-KA-2026-CS8891"}</span>
                <span>Tamper-Resistant SHA-256 Ledger</span>
              </div>
            </div>

            <button onClick={() => window.print()} className="btn btn-secondary" style={{ width: "100%" }}>
              <Download size={16} /> Print Official Verified Identity Certificate
            </button>
          </div>
        )}

        {/* TAB 4: ACADEMIC PERFORMANCE */}
        {activeTab === "academics" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              Academic Performance & Examination Records
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "1.75rem" }}>
              Semester GPA tracking, internal assessment scores, and attendance standing.
            </p>

            {/* Exact Rule for First Sem CGPA Hiding */}
            {isFirstSemWithoutExams ? (
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "1.5rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <AlertCircle size={20} color="#1e40af" />
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e3a8a" }}>
                    First Semester — Awaiting Internal Assessment & Semester Exam Results
                  </h4>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#1e40af", lineHeight: 1.5 }}>
                  Per academic guidelines, cumulative CGPA is only generated and published once your first semester internal assessments (IA) and university examination results are officially declared by the institution.
                </p>
              </div>
            ) : (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--gray-900)" }}>
                    Cumulative CGPA: {studentData.cgpa}
                  </h4>
                  <span className="badge badge-green">Good Academic Standing</span>
                </div>

                {/* Semesters Bar */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.75rem" }}>
                  {studentData.academicRecords?.semesters?.map((s, idx) => (
                    <div key={idx} style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)", padding: "0.85rem", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontWeight: 600 }}>{s.sem}</div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e40af", marginTop: "0.2rem" }}>
                        {s.gpa}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Schedules */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--gray-50)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-500)" }}>NEXT INTERNAL TEST</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-900)", marginTop: "0.25rem" }}>
                  {studentData.academicRecords?.upcomingIA}
                </div>
              </div>

              <div style={{ background: "var(--gray-50)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-500)" }}>SEMESTER END EXAM</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-900)", marginTop: "0.25rem" }}>
                  {studentData.academicRecords?.upcomingExams}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PLACEMENTS, INTERNSHIP & JOB APPLY */}
        {activeTab === "jobs" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-purple" style={{ marginBottom: "0.5rem" }}>
                Technical Pillar #4
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)" }}>
                AI Career & Opportunity Matching
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                Directly apply to vacancies with your verified digital workforce identity.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {jobs.map((job) => {
                const isApplied = appliedJobs[job.id] || (job.applicants || []).some((a) => a.studentId === studentData.id);

                return (
                  <div key={job.id} className="card" style={{ padding: "1.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <span className="badge badge-amber" style={{ marginBottom: "0.35rem" }}>
                          {job.type}
                        </span>
                        <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--gray-900)" }}>
                          {job.title}
                        </h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                          {job.employerName} • 📍 {job.location}
                        </p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#16a34a" }}>
                          {job.stipendOrSalary}
                        </div>
                        <span className="badge badge-blue" style={{ marginTop: "0.25rem" }}>
                          Min CGPA: {job.minCgpa}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.875rem", color: "var(--gray-700)", lineHeight: 1.5, marginBottom: "1rem" }}>
                      {job.description}
                    </p>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase" }}>
                        Required Competencies:
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.35rem" }}>
                        {job.requiredSkills.map((sk, idx) => (
                          <span key={idx} className="badge badge-blue" style={{ fontSize: "0.75rem" }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "0.825rem", color: "#1e40af", fontWeight: 600 }}>
                        ✨ Explainable Fit: High match with your verified skills & attendance
                      </div>

                      {isApplied ? (
                        <span className="badge badge-green" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                          <CheckCircle size={14} /> Application Submitted
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(job.id)}
                          className="btn btn-primary"
                          style={{ background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)" }}
                        >
                          Apply with Verified Workforce ID
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: AI ASSESSMENT & MOCK INTERVIEW ENGINE */}
        {activeTab === "assessments" && (
          <div className="card" style={{ padding: "2rem" }}>
            <span className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>
              Technical Pillar #5
            </span>
            <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              AI Assessment & Voice Mock Interview Engine
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1.75rem" }}>
              Role-specific technical, aptitude, coding, and real-time voice-based mock interviews.
            </p>

            {/* Launch Mock Interview Simulation */}
            <div style={{ background: "#f8fafc", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                    AI Technical Mock Interview: Full Stack & System Concepts
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                    Simulates actual recruiter questions from Bosch and Tata Elxsi.
                  </p>
                </div>

                <button
                  onClick={startMockInterview}
                  disabled={isInterviewing}
                  className="btn btn-primary"
                  style={{ background: "#0d9488" }}
                >
                  <Mic size={16} />
                  <span>{isInterviewing ? "Conducting AI Interview..." : "Start AI Mock Interview"}</span>
                </button>
              </div>

              {mockInterviewFeedback && (
                <div className="animate-fade-in" style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid #99f6e4" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f766e" }}>
                      AI Interview Evaluation Rubric
                    </span>
                    <span className="badge badge-green" style={{ fontSize: "0.8rem" }}>
                      Score: {mockInterviewFeedback.score}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-700)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                    {mockInterviewFeedback.feedback}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 700 }}>
                    ✓ Recommendation: {mockInterviewFeedback.recommendation}
                  </p>
                </div>
              )}
            </div>

            {/* Completed Assessments List */}
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0.75rem" }}>
              Completed Assessments History
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {studentData.assessments?.map((ass, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.25rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-sm)", background: "var(--gray-50)" }}>
                  <div>
                    <strong>{ass.name}</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>Completed on {ass.date}</div>
                  </div>
                  <span className="badge badge-blue" style={{ fontWeight: 800 }}>
                    {ass.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: RESUME BUILDER */}
        {activeTab === "resume" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
              Live Digital Resume Builder
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "1.5rem" }}>
              Dynamically compiled with your verified institution credentials.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {/* Edit Bio & Projects */}
              <div>
                <div className="form-group">
                  <label className="form-label">Professional Bio / Summary</label>
                  <textarea
                    rows={4}
                    className="form-input"
                    value={resumeBio}
                    onChange={(e) => setResumeBio(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: "0.5rem" }}>
                    Verified Projects
                  </h4>
                  {studentData.resumeDetails?.projects?.map((p, idx) => (
                    <div key={idx} style={{ padding: "0.75rem", background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-sm)", marginBottom: "0.5rem" }}>
                      <strong>{p.title}</strong>
                      <div style={{ fontSize: "0.75rem", color: "#1e40af" }}>{p.tech}</div>
                      <p style={{ fontSize: "0.8rem", color: "var(--gray-600)", marginTop: "0.2rem" }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Preview Document */}
              <div style={{ background: "#ffffff", border: "1px solid var(--gray-300)", padding: "1.5rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ borderBottom: "2px solid #1e40af", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
                    {studentData.name}
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>
                    {studentData.email} • {studentData.phone} • {studentData.institutionName}
                  </p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase" }}>
                    Executive Summary
                  </h4>
                  <p style={{ fontSize: "0.825rem", color: "var(--gray-700)", lineHeight: 1.5 }}>
                    {resumeBio}
                  </p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase" }}>
                    Academic Credentials
                  </h4>
                  <p style={{ fontSize: "0.825rem", color: "var(--gray-700)" }}>
                    {studentData.branch} — {isFirstSemWithoutExams ? "1st Sem" : `CGPA: ${studentData.cgpa}`}
                  </p>
                </div>

                <button onClick={() => window.print()} className="btn btn-secondary btn-sm" style={{ width: "100%", marginTop: "1rem" }}>
                  <Download size={14} /> Download PDF Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: ALUMNI OPPORTUNITY NETWORK */}
        {activeTab === "alumni" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-purple" style={{ marginBottom: "0.5rem" }}>
                Technical Pillar #9
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Alumni Opportunity Network
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>
                “Alumni don't just stay connected — they become an active opportunity layer for the next generation.”
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {[
                {
                  name: "Dr. Srinivas Patil",
                  role: "Lead Cloud Architect at Google Cloud",
                  college: "HKES PDA College of Engg (Batch 2018)",
                  offer: "1-on-1 Mentorship & GCP Referrals",
                  location: "Bengaluru",
                  story: "From Kalaburagi classrooms to architecting planetary-scale distributed cloud infrastructure."
                },
                {
                  name: "Priyanka Biradar",
                  role: "Senior AI Engineer at Microsoft Research",
                  college: "BLDEA CET Vijayapura (Batch 2021)",
                  offer: "Resume Review & AI Mock Interviews",
                  location: "Hyderabad",
                  story: "Spearheaded Indic language models for public service automation."
                }
              ].map((alm, idx) => (
                <div key={idx} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
                      <CheckCircle2 size={12} /> Verified Alumni Mentor
                    </span>
                    <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--gray-900)" }}>
                      {alm.name}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#1e40af", fontWeight: 600 }}>
                      {alm.role}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginBottom: "0.75rem" }}>
                      {alm.college} • {alm.location}
                    </p>
                    <p style={{ fontSize: "0.825rem", color: "var(--gray-600)", lineHeight: 1.5, fontStyle: "italic", marginBottom: "1rem" }}>
                      "{alm.story}"
                    </p>
                    <div style={{ background: "#f0fdfa", padding: "0.6rem", borderRadius: "var(--radius-sm)", border: "1px solid #99f6e4", fontSize: "0.8rem", color: "#0f766e" }}>
                      Offering: <strong>{alm.offer}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Mentorship connection requested with ${alm.name}! You will receive a calendar link via your college email.`)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    Request 1-on-1 Mentorship Session
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
