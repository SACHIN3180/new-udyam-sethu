import React, { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+12.5%",
    icon: "👨‍🎓",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Employer Requests",
    value: "24",
    change: "Pending review",
    icon: "🏢",
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Institution Requests",
    value: "12",
    change: "Pending review",
    icon: "🎓",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Active Opportunities",
    value: "86",
    change: "+8 this month",
    icon: "💼",
    color: "bg-green-100 text-green-700",
  },
];

const initialRequests = [
  {
    id: 1,
    name: "TechNova Solutions",
    type: "Employer",
    email: "hr@technova.example",
    date: "21 Oct 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Global Institute of Technology",
    type: "Institution",
    email: "admin@git.example",
    date: "20 Oct 2026",
    status: "Pending",
  },
  {
    id: 3,
    name: "BrightPath Technologies",
    type: "Employer",
    email: "careers@brightpath.example",
    date: "19 Oct 2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "City College of Engineering",
    type: "Institution",
    email: "office@citycollege.example",
    date: "18 Oct 2026",
    status: "Pending",
  },
];

const applications = [
  {
    name: "Ananya Rao",
    initials: "AR",
    course: "Computer Science",
    role: "Frontend Developer",
    date: "21 Oct 2026",
    status: "Under Review",
  },
  {
    name: "Rahul Kumar",
    initials: "RK",
    course: "Mechanical Engineering",
    role: "Graduate Trainee",
    date: "20 Oct 2026",
    status: "Shortlisted",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    course: "Information Science",
    role: "Software Developer",
    date: "19 Oct 2026",
    status: "Under Review",
  },
  {
    name: "Arjun Patel",
    initials: "AP",
    course: "Civil Engineering",
    role: "Site Engineer",
    date: "18 Oct 2026",
    status: "Pending",
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

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [requestFilter, setRequestFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesType =
      requestFilter === "All" || request.type === requestFilter;

    const matchesSearch =
      request.name.toLowerCase().includes(search.toLowerCase()) ||
      request.email.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const updateRequest = (id, status) => {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setMessage(`Request ${status.toLowerCase()} successfully.`);
    setTimeout(() => setMessage(""), 2500);
  };

  const statusClass = (status) => {
    if (status === "Approved" || status === "Shortlisted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Under Review") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-2xl text-slate-400 lg:hidden"
            aria-label="Close navigation"
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
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  item.label === "Overview"
                    ? "bg-orange-500 font-semibold text-white shadow-lg shadow-orange-950/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
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
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-xl lg:hidden"
              aria-label="Open navigation"
            >
              ☰
            </button>

            <div>
              <h2 className="text-lg font-bold sm:text-xl">Dashboard</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your Udyam Sethu platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-lg hover:bg-slate-50"
            >
              ♧
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
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

        <main className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-6 lg:p-8">
          {/* Welcome banner */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-2 text-sm font-medium text-orange-300">
                ADMINISTRATION OVERVIEW
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Welcome back, Administrator!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Monitor student activity, review organization registrations,
                and manage opportunities across the Udyam Sethu platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/admin/companies"
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Review Employers
                </Link>

                <Link
                  to="/admin/institutions"
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Institutions
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5 sm:right-10" />
            <div className="pointer-events-none absolute -bottom-28 right-36 h-64 w-64 rounded-full border-[35px] border-orange-400/10" />
          </section>

          {/* Feedback */}
          {message && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
            >
              {message}
            </div>
          )}

          {/* Statistics */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Platform Overview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  A snapshot of platform activity
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                Sample data
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>
                      <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {stat.value}
                      </h3>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.color}`}
                    >
                      {stat.icon}
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-500">
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Requests */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">Organization Requests</h2>
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                    {requests.filter((request) => request.status === "Pending").length}{" "}
                    pending
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Review employer and institution registrations
                </p>
              </div>

              <Link
                to="/admin/companies"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Manage organizations →
              </Link>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {["All", "Employer", "Institution"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setRequestFilter(filter)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      requestFilter === filter
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter === "All" ? "All Requests" : `${filter}s`}
                  </button>
                ))}
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search organizations..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Organization</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Submitted</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">
                          {request.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {request.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {request.type}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {request.date}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {request.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateRequest(request.id, "Approved")
                              }
                              className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateRequest(request.id, "Rejected")
                              }
                              className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            No action needed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-10 text-center text-slate-500"
                      >
                        No organization requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Applications and quick links */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                <div>
                  <h2 className="text-lg font-bold">Recent Applications</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest student applications across opportunities
                  </p>
                </div>

                <Link
                  to="/admin/applications"
                  className="whitespace-nowrap text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  View all →
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {applications.map((application) => (
                  <div
                    key={application.name}
                    className="flex flex-col gap-3 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                        {application.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-800">
                          {application.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {application.role}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {application.course} · {application.date}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold">Quick Access</h2>
              <p className="mt-1 text-sm text-slate-500">
                Navigate to important admin sections
              </p>

              <div className="mt-5 space-y-3">
                {[
                  {
                    title: "Employer Directory",
                    description: "Review registered companies",
                    icon: "🏢",
                    path: "/admin/companies",
                  },
                  {
                    title: "Institution Directory",
                    description: "Manage college registrations",
                    icon: "🎓",
                    path: "/admin/institutions",
                  },
                  {
                    title: "Platform Reports",
                    description: "View platform activity reports",
                    icon: "📊",
                    path: "/admin/reports",
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg transition group-hover:bg-orange-100">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-600">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Udyam Sethu Admin Portal · Dashboard preview · 2026
          </footer>
        </main>
      </div>
    </div>
  );
}
