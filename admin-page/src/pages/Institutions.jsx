
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const initialInstitutions = [
  {
    id: 1,
    institutionName: "Global Institute of Technology",
    institutionType: "Engineering College",
    contactPerson: "Dr. Ramesh Kumar",
    email: "admin@git.example",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    affiliation: "Visvesvaraya Technological University",
    studentStrength: "2,500+",
    establishedYear: "2008",
    registrationDate: "20 Oct 2026",
    status: "Pending",
  },
  {
    id: 2,
    institutionName: "City College of Engineering",
    institutionType: "Engineering College",
    contactPerson: "Prof. Meera Rao",
    email: "office@citycollege.example",
    phone: "+91 98765 12345",
    location: "Mysuru, Karnataka",
    affiliation: "Visvesvaraya Technological University",
    studentStrength: "1,800+",
    establishedYear: "2012",
    registrationDate: "18 Oct 2026",
    status: "Pending",
  },
  {
    id: 3,
    institutionName: "National Institute of Technology",
    institutionType: "Technical Institute",
    contactPerson: "Dr. Suresh Patil",
    email: "registrar@nit.example",
    phone: "+91 98123 45678",
    location: "Surathkal, Karnataka",
    affiliation: "Autonomous Institution",
    studentStrength: "4,000+",
    establishedYear: "1960",
    registrationDate: "15 Oct 2026",
    status: "Approved",
  },
  {
    id: 4,
    institutionName: "Greenfield Degree College",
    institutionType: "Degree College",
    contactPerson: "Anitha Sharma",
    email: "contact@greenfield.example",
    phone: "+91 98234 56789",
    location: "Hubballi, Karnataka",
    affiliation: "Karnatak University",
    studentStrength: "1,200+",
    establishedYear: "2015",
    registrationDate: "12 Oct 2026",
    status: "Approved",
  },
  {
    id: 5,
    institutionName: "Pioneer Polytechnic",
    institutionType: "Polytechnic",
    contactPerson: "Vijay Desai",
    email: "admin@pioneer.example",
    phone: "+91 98456 12345",
    location: "Belagavi, Karnataka",
    affiliation: "Department of Technical Education",
    studentStrength: "900+",
    establishedYear: "2018",
    registrationDate: "10 Oct 2026",
    status: "Rejected",
  },
];

const navigation = [
  { label: "Overview", icon: "▦", path: "/admin/dashboard" },
  { label: "Applications", icon: "📄", path: "/admin/applications" },
  { label: "Employers", icon: "🏢", path: "/admin/companies" },
  { label: "Institutions", icon: "🎓", path: "/admin/institutions" },
  { label: "Reports", icon: "📊", path: "/admin/reports" },
  { label: "Settings", icon: "⚙️", path: "/admin/settings" },
];

const statusStyles = {
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatCard({ title, value, description, icon, iconStyle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconStyle}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] || statusStyles.Pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function Institutions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [institutions, setInstitutions] = useState(initialInstitutions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [message, setMessage] = useState("");

  const stats = useMemo(
    () => [
      {
        title: "Total Institutions",
        value: institutions.length,
        description: "All listed institutions",
        icon: "🎓",
        iconStyle: "bg-blue-50 text-blue-700",
      },
      {
        title: "Pending Review",
        value: institutions.filter((item) => item.status === "Pending").length,
        description: "Awaiting admin decision",
        icon: "⏳",
        iconStyle: "bg-amber-50 text-amber-700",
      },
      {
        title: "Approved",
        value: institutions.filter((item) => item.status === "Approved").length,
        description: "Verified institutions",
        icon: "✓",
        iconStyle: "bg-emerald-50 text-emerald-700",
      },
      {
        title: "Rejected",
        value: institutions.filter((item) => item.status === "Rejected").length,
        description: "Declined registrations",
        icon: "✕",
        iconStyle: "bg-red-50 text-red-700",
      },
    ],
    [institutions]
  );

  const filteredInstitutions = institutions.filter((institution) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch = [
      institution.institutionName,
      institution.institutionType,
      institution.contactPerson,
      institution.email,
      institution.location,
      institution.affiliation,
    ].some((value) => value.toLowerCase().includes(searchText));

    const matchesStatus =
      statusFilter === "All" || institution.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setInstitutions((previous) =>
      previous.map((institution) =>
        institution.id === id ? { ...institution, status } : institution
      )
    );

    setSelectedInstitution((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );

    setMessage(`Institution registration ${status.toLowerCase()} successfully.`);

    window.setTimeout(() => setMessage(""), 3000);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Admin sidebar */}
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
            <h1 className="text-lg font-bold tracking-wide">Udyam Sethu</h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation"
            className="ml-auto text-2xl text-slate-400 lg:hidden"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin/dashboard"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-orange-500 font-semibold text-white shadow-lg shadow-orange-950/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300">
              ?
            </div>
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

      {/* Main content */}
      <div className="min-h-screen lg:ml-64">
        {/* Admin header */}
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
              <h2 className="text-lg font-bold sm:text-xl">Institutions</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Manage college and university registrations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-lg hover:bg-slate-50"
            >
              ♧
              {institutions.some((item) => item.status === "Pending") && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            <div className="hidden h-9 border-l border-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Administrator</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              to="/admin/dashboard"
              className="transition hover:text-orange-600"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Institutions</span>
          </div>

          {/* Page introduction */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-3xl">
              <p className="mb-2 text-sm font-semibold tracking-wider text-orange-300">
                EDUCATION PARTNER MANAGEMENT
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Institution Directory
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage college and university profiles, verify registration
                information, and review institutions applying to join the
                Udyam Sethu platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStatusFilter("Pending")}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Review pending requests
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View all institutions
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5 sm:right-10" />
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

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </section>

          {/* Institution directory */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-bold">Registered Institutions</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {filteredInstitutions.length} institutions
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Institution profiles and registration review status
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    ⌕
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search institutions..."
                    aria-label="Search institutions"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by status"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 px-5 py-4 sm:px-6">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    statusFilter === status
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status === "All" ? "All institutions" : status}
                </button>
              ))}
            </div>

            {/* Desktop and tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[950px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Institution</th>
                    <th className="px-6 py-4 font-semibold">Contact person</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Students</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredInstitutions.map((institution) => (
                    <tr
                      key={institution.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-700">
                            {institution.institutionName
                              .split(" ")
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {institution.institutionName}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {institution.institutionType}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">
                          {institution.contactPerson}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {institution.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {institution.location}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {institution.studentStrength}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={institution.status} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedInstitution(institution)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                          >
                            View
                          </button>

                          {institution.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(institution.id, "Approved")
                                }
                                className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(institution.id, "Rejected")
                                }
                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredInstitutions.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No institutions match your search or selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile institution cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredInstitutions.map((institution) => (
                <article
                  key={institution.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-700">
                      {institution.institutionName
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-800">
                        {institution.institutionName}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {institution.institutionType}
                      </p>
                      <div className="mt-3">
                        <StatusBadge status={institution.status} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-800">
                        Contact:
                      </span>{" "}
                      {institution.contactPerson}
                    </p>
                    <p className="break-all text-slate-600">
                      {institution.email}
                    </p>
                    <p className="text-slate-600">{institution.location}</p>
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-800">
                        Students:
                      </span>{" "}
                      {institution.studentStrength}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInstitution(institution)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View details
                    </button>

                    {institution.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(institution.id, "Approved")
                          }
                          className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(institution.id, "Rejected")
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}

              {filteredInstitutions.length === 0 && (
                <p className="py-10 text-center text-sm text-slate-500">
                  No institutions match your search or selected filter.
                </p>
              )}
            </div>
          </section>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Udyam Sethu Admin Portal · Institution Management · 2026
          </footer>
        </main>
      </div>

      {/* Institution details modal */}
      {selectedInstitution && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onClick={() => setSelectedInstitution(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="institution-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-700">
                  {selectedInstitution.institutionName
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2
                    id="institution-modal-title"
                    className="break-words text-lg font-bold text-slate-900"
                  >
                    {selectedInstitution.institutionName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Institution registration details
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close institution details"
                onClick={() => setSelectedInstitution(null)}
                className="rounded-lg p-2 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              {[
                ["Institution type", selectedInstitution.institutionType],
                ["Contact person", selectedInstitution.contactPerson],
                ["Email address", selectedInstitution.email],
                ["Phone number", selectedInstitution.phone],
                ["Location", selectedInstitution.location],
                ["Affiliation", selectedInstitution.affiliation],
                ["Student strength", selectedInstitution.studentStrength],
                ["Established year", selectedInstitution.establishedYear],
                ["Registration date", selectedInstitution.registrationDate],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {value}
                  </p>
                </div>
              ))}

              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Registration status
                </p>
                <StatusBadge status={selectedInstitution.status} />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setSelectedInstitution(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              {selectedInstitution.status === "Pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      updateStatus(selectedInstitution.id, "Rejected");
                      setSelectedInstitution(null);
                    }}
                    className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateStatus(selectedInstitution.id, "Approved");
                      setSelectedInstitution(null);
                    }}
                    className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Approve institution
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
