import React from "react";
import { Link } from "react-router-dom";
import { Shield, Sparkles, MapPin, ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", paddingTop: "4rem", paddingBottom: "2.5rem", borderTop: "1px solid #1e293b" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #1e3a8a, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: 800 }}>
                ಉ
              </div>
              <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                UDYAM SETHU
              </h3>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#94a3b8", marginBottom: "1.25rem" }}>
              Karnataka's Integrated Employability Operating System. Bridging students, academic institutions, and leading employers through AI score tracking, verified digital credentials, and vernacular career intelligence.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#cbd5e1" }}>
              <MapPin size={15} color="#d97706" />
              <span>Special Focus: Kalyana Karnataka Region</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Platform Portals
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem" }}>
              <li>
                <Link to="/student/login" style={{ color: "#cbd5e1", transition: "color 0.2s" }} onMouseOver={(e) => (e.target.style.color = "#ffffff")} onMouseOut={(e) => (e.target.style.color = "#cbd5e1")}>
                  🎓 Student Portal (Official College Login)
                </Link>
              </li>
              <li>
                <Link to="/institution/login" style={{ color: "#cbd5e1", transition: "color 0.2s" }} onMouseOver={(e) => (e.target.style.color = "#ffffff")} onMouseOut={(e) => (e.target.style.color = "#cbd5e1")}>
                  🏛️ Institution Portal (Colleges & Universities)
                </Link>
              </li>
              <li>
                <Link to="/employer/login" style={{ color: "#cbd5e1", transition: "color 0.2s" }} onMouseOver={(e) => (e.target.style.color = "#ffffff")} onMouseOut={(e) => (e.target.style.color = "#cbd5e1")}>
                  💼 Employer Portal (Talent & Hiring)
                </Link>
              </li>
              <li>
                <Link to="/admin/login" style={{ color: "#f59e0b", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Shield size={14} /> Platform Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              10 Technical Pillars
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.825rem", color: "#94a3b8" }}>
              <li>• AI Employability Score & Gap Analysis</li>
              <li>• Verified Digital Workforce Identity (QR)</li>
              <li>• Vernacular AI (ಕನ್ನಡ + English + हिंदी)</li>
              <li>• AI Assessment & Mock Interview Engine</li>
              <li>• Institution & Placement Intelligence</li>
              <li>• Employer Competency Fit Ranking</li>
              <li>• Active Alumni Mentorship Network</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Regional Helpline & Support
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              Toll-free student & college helpline: <br />
              <strong style={{ color: "#ffffff" }}>1800-425-UDYAM (8392)</strong>
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Email: <strong>support@udyamssethu.gov.in</strong>
            </p>
            <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#1e293b", padding: "0.45rem 0.85rem", borderRadius: "8px", fontSize: "0.75rem", color: "#10b981" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
              All Services Operational • Statewide Tier-1 Cloud
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1.75rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", fontSize: "0.8rem" }}>
          <p>
            © 2026 Udyam Sethu (ಉದ್ಯಮ ಸೇತು). Higher Education & Skill Development Ecosystem.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "#64748b" }}>Privacy Policy</span>
            <span style={{ color: "#64748b" }}>Terms of Service</span>
            <span style={{ color: "#64748b" }}>Accessibility Statement (WCAG 2.1)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
