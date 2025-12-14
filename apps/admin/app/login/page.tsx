"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // ✅ Persist session if "Remember Me" checked
      if (rememberMe && data.session) {
        localStorage.setItem("supabase.auth.token", JSON.stringify(data.session));
      }

      router.push("/"); // Redirect to dashboard
    } catch (error: any) {
      setErrorMsg(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f5] relative overflow-hidden p-4">
      {/* Header / Branding */}
      <div className="absolute top-0 left-0 w-full py-4 px-8 flex items-center justify-start z-10">
        <h1 className="text-2xl font-extrabold tracking-wide text-[#254137]">
          Flying Passport Tours
        </h1>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-[#254137] text-white shadow-2xl rounded-2xl border-none relative z-20 mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-wide">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-white/50 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/90 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-white h-4 w-4"
                />
                Remember Me
              </label>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-300 text-sm text-center">{errorMsg}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-white text-[#254137] font-semibold hover:bg-[#e6e6e6] transition-all h-11"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="text-[#254137]"
                  >
                    <Plane size={20} />
                  </motion.div>
                  <span className="animate-pulse">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Flying Passport Tours — Admin Access Only
      </p>
    </div>
  );
}
