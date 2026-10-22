import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Building2, Clock, Lightbulb, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export const InstitutionRegister = () => {
  const { registerInstitution } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    region: "Kalyana Karnataka (Kalaburagi / Bidar / Raichur / Ballari / Koppal / Yadgir)",
    contactPerson: "",
    email: "",
    phone: "",
    placementCellHead: "",
    accreditation: "NAAC A+ / NBA Tier-1",
    password: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerInstitution(formData);
    if (result.success) {
      setRegisteredData(result.institution);
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <div className="card" style={{ maxWidth: "640px", width: "100%", padding: "2.75rem" }}>
        {!isSubmitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#f0fdfa", color: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
                <Building2 size={28} />
              </div>
              <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
                Academic Onboarding
              </span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--gray-900)" }}>
                Register Academic Institution
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-600)", marginTop: "0.35rem" }}>
                Connect your engineering college or polytechnic to the Udyam Sethu Employability Operating System. Requires Higher Education Department verification.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">College / University Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Government Engineering College, Raichur"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">VTU / University College Code *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. 3PD, 2BL, GEC-01"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Accreditation Status</label>
                  <select
                    className="form-input"
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                  >
                    <option value="NAAC A+ / NBA Tier-1">NAAC A+ / NBA Tier-1</option>
                    <option value="NAAC A">NAAC A</option>
                    <option value="NAAC B++ / NBA">NAAC B++ / NBA</option>
                    <option value="Autonomous Engineering College">Autonomous Engineering College</option>
                    <option value="Government Polytechnic">Government Polytechnic</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Region / Division *</label>
                  <select
                    className="form-input"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  >
                    <option value="Kalyana Karnataka (Kalaburagi / Bidar / Raichur / Ballari / Koppal / Yadgir)">
                      Kalyana Karnataka (Kalaburagi, Bidar, Raichur, Ballari, Koppal, Yadgir)
                    </option>
                    <option value="Kittur Karnataka (Belagavi / Dharwad / Hubballi / Vijayapura)">
                      Kittur Karnataka (Belagavi, Dharwad, Hubballi, Vijayapura)
                    </option>
                    <option value="Bengaluru Urban & Rural">Bengaluru Urban & Rural</option>
                    <option value="Mysuru / Malenadu Region">Mysuru / Malenadu Region</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Principal / Dean Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Dr. S. M. Hiremath"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Placement Cell Officer *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Prof. Anand Desai"
                    value={formData.placementCellHead}
                    onChange={(e) => setFormData({ ...formData, placementCellHead: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official College Domain Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="principal@college.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    required
                    placeholder="+91 94481 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Portal Admin Password *</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    placeholder="Create secure password for college administrator"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--gray-200)", marginBottom: "1.5rem", fontSize: "0.825rem", color: "var(--gray-600)" }}>
                🏛️ <strong>Institutional Verification:</strong> College onboarding requires authentication of university affiliation code and institutional email domain before student credentials can be provisioned.
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
                <span>Submit Registration for Administrator Approval</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--gray-600)" }}>
              Already registered?{" "}
              <Link to="/institution/login" style={{ color: "#0d9488", fontWeight: 700 }}>
                Sign In here
              </Link>
            </div>
          </>
        ) : (
          /* Confirmation Screen as required */
          <div className="animate-fade-in" style={{ textAlign: "center" }}>
            <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#f0fdfa", color: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto" }}>
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

            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: "1rem", textAlign: "left", marginBottom: "1.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Mail size={22} color="#16a34a" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "0.85rem", color: "#166534" }}>
                A simulated confirmation dispatch has been sent to <strong>{registeredData?.email}</strong>. View it via the mail icon in the top header.
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <Link to="/institution/login" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}>
                Return to Institution Login
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
