
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

const initialReports = [
  {
    id: "RPT-1001",
    title: "Monthly Recruitment Activity",
    organization: "TechNova Solutions",
    source: "Employer",
    category: "Recruitment",
    submittedBy: "Rahul Sharma",
    date: "21 Oct 2026",
    priority: "High",
    status: "Submitted",
    description:
      "Monthly summary of job postings, candidate applications, interviews, and recruitment progress.",
  },
  {
    id: "RPT-1002",
    title: "Student Placement Progress",
    organization: "Global Institute of Technology",
    source: "Institution",
    category: "Placement",
    submittedBy: "Dr. Ramesh Kumar",
    date: "20 Oct 2026",
    priority: "Medium",
    status: "Under Review",
    description:
      "Placement progress report covering eligible students, employer engagement, and placement outcomes.",
  },
  {
    id: "RPT-1003",
    title: "Internship Completion Report",
    organization: "BrightPath Technologies",
    source: "Employer",
    category: "Internship",
    submittedBy: "Priya Mehta",
    date: "19 Oct 2026",
    priority: "Low",
    status: "Reviewed",
    description:
      "Summary of internship completion, student participation, and mentor feedback.",
  },
  {
    id: "RPT-1004",
    title: "Academic Performance Summary",
    organization: "City College of Engineering",
    source: "Institution",
    category: "Academic",
    submittedBy: "Prof. Meera Rao",
    date: "18 Oct 2026",
    priority: "High",
    status: "Submitted",
    description:
      "Institution-level academic performance summary prepared for platform review.",
  },
  {
    id: "RPT-1005",
    title: "Hiring Requirements Update",
    organization: "NextWave Analytics",
    source: "Employer",
    category: "Recruitment",
    submittedBy: "Kiran Kumar",
    date: "16 Oct 2026",
    priority: "Medium",
    status: "Under Review",
    description:
      "Updated hiring requirements, preferred skills, and planned recruitment activity.",
  },
  {
    id: "RPT-1006",
    title: "Skill Development Activities",
    organization: "Greenfield Degree College",
    source: "Institution",
    category: "Training",
    submittedBy: "Anitha Sharma",
    date: "14 Oct 2026",
    priority: "Low",
    status: "Reviewed",
    description:
      "Summary of skill-development sessions, student participation, and training outcomes.",
  },
];

const statusStyles = {
  Submitted: "bg-amber-50 text-amber-700",
  "Under Review": "bg-blue-50 text-blue-700",
  Reviewed: "bg-emerald-50 text-emerald-700",
};

const priorityStyles = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-orange-50 text-orange-700",
  Low: "bg-slate-100 text-slate-600",
};

function Badge({ children, color }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
        color || "bg-slate-100 text-slate-600"
      }`}
    >
      {children}
    </span>
  );
}

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [message, setMessage] = useState("");

  const filteredReports = reports.filter((report) => {
    const query = search.toLowerCase().trim();

    const matchesSearch = [
      report.id,
      report.title,
      report.organization,
      report.submittedBy,
      report.category,
    ].some((value) => value.toLowerCase().includes(query));

    return (
      matchesSearch &&
      (sourceFilter === "All" || report.source === sourceFilter) &&
      (statusFilter === "All" || report.status === statusFilter)
    );
  });

  const stats = [
    {
      title: "Total Reports",
      value: reports.length,
      detail: "All submitted reports",
      icon: "📑",
      style: "bg-blue-50 text-blue-700",
    },
    {
      title: "Employer Reports",
      value: reports.filter((r) => r.source === "Employer").length,
      detail: "Submitted by companies",
      icon: "🏢",
      style: "bg-orange-50 text-orange-700",
    },
    {
      title: "Institution Reports",
      value: reports.filter((r) => r.source === "Institution").length,
      detail: "Submitted by institutions",
      icon: "🎓",
      style: "bg-purple-50 text-purple-700",
    },
    {
      title: "Awaiting Review",
      value: reports.filter((r) => r.status !== "Reviewed").length,
      detail: "Require admin attention",
      icon: "⏳",
      style: "bg-amber-50 text-amber-700",
    },
  ];

  const updateReportStatus = (id, status) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );

    setSelectedReport((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );

    setMessage(`${id} marked as ${status.toLowerCase()}.`);
  };

  const exportCSV = () => {
    const columns = [
      "Report ID",
      "Title",
      "Organization",
      "Source",
      "Category",
      "Submitted By",
      "Date",
      "Priority",
      "Status",
    ];

    const rows = filteredReports.map((r) => [
      r.id,
      r.title,
      r.organization,
      r.source,
      r.category,
      r.submittedBy,
      r.date,
      r.priority,
      r.status,
    ]);

    const csvValue = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [columns, ...rows]
      .map((row) => row.map(csvValue).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "udyam-sethu-reports.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

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
              <h2 className="text-lg font-bold sm:text-xl">Reports</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Review reports submitted by organizations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Administrator</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/dashboard" className="hover:text-orange-600">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Reports</span>
          </div>

          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-semibold tracking-wider text-orange-300">
                REPORTING & COMPLIANCE
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Organization Reports
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Centralize employer and institution submissions, review
                recruitment and placement updates, and track reports requiring
                administrative attention.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStatusFilter("Submitted")}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold hover:bg-orange-600"
                >
                  Review new reports
                </button>
                <button
                  type="button"
                  onClick={exportCSV}
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Export CSV ↓
                </button>
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

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{stat.detail}</p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.style}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold">Submitted Reports</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Browse submissions, inspect details, and record review status.
                </p>
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports or organizations..."
                aria-label="Search reports"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:max-w-sm"
              />
            </div>

            <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6">
              <div className="flex flex-wrap gap-2">
                {["All", "Employer", "Institution"].map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setSourceFilter(source)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold ${
                      sourceFilter === source
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {source === "All" ? "All sources" : source}
                  </button>
                ))}
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter report status"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400"
              >
                <option value="All">All statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Reviewed">Reviewed</option>
              </select>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Report</th>
                    <th className="px-5 py-4 font-semibold">Submitted by</th>
                    <th className="px-5 py-4 font-semibold">Source</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Priority</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {report.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {report.id} · {report.organization}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{report.submittedBy}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {report.category}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          color={
                            report.source === "Employer"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-purple-50 text-purple-700"
                          }
                        >
                          {report.source}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                        {report.date}
                      </td>
                      <td className="px-5 py-4">
                        <Badge color={priorityStyles[report.priority]}>
                          {report.priority}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge color={statusStyles[report.status]}>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedReport(report)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                        >
                          View report
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                        No reports match your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {filteredReports.map((report) => (
                <article
                  key={report.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-orange-600">
                        {report.id}
                      </p>
                      <h3 className="mt-1 break-words font-semibold">
                        {report.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {report.organization}
                      </p>
                    </div>
                    <Badge color={statusStyles[report.status]}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      color={
                        report.source === "Employer"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-purple-50 text-purple-700"
                      }
                    >
                      {report.source}
                    </Badge>
                    <Badge color={priorityStyles[report.priority]}>
                      {report.priority} priority
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    {report.submittedBy} · {report.date}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:border-orange-300 hover:bg-orange-50"
                  >
                    View report details
                  </button>
                </article>
              ))}
              {filteredReports.length === 0 && (
                <p className="py-10 text-center text-sm text-slate-500">
                  No reports match your search or filters.
                </p>
              )}
            </div>
          </section>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Udyam Sethu Admin Portal · Reports & Compliance · 2026
          </footer>
        </main>
      </div>

      {selectedReport && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold text-orange-600">
                  {selectedReport.id}
                </p>
                <h2
                  id="report-modal-title"
                  className="mt-1 text-lg font-bold text-slate-900"
                >
                  {selectedReport.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedReport.organization}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close report details"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 text-xl text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <Badge
                  color={
                    selectedReport.source === "Employer"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-purple-50 text-purple-700"
                  }
                >
                  {selectedReport.source}
                </Badge>
                <Badge color={priorityStyles[selectedReport.priority]}>
                  {selectedReport.priority} priority
                </Badge>
                <Badge color={statusStyles[selectedReport.status]}>
                  {selectedReport.status}
                </Badge>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {selectedReport.description}
              </p>

              <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                {[
                  ["Category", selectedReport.category],
                  ["Submitted by", selectedReport.submittedBy],
                  ["Submission date", selectedReport.date],
                  ["Organization type", selectedReport.source],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              {selectedReport.status !== "Reviewed" && (
                <button
                  type="button"
                  onClick={() => {
                    updateReportStatus(selectedReport.id, "Reviewed");
                    setSelectedReport(null);
                  }}
                  className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Mark as reviewed
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
