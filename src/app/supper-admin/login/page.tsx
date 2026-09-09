"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff, AlertCircle, Loader } from "lucide-react";

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/supper-admin/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth token in localStorage
        localStorage.setItem("super_admin_token", data.token);
        localStorage.setItem("super_admin_logged_in", "true");
        
        // Redirect to pending review page
        router.push("/supper-admin/PendingReview");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171b1e] to-[#0f1114] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="text-[48px] leading-none text-[#f5c400]">♕</div>
          </div>
          <h1 className="text-[32px] font-bold text-white mb-2">MBD</h1>
          <p className="text-[14px] text-gray-400">Super Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1e2428] rounded-xl border border-gray-700 p-8 shadow-2xl">
          <h2 className="text-[22px] font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-lg bg-[#161b1e] border border-gray-600 text-white placeholder-gray-500 text-[13px] focus:outline-none focus:border-[#f5c400] focus:ring-1 focus:ring-[#f5c400]"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg bg-[#161b1e] border border-gray-600 text-white placeholder-gray-500 text-[13px] focus:outline-none focus:border-[#f5c400] focus:ring-1 focus:ring-[#f5c400]"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full h-11 rounded-lg bg-[#f5c400] text-[#171b1e] font-semibold text-[14px] hover:bg-[#e5b700] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
            <p className="text-[11px] font-semibold text-gray-400 mb-2">Demo Credentials:</p>
            <p className="text-[12px] text-gray-300">
              <span className="text-gray-400">Username:</span> <span className="text-[#f5c400] font-mono">supperadmin</span>
            </p>
            <p className="text-[12px] text-gray-300">
              <span className="text-gray-400">Password:</span> <span className="text-[#f5c400] font-mono">supperadmin@123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] text-gray-500 mt-6">
          Authorized personnel only. All activities are logged and monitored.
        </p>
      </div>
    </div>
  );
}
