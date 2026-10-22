
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navigation = [
  { label: "Overview", icon: "▦", path: "/admin/dashboard" },
  { label: "Applications", icon: "📄", path: "/admin/applications" },
  { label: "Employers", icon: "🏢", path: "/admin/companies" },
  { label: "Institutions", icon: "🎓", path: "/admin/institutions" },
  { label: "Reports", icon: "📊", path: "/admin/reports" },
  { label: "Settings", icon: "⚙️", path: "/admin/settings" },
];

const settingTabs = [
  { id: "profile", label: "Admin Profile", icon: "👤" },
  { id: "platform", label: "Platform", icon: "⚙️" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "security", label: "Security", icon: "🔐" },
  { id: "access", label: "User Access", icon: "🛡️" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
];

function SectionCard({ title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, type = "text", placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
    />
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
    >
      {children}
    </select>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-orange-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 sm:max-w-md">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
      <div className="sm:min-w-48">{children}</div>
    </div>
  );
}

export default function Settings() {
  const initialSettings = {
    fullName: "Administrator",
    email: "admin@udyamsethu.example",
    phone: "+91 98765 43210",
    designation: "Super Admin",
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD MMM YYYY",
    organizationName: "Udyam Sethu",
    supportEmail: "support@udyamsethu.example",
    sessionTimeout: "30",
    maintenanceMode: false,
    employerNotifications: true,
    institutionNotifications: true,
    reportNotifications: true,
    securityNotifications: true,
    weeklySummary: false,
    emailNotifications: true,
    twoFactorEnabled: false,
    loginAlerts: true,
    requireStrongPassword: true,
    allowEmployerRegistration: true,
    allowInstitutionRegistration: true,
    requireApproval: true,
    allowAdminInvites: false,
    theme: "light",
    compactMode: false,
    showAnimations: true,
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setMessage("");
  };

  const saveSettings = () => {
    setSavedSettings({ ...settings });
    setMessage("Settings saved in this session.");
  };

  const resetSettings = () => {
    setSettings({ ...savedSettings });
    setMessage("Unsaved changes have been discarded.");
  };

  const restoreDefaults = () => {
    setSettings({ ...initialSettings });
    setMessage("Default values restored. Click Save Changes to apply them.");
  };

  const changePassword = (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordMessage("Use a password with at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("The passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Password form validated. Connect your backend to change the actual password."
    );
    setNewPassword("");
    setConfirmPassword("");
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <SectionCard
        title="Administrator Profile"
        description="Manage the profile details shown in the admin portal."
      >
        <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg shadow-orange-100">
            {settings.fullName.trim().charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {settings.fullName || "Administrator"}
            </p>
            <p className="mt-1 text-sm text-slate-500">{settings.designation}</p>
            <p className="mt-2 text-xs text-slate-400">
              Administrator account profile
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name">
            <TextInput
              value={settings.fullName}
              onChange={(e) => updateSetting("fullName", e.target.value)}
              placeholder="Enter full name"
            />
          </Field>
          <Field label="Email address">
            <TextInput
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting("email", e.target.value)}
              placeholder="admin@example.com"
            />
          </Field>
          <Field label="Phone number">
            <TextInput
              type="tel"
              value={settings.phone}
              onChange={(e) => updateSetting("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </Field>
          <Field label="Designation">
            <SelectInput
              value={settings.designation}
              onChange={(e) => updateSetting("designation", e.target.value)}
            >
              <option>Super Admin</option>
              <option>Platform Administrator</option>
              <option>Operations Manager</option>
              <option>Report Reviewer</option>
            </SelectInput>
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Regional Preferences"
        description="Choose the language, time zone, and date format used in the admin interface."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Display language">
            <SelectInput
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
            >
              <option>English</option>
              <option>Kannada</option>
              <option>Hindi</option>
            </SelectInput>
          </Field>
          <Field label="Time zone">
            <SelectInput
              value={settings.timezone}
              onChange={(e) => updateSetting("timezone", e.target.value)}
            >
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="UTC">UTC</option>
              <option value="Asia/Dubai">Gulf Standard Time</option>
            </SelectInput>
          </Field>
          <Field label="Date format">
            <SelectInput
              value={settings.dateFormat}
              onChange={(e) => updateSetting("dateFormat", e.target.value)}
            >
              <option value="DD MMM YYYY">22 Oct 2026</option>
              <option value="DD/MM/YYYY">22/10/2026</option>
              <option value="YYYY-MM-DD">2026-10-22</option>
            </SelectInput>
          </Field>
        </div>
      </SectionCard>
    </div>
  );

  const renderPlatform = () => (
    <div className="space-y-6">
      <SectionCard
        title="Platform Configuration"
        description="Configure the basic identity and operational preferences of Udyam Sethu."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Platform name">
            <TextInput
              value={settings.organizationName}
              onChange={(e) => updateSetting("organizationName", e.target.value)}
            />
          </Field>
          <Field label="Support email">
            <TextInput
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateSetting("supportEmail", e.target.value)}
            />
          </Field>
          <Field
            label="Session timeout"
            hint="This preference needs backend enforcement to expire real sessions."
          >
            <SelectInput
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="120">2 hours</option>
            </SelectInput>
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Registration & Platform Operations"
        description="Control registration preferences and maintenance indicators."
      >
        <Toggle
          label="Employer registrations"
          description="Allow employer registration requests to be accepted by the platform."
          checked={settings.allowEmployerRegistration}
          onChange={(value) => updateSetting("allowEmployerRegistration", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Institution registrations"
          description="Allow colleges and universities to submit registration requests."
          checked={settings.allowInstitutionRegistration}
          onChange={(value) =>
            updateSetting("allowInstitutionRegistration", value)
          }
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Require admin approval"
          description="Keep new organizations pending until an administrator reviews them."
          checked={settings.requireApproval}
          onChange={(value) => updateSetting("requireApproval", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Maintenance mode"
          description="UI preference only until connected to a backend maintenance mechanism."
          checked={settings.maintenanceMode}
          onChange={(value) => updateSetting("maintenanceMode", value)}
        />
        {settings.maintenanceMode && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Maintenance mode is selected. The live platform will not enter
            maintenance mode until this setting is connected to the backend.
          </div>
        )}
      </SectionCard>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <SectionCard
        title="Email Notifications"
        description="Choose which platform events should trigger notifications."
      >
        <Toggle
          label="Email notifications"
          description="Master preference for email notification delivery."
          checked={settings.emailNotifications}
          onChange={(value) => updateSetting("emailNotifications", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Employer registrations"
          description="Get notified when an employer submits a registration."
          checked={settings.employerNotifications}
          onChange={(value) => updateSetting("employerNotifications", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Institution registrations"
          description="Get notified when an institution submits a registration."
          checked={settings.institutionNotifications}
          onChange={(value) => updateSetting("institutionNotifications", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Reports and submissions"
          description="Receive notifications when organizations submit reports."
          checked={settings.reportNotifications}
          onChange={(value) => updateSetting("reportNotifications", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Security alerts"
          description="Receive alerts for important account-security events."
          checked={settings.securityNotifications}
          onChange={(value) => updateSetting("securityNotifications", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Weekly platform summary"
          description="Receive a weekly overview of registrations and report activity."
          checked={settings.weeklySummary}
          onChange={(value) => updateSetting("weeklySummary", value)}
        />
        {!settings.emailNotifications && (
          <p className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            Email notifications are switched off. Individual event preferences
            remain saved but will not be used while the master preference is off.
          </p>
        )}
      </SectionCard>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <SectionCard
        title="Account Security"
        description="Configure security preferences for the administrator account."
      >
        <Toggle
          label="Two-factor authentication"
          description="Add a second verification step when signing in. Backend and authenticator integration are required."
          checked={settings.twoFactorEnabled}
          onChange={(value) => updateSetting("twoFactorEnabled", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Login alerts"
          description="Preference for alerts about account sign-in activity."
          checked={settings.loginAlerts}
          onChange={(value) => updateSetting("loginAlerts", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Strong password policy"
          description="Require stronger passwords when account validation is implemented."
          checked={settings.requireStrongPassword}
          onChange={(value) => updateSetting("requireStrongPassword", value)}
        />
      </SectionCard>

      <SectionCard
        title="Change Password"
        description="Validate a new password here. Actual password changes must be handled securely by your backend."
      >
        <form onSubmit={changePassword} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="New password"
              hint="Use at least 8 characters."
            >
              <TextInput
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Field>
            <Field label="Confirm new password">
              <TextInput
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </Field>
          </div>

          {passwordMessage && (
            <p
              role="status"
              className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700"
            >
              {passwordMessage}
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Validate password change
          </button>
        </form>
      </SectionCard>

      <SectionCard
        title="Session Management"
        description="Review how long an administrator session should remain active."
      >
        <SettingRow
          title="Session timeout"
          description="Choose the preferred inactivity timeout."
        >
          <SelectInput
            value={settings.sessionTimeout}
            onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="120">2 hours</option>
          </SelectInput>
        </SettingRow>
      </SectionCard>
    </div>
  );

  const renderAccess = () => (
    <div className="space-y-6">
      <SectionCard
        title="Administrator Permissions"
        description="Choose access-management preferences for the platform."
      >
        <Toggle
          label="Allow administrator invitations"
          description="Enable the preference for inviting additional admin users."
          checked={settings.allowAdminInvites}
          onChange={(value) => updateSetting("allowAdminInvites", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Require approval for new organizations"
          description="New employer and institution accounts should be reviewed before approval."
          checked={settings.requireApproval}
          onChange={(value) => updateSetting("requireApproval", value)}
        />
      </SectionCard>

      <SectionCard
        title="Role Access Overview"
        description="A reference for the intended responsibilities of each portal role."
      >
        <div className="space-y-3">
          {[
            {
              role: "Super Admin",
              description:
                "Manage platform configuration, registrations, reports, and administrator access.",
              badge: "Full access",
              style: "bg-orange-50 text-orange-700",
            },
            {
              role: "Employer",
              description:
                "Manage company profile, opportunities, and employer-submitted reports.",
              badge: "Employer portal",
              style: "bg-blue-50 text-blue-700",
            },
            {
              role: "Institution Admin",
              description:
                "Manage institution profile, student-related information, and institutional reports.",
              badge: "Institution portal",
              style: "bg-purple-50 text-purple-700",
            },
            {
              role: "Student",
              description:
                "Access opportunities, applications, learning, and personal profile information.",
              badge: "Student portal",
              style: "bg-emerald-50 text-emerald-700",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">{item.role}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
              <span
                className={`w-fit whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${item.style}`}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>
        <p className="rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
          These are interface preferences and role descriptions, not access
          controls. Enforce permissions in Express middleware and the database;
          hiding UI elements alone does not secure a route.
        </p>
      </SectionCard>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <SectionCard
        title="Appearance Preferences"
        description="Customize how the admin dashboard should look and feel."
      >
        <Field label="Color theme">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                value: "light",
                title: "Light",
                description: "Clean and bright workspace",
                preview: "bg-white border-slate-200",
              },
              {
                value: "dark",
                title: "Dark",
                description: "Low-light workspace",
                preview: "bg-slate-900 border-slate-700",
              },
              {
                value: "system",
                title: "System",
                description: "Follow device preference",
                preview: "bg-gradient-to-r from-white to-slate-900 border-slate-300",
              },
            ].map((theme) => (
              <button
                key={theme.value}
                type="button"
                onClick={() => updateSetting("theme", theme.value)}
                className={`rounded-xl border p-3 text-left transition ${
                  settings.theme === theme.value
                    ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div
                  className={`mb-3 h-14 rounded-lg border ${theme.preview}`}
                />
                <p className="text-sm font-semibold text-slate-800">
                  {theme.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {theme.description}
                </p>
                {settings.theme === theme.value && (
                  <p className="mt-2 text-xs font-semibold text-orange-600">
                    Selected
                  </p>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Theme selection is stored in the current component state. Connect it
            to your application theme provider to change the entire interface.
          </p>
        </Field>

        <div className="border-t border-slate-100" />
        <Toggle
          label="Compact layout"
          description="Preference for tighter spacing in tables and panels."
          checked={settings.compactMode}
          onChange={(value) => updateSetting("compactMode", value)}
        />
        <div className="border-t border-slate-100" />
        <Toggle
          label="Interface animations"
          description="Enable visual transitions where supported."
          checked={settings.showAnimations}
          onChange={(value) => updateSetting("showAnimations", value)}
        />
      </SectionCard>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfile();
      case "platform":
        return renderPlatform();
      case "notifications":
        return renderNotifications();
      case "security":
        return renderSecurity();
      case "access":
        return renderAccess();
      case "appearance":
        return renderAppearance();
      default:
        return renderProfile();
    }
  };

  const activeTabInfo = settingTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Shared admin sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold">
            U
          </div>
          <div>
            <h1 className="text-lg font-bold">Udyam Sethu</h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
            className="ml-auto text-2xl text-slate-400 lg:hidden"
          >
            ×
          </button>
        </div>

        <nav className="space-y-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-orange-500 font-semibold text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold">Need assistance?</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Contact your platform support team for help.
            </p>
          </div>
          <p className="mt-5 text-center text-xs text-slate-500">
            © 2026 Udyam Sethu
          </p>
        </div>
      </aside>

      <div className="min-h-screen lg:ml-64">
        {/* Shared admin header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg border border-slate-200 p-2 text-xl lg:hidden"
            >
              ☰
            </button>
            <div>
              <h2 className="text-lg font-bold sm:text-xl">Settings</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Configure your administration workspace
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
              {(settings.fullName.trim().charAt(0) || "A").toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{settings.fullName}</p>
              <p className="text-xs text-slate-500">{settings.designation}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/dashboard" className="hover:text-orange-600">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Settings</span>
          </div>

          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-semibold tracking-wider text-orange-300">
                WORKSPACE CONFIGURATION
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Admin Settings
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage your profile, platform preferences, notifications,
                account security, access policies, and workspace appearance.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                  Administrator workspace
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                  Configuration center
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-28 right-36 h-64 w-64 rounded-full border-[35px] border-orange-400/10" />
          </section>

          {message && (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
            {/* Settings navigation */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Preferences
              </p>
              <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
                {settingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <span className="ml-auto hidden text-orange-600 xl:inline">
                        ›
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-4 hidden rounded-xl bg-slate-50 p-4 xl:block">
                <p className="text-xs font-semibold text-slate-700">
                  Configuration tip
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Save your changes before switching pages. These settings
                  currently exist only in frontend state.
                </p>
              </div>
            </aside>

            {/* Selected settings section */}
            <div className="min-w-0 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
                  SETTINGS / {activeTabInfo.label.toUpperCase()}
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  {activeTabInfo.label}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your {activeTabInfo.label.toLowerCase()} preferences.
                </p>
              </div>

              {renderActiveTab()}

              <div className="sticky bottom-3 z-20 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">
                  Changes are local to this page until connected to persistent
                  storage or an API.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={resetSettings}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Discard changes
                  </button>
                  <button
                    type="button"
                    onClick={restoreDefaults}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Restore defaults
                  </button>
                  <button
                    type="button"
                    onClick={saveSettings}
                    className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Udyam Sethu Admin Portal · Settings & Preferences · 2026
          </footer>
        </main>
      </div>
    </div>
  );
}
