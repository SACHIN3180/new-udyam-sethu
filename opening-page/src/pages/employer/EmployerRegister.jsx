import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Briefcase, Clock, Lightbulb, CheckCircle2, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export const EmployerRegister = () => {
  const { registerEmployer } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    industry: "Information Technology & Software",
    contactPerson: "",
    email: "",
    phone: "",
    location: "Bengaluru / Kalaburagi",
    tagline: "",
    website: "",
    password: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerEmployer(formData);
    if (result.success) {
      setRegisteredData(result.employer);
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <div className="card" style={{ maxWidth: "620px", width: "100%", padding: "2.75rem" }}>
        {!isSubmitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
                <Briefcase size={28} />
              </div>
              <span className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>
                Industry Onboarding
              </span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Register Your Company
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-600)", marginTop: "0.35rem" }}>
                Connect with verified engineering & polytechnic talent across Karnataka. All enterprise registrations require administrator approval.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Company / Organization Legal Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Infosys Ltd / Kalyana Tech Hub"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Industry Domain *</label>
                  <select
                    className="form-input"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="Information Technology & Software">Information Technology & Software</option>
                    <option value="Automotive & Embedded Systems">Automotive & Embedded Systems</option>
                    <option value="Agritech & Renewable Energy">Agritech & Renewable Energy</option>
                    <option value="Core Engineering & Manufacturing">Core Engineering & Manufacturing</option>
                    <option value="Healthcare & Bio-Intelligence">Healthcare & Bio-Intelligence</option>
                    <option value="Banking & Financial Services">Banking & Financial Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Person / Talent Lead *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Priya Sharma (Head of TA)"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Corporate Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="recruitment@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    required
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Office / Hiring Center Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Kalaburagi Tech Park / Electronic City Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Company Tagline / Vision</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Empowering Next-Gen Regional Talent with High-Impact Tech"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Website URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Portal Password *</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    placeholder="Create secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)", marginBottom: "1.5rem", fontSize: "0.825rem", color: "var(--gray-600)" }}>
                🛡️ <strong>Verification Note:</strong> In compliance with Government of Karnataka data integrity standards, all corporate profiles undergo identity verification by the Higher Education Department before access is granted.
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                <span>Submit Registration for Administrator Approval</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--gray-600)" }}>
              Already registered?{" "}
              <Link to="/employer/login" style={{ color: "#d97706", fontWeight: 700 }}>
                Sign In here
              </Link>
            </div>
          </>
        ) : (
          /* Confirmation Screen as required */
          <div className="animate-fade-in" style={{ textAlign: "center" }}>
            <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto" }}>
              <Clock size={36} />
            </div>

            <span className="badge badge-amber" style={{ marginBottom: "0.75rem", fontSize: "0.8rem", padding: "0.3rem 0.8rem" }}>
              Status: Awaiting Administrator Approval
            </span>

            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "1rem" }}>
              Registration Request Submitted
            </h2>

            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "var(--radius-lg)", padding: "1.5rem", textAlign: "left", marginBottom: "1.75rem" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#92400e", marginBottom: "0.5rem" }}>
                Awaiting Administrator Approval
              </h4>
              <p style={{ fontSize: "0.95rem", color: "#b45309", lineHeight: 1.6, marginBottom: "1rem" }}>
                Your registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted.
              </p>
              <div style={{ background: "#ffffff", padding: "0.85rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid #fde68a", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <Lightbulb size={20} color="#d97706" style={{ flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: 1.5 }}>
                  💡 <strong>Once the platform administrator accepts your registration in the Admin Portal, you can sign in directly.</strong>
                </p>
              </div>
            </div>

            {/* Email dispatch preview note */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: "1rem", textAlign: "left", marginBottom: "1.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Mail size={22} color="#16a34a" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "0.85rem", color: "#166534" }}>
                A simulated confirmation dispatch has been sent to <strong>{registeredData?.email}</strong>. You can verify it via the top navigation mail icon.
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <Link to="/employer/login" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                Return to Employer Login
              </Link>
              <Link to="/admin/login" className="btn btn-secondary">
                <ShieldCheck size={16} /> Open Admin Portal to Approve
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
