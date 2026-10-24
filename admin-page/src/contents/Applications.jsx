
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

const initialRequests = [
  {
    id: "REQ-1001",
    name: "TechNova Solutions",
    type: "Employer",
    email: "hr@technova.example",
    date: "21 Oct 2026",
    status: "Pending",
    description: "Employer registration request",
  },
  {
    id: "REQ-1002",
    name: "Global Institute of Technology",
    type: "Institution",
    email: "admin@git.example",
    date: "20 Oct 2026",
    status: "Pending",
    description: "Institution registration request",
  },
  {
    id: "REQ-1003",
    name: "BrightPath Technologies",
    type: "Employer",
    email: "careers@brightpath.example",
    date: "19 Oct 2026",
    status: "Pending",
    description: "Employer registration request",
  },
  {
    id: "REQ-1004",
    name: "City College of Engineering",
    type: "Institution",
    email: "office@citycollege.example",
    date: "18 Oct 2026",
    status: "Pending",
    description: "Institution registration request",
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

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700",
    Approved: "bg-emerald-50 text-emerald-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function Application() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notice, setNotice] = useState("");

  const counts = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((r) => r.status === "Pending").length,
      employers: requests.filter((r) => r.type === "Employer").length,
      institutions: requests.filter((r) => r.type === "Institution").length,
    }),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesType =
        activeType === "All" || request.type === activeType;

      const matchesStatus =
        activeFilter === "All" || request.status === activeFilter;

      const matchesSearch = [
        request.id,
        request.name,
        request.email,
        request.type,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [requests, activeType, activeFilter, search]);

  function updateStatus(id, status) {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setSelectedRequest((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );

    setNotice(`Request ${id} ${status.toLowerCase()} successfully.`);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
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
            <h1 className="text-lg font-bold">Udyam Sethu</h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
          <button
            type="button"
            className="ml-auto text-2xl lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
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
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <p className="text-sm font-semibold">Need assistance?</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Contact your platform support team for help.
          </p>
          <p className="mt-6 text-center text-xs text-slate-500">
            © 2026 Udyam Sethu
          </p>
        </div>
      </aside>

      {/* Main page */}
      <div className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-200 p-2 lg:hidden"
              aria-label="Open navigation"
            >
              ☰
            </button>
            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                Application Requests
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Employer and institution registrations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Administrator</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
              A
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Heading */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              Registration Management
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Employer & Institution Requests
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review organizations requesting access to Udyam Sethu.
              Verify their registration details and approve or reject
              each request.
            </p>
          </section>

          {notice && (
            <div
              role="status"
              className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {notice}
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Total Requests",
                value: counts.total,
                icon: "▤",
                color: "bg-orange-50 text-orange-600",
              },
              {
                title: "Pending Review",
                value: counts.pending,
                icon: "◷",
                color: "bg-amber-50 text-amber-600",
              },
              {
                title: "Employer Requests",
                value: counts.employers,
                icon: "▣",
                color: "bg-blue-50 text-blue-600",
              },
              {
                title: "Institution Requests",
                value: counts.institutions,
                icon: "⌂",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${stat.color}`}
                  >
                    {stat.icon}
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Organization registrations
                </p>
              </div>
            ))}
          </section>

          {/* Request list */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Submitted Requests
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review incoming employer and institution registrations.
              </p>

              {/* Type filters */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["All", "Employer", "Institution"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      activeType === type
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {type === "All" ? "All Organizations" : `${type}s`}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search organization or email..."
                  aria-label="Search requests"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                />

                <select
                  value={activeFilter}
                  onChange={(event) => setActiveFilter(event.target.value)}
                  aria-label="Filter by request status"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-400"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4">Request type</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {request.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {request.email}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {request.id}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            request.type === "Employer"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {request.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-slate-600">
                        {request.date}
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedRequest(request)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:border-orange-300 hover:text-orange-600"
                          >
                            Review
                          </button>
                          {request.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(request.id, "Approved")
                                }
                                className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(request.id, "Rejected")
                                }
                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredRequests.map((request) => (
                <article key={request.id} className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-slate-900">
                        {request.name}
                      </h3>
                      <p className="mt-1 break-all text-xs text-slate-500">
                        {request.email}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {request.id}
                      </p>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-medium text-slate-700">
                      {request.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {request.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold"
                    >
                      Review details
                    </button>
                    {request.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(request.id, "Approved")
                          }
                          className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(request.id, "Rejected")
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="px-5 py-14 text-center">
                <p className="text-lg font-semibold text-slate-800">
                  No requests found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try changing the organization, search, or status filters.
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-xs text-slate-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </section>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Udyam Sethu Admin Portal · Registration Requests
          </footer>
        </main>
      </div>

      {/* Review modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Registration review
                </p>
                <h2
                  id="request-title"
                  className="mt-2 text-xl font-bold text-slate-950"
                >
                  {selectedRequest.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedRequest.id}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close review"
                onClick={() => setSelectedRequest(null)}
                className="rounded-lg p-2 text-xl text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Organization", selectedRequest.name],
                ["Registration type", selectedRequest.type],
                ["Contact email", selectedRequest.email],
                ["Submitted date", selectedRequest.date],
                ["Request reference", selectedRequest.id],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-slate-100 pb-3"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">
                  Current status
                </span>
                <StatusBadge status={selectedRequest.status} />
              </div>
            </div>

            {selectedRequest.status === "Pending" ? (
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selectedRequest.id, "Rejected");
                    setSelectedRequest(null);
                  }}
                  className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  Reject request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selectedRequest.id, "Approved");
                    setSelectedRequest(null);
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Approve request
                </button>
              </div>
            ) : (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
