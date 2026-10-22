
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  BriefcaseBusiness,
  Users,
  UserRound,
} from "lucide-react";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Connect your backend authentication API here.
    console.log({
      email,
      password,
      rememberMe,
    });

    setError("Login API is not connected yet.");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-3xl bg-white shadow-xl sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">

        {/* Left Section */}
        <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-8 sm:px-10 lg:px-14 lg:py-12 xl:px-20">

          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

          {/* Brand */}
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Users size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Udyam <span className="text-blue-600">Sethu</span>
              </h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Connecting Talent | Building Opportunities
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="relative mb-8 mt-12 sm:mt-16 lg:mt-20">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <ShieldCheck size={15} />
              Administration Portal
            </p>

            <h2 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Welcome Back,
              <br />
              <span className="text-blue-600">Admin</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
              Manage requests, monitor progress, and help build a brighter
              future for students and institutions.
            </p>
          </div>

          {/* Illustration */}
          <div className="relative my-auto hidden min-h-48 items-center justify-center sm:flex lg:min-h-64">
            <div className="relative flex h-48 w-full max-w-md items-end justify-center rounded-[40px] bg-gradient-to-br from-blue-100/60 to-indigo-100/70 sm:h-56 lg:h-64">
              <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/70" />
              <div className="absolute right-10 top-10 h-14 w-14 rounded-full bg-blue-200/60" />

              <div className="relative mb-5 flex h-32 w-52 items-center justify-center rounded-t-2xl border-4 border-blue-300 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl sm:h-36 sm:w-60">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white">
                  <UserRound size={34} />
                </div>
              </div>

              <div className="absolute bottom-4 h-3 w-72 rounded-full bg-blue-300/50 blur-sm" />
              <div className="absolute bottom-3 h-2 w-64 rounded-full bg-blue-400/60" />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="relative mt-8 grid grid-cols-1 gap-4 border-t border-blue-100 pt-6 sm:grid-cols-3 lg:mt-10">
            <Feature
              icon={<Building2 size={21} />}
              title="Institutions"
              subtitle="Manage institutions"
            />
            <Feature
              icon={<BriefcaseBusiness size={21} />}
              title="Employers"
              subtitle="Review requests"
            />
            <Feature
              icon={<Users size={21} />}
              title="Students"
              subtitle="Track progress"
            />
          </div>
        </section>

        {/* Right Section */}
        <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-10 lg:bg-slate-50/50 lg:px-12 xl:px-16">
          <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-9 lg:p-10">

            {/* Login Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <UserRound size={40} strokeWidth={1.8} />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Admin Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Enter your credentials to access the admin panel
              </p>
            </div>

            {/* Login Form */}
            <form onClick={()=>{}} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <Mail className="ml-4 shrink-0 text-slate-400" size={20} />

                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <LockKeyhole className="ml-4 shrink-0 text-slate-400" size={20} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full min-w-0 bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="mr-3 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError("Please contact your system administrator to reset your password.")
                  }
                  className="font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                onClick={()=>navigate("/admin/dashboard")}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
              >
                Login
                <ArrowRight size={21} />
              </button>
            </form>

            {/* Secure Footer */}
            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-500 sm:text-sm">
              <span className="h-px flex-1 bg-slate-200" />
              <ShieldCheck size={19} className="text-slate-400" />
              <span>Secure Admin Access</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
