"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { toast } from "sonner";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const response = await login({ email, password }).unwrap();
      if (response?.token) {
        dispatch(
          setUser({
            user: {
              name: response?.name,
              email: response?.email,
              id: response?.id,
              role: response?.role || "admin",
            },
            token: response?.token,
          }),
        );
        toast.success("Login successful! Welcome back.");
        router.push("/admin-access");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img src="/logo-bg.png" alt="BrightSmile" className="h-12 w-auto" />
          </div>

          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
              Admin Access
            </h2>
            <p className="text-center text-slate-500 mb-8 text-sm">
              Sign in to manage BrightSmile portal
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all text-sm font-medium"
                    placeholder="admin@brightsmile.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all text-sm font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                className="w-full h-12 mt-4 rounded-2xl font-black uppercase tracking-[0.1em] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing
                    in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} BrightSmile Admin. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
