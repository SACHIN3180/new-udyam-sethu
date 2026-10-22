import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Award,
  Languages,
  Target,
  FileCheck2,
  Users2,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  QrCode,
  Globe2,
  BarChart3,
  Bot
} from "lucide-react";

export const OpeningPage = () => {
  const { t, language } = useApp();

  const technicalPillars = [
    {
      num: "01",
      title: "AI Employability Engine",
      icon: <BrainCircuit size={24} color="#2563eb" />,
      desc: "Dynamic AI score (0-100), automated skill-gap analysis, competency mapping, and personalized upskilling pathways.",
      badge: "AI/ML Core"
    },
    {
      num: "02",
      title: "Verified Digital Workforce Identity",
      icon: <QrCode size={24} color="#0d9488" />,
      desc: "Not just a resume — a tamper-resistant QR-based digital identity verifying academics, skills, projects, and internships.",
      badge: "Cryptographic Trust"
    },
    {
      num: "03",
      title: "Vernacular AI — Regional Differentiator",
      icon: <Languages size={24} color="#d97706" />,
      desc: "Full voice and text career intelligence in Kannada (ಕನ್ನಡ), English & Hindi. 'Explain my employability score' in local language.",
      badge: "Indic LLM"
    },
    {
      num: "04",
      title: "AI Opportunity & Fit Matching",
      icon: <Target size={24} color="#7c3aed" />,
      desc: "Competency-to-job matching, explainable 'Why am I a good fit?' analytics, and regional internship discovery.",
      badge: "Smart Match"
    },
    {
      num: "05",
      title: "AI Assessment & Mock Interview Engine",
      icon: <Bot size={24} color="#ea580c" />,
      desc: "Aptitude, coding, and real-time voice-based mock interviews with instant rubrics and actionable feedback.",
      badge: "Interactive"
    },
    {
      num: "06",
      title: "AI Skill Intelligence",
      icon: <TrendingUp size={24} color="#059669" />,
      desc: "Transforming raw academic and assessment data into an evolving skill graph and continuous readiness track.",
      badge: "Skill Ontology"
    },
    {
      num: "07",
      title: "Institution Intelligence",
      icon: <Building2 size={24} color="#0284c7" />,
      desc: "Department-wise skill gaps, batch readiness segmentation, at-risk student intervention, and placement operations.",
      badge: "College OS"
    },
    {
      num: "08",
      title: "Employer Intelligence",
      icon: <Briefcase size={24} color="#be185d" />,
      desc: "AI talent shortlisting, verified search, competency extraction from job descriptions, and hiring pipeline.",
      badge: "Enterprise"
    },
    {
      num: "09",
      title: "Alumni Opportunity Network",
      icon: <Users2 size={24} color="#4f46e5" />,
      desc: "Active mentorship, verified alumni profiles, referrals, and tech sessions across Karnataka.",
      badge: "Community"
    },
    {
      num: "10",
      title: "Inclusive Product Technology",
      icon: <Smartphone size={24} color="#047857" />,
      desc: "Mobile-first UX, low-bandwidth mode for rural connectivity, PWA design, and Kalyana Karnataka inclusion.",
      badge: "Accessibility"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={16} />
              <span>Higher Education & Skill Development • Government of Karnataka</span>
            </div>

            <h1 className="hero-title">
              {language === "kn" ? (
                <>
                  ಕರ್ನಾಟಕದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ <br />
                  <span className="hero-highlight">ಉದ್ಯಮ ಸೇತು</span> ವೃತ್ತಿ ವೇದಿಕೆ
                </>
              ) : (
                <>
                  Bridging Talent to Opportunity with <br />
                  <span className="hero-highlight">Udyam Sethu</span> (ಉದ್ಯಮ ಸೇತು)
                </>
              )}
            </h1>

            <p className="hero-subtitle">
              {t("heroDesc")}
            </p>

            {/* Quick stats banner */}
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center",
                background: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--gray-200)",
                boxShadow: "var(--shadow-md)",
                marginBottom: "1rem"
              }}
            >
              <div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#1e40af" }}>1,420+</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase" }}>Colleges & Poly</div>
              </div>
              <div style={{ width: "1px", background: "var(--gray-200)" }} />
              <div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0d9488" }}>3.8 Lakh+</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase" }}>Verified Students</div>
              </div>
              <div style={{ width: "1px", background: "var(--gray-200)" }} />
              <div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#d97706" }}>2,850+</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase" }}>Hiring Employers</div>
              </div>
              <div style={{ width: "1px", background: "var(--gray-200)" }} />
              <div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#16a34a" }}>88.4%</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase" }}>Readiness Rate</div>
              </div>
            </div>
          </div>

          {/* 3 Main Portals Section */}
          <div style={{ marginTop: "3.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
                Portal Gateway
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Choose Your Gateway to Begin
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--gray-600)" }}>
                Dedicated interfaces for Students, Academic Institutions, and Industry Employers
              </p>
            </div>

            <div className="portals-grid">
              {/* 1. STUDENT PORTAL */}
              <div className="portal-card student-card">
                <div>
                  <div className="portal-icon-wrapper">
                    <GraduationCap size={30} />
                  </div>
                  <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
                    Portal 1 • Students
                  </span>
                  <h3>Student Portal</h3>
                  <p>
                    Access your AI Employability Score, verified credentials QR badge, vernacular voice guidance in Kannada, mock assessments, resume builder, and direct job & internship applications.
                  </p>

                  <ul className="portal-features-list">
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Login with official college-issued Gmail only</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Verified Digital Workforce Identity & QR Code</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Automated CGPA (Hidden for 1st sem awaiting exams)</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Campus drive alerts & institution updates</span>
                    </li>
                  </ul>
                </div>

                <div className="portal-actions">
                  <Link to="/student/login" className="btn btn-primary btn-lg">
                    <span>Student Login</span>
                    <ArrowRight size={18} />
                  </Link>
                  <p style={{ fontSize: "0.775rem", color: "var(--gray-500)", textAlign: "center" }}>
                    *Requires official institutional email assigned by your college
                  </p>
                </div>
              </div>

              {/* 2. INSTITUTION PORTAL */}
              <div className="portal-card institution-card">
                <div>
                  <div className="portal-icon-wrapper">
                    <Building2 size={30} />
                  </div>
                  <span className="badge badge-green" style={{ marginBottom: "0.75rem" }}>
                    Portal 2 • Colleges & Universities
                  </span>
                  <h3>Institution Portal</h3>
                  <p>
                    Equip your college with deep employability intelligence. Provision student credentials, track batch scores, identify at-risk students, broadcast campus drives, and undo notifications.
                  </p>

                  <ul className="portal-features-list">
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Create and assign student login emails</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Edit student details & export PDF/Excel/Word</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Send updates with <strong>Undo/Reverse</strong> feature</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Department skill gap & placement analytics</span>
                    </li>
                  </ul>
                </div>

                <div className="portal-actions">
                  <Link to="/institution/login" className="btn btn-primary btn-lg" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
                    <span>Institution Login</span>
                    <ArrowRight size={18} />
                  </Link>
                  <div className="portal-register-link">
                    New Institution?{" "}
                    <Link to="/institution/register">Register College (Requires Approval)</Link>
                  </div>
                </div>
              </div>

              {/* 3. EMPLOYER PORTAL */}
              <div className="portal-card employer-card">
                <div>
                  <div className="portal-icon-wrapper">
                    <Briefcase size={30} />
                  </div>
                  <span className="badge badge-amber" style={{ marginBottom: "0.75rem" }}>
                    Portal 3 • Industry & Hiring
                  </span>
                  <h3>Employer Portal</h3>
                  <p>
                    Recruit job-ready talent with verified competencies. Review applicant portfolios with attendance, skills, certificates, and AI-computed Candidate-Job Fit scores.
                  </p>

                  <ul className="portal-features-list">
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Verified talent search & filter by skill score</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>View applicant portfolios, resume & certificates</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Post jobs/internships & manage hiring pipeline</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Candidate-job fit score with explainable AI</span>
                    </li>
                  </ul>
                </div>

                <div className="portal-actions">
                  <Link to="/employer/login" className="btn btn-primary btn-lg" style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                    <span>Employer Login</span>
                    <ArrowRight size={18} />
                  </Link>
                  <div className="portal-register-link">
                    New Employer?{" "}
                    <Link to="/employer/register">Register Company (Requires Approval)</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Technical Pillars Showcase */}
      <section style={{ padding: "4.5rem 0", background: "#ffffff", borderBottom: "1px solid var(--gray-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-purple" style={{ marginBottom: "0.65rem" }}>
              Architectural Blueprint
            </span>
            <h2 style={{ fontSize: "2.35rem", fontWeight: 800, color: "var(--gray-900)", lineHeight: 1.2 }}>
              The 10 Technical Pillars of Udyam Sethu
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--gray-600)", marginTop: "0.75rem" }}>
              Moving beyond traditional placement boards into an AI-powered Employability Operating System for Karnataka.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {technicalPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="card"
                style={{
                  padding: "1.75rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {pillar.icon}
                    </div>
                    <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                      {pillar.badge}
                    </span>
                  </div>

                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--gray-400)" }}>
                    PILLAR {pillar.num}
                  </span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--gray-900)", marginTop: "0.2rem", marginBottom: "0.6rem" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", lineHeight: 1.55 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Callout Banner */}
      <section style={{ padding: "3rem 0", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <ShieldCheck size={22} color="#f59e0b" />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase" }}>
                Admin & Governance Portal
              </span>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              Higher Education Department & Platform Administration
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", maxWidth: "650px" }}>
              Review pending employer & institution registration requests, approve or reject applications, view statewide statistics, and manage audit logs.
            </p>
          </div>
          <Link to="/admin/login" className="btn btn-secondary" style={{ background: "#f59e0b", color: "#000000", border: "none", fontWeight: 700 }}>
            <span>Sign into Admin Portal</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
