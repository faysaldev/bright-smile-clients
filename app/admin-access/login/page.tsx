"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img src="/logo-bg.png" alt="BrightSmile" className="h-12 w-auto" />
          </div>

          {!isForgot ? (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Access</h2>
              <p className="text-center text-slate-500 mb-8 text-sm">Sign in to manage BrightSmile portal</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="admin@brightsmile.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <button type="button" onClick={() => setIsForgot(true)} className="text-xs text-primary hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="password" 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <Button className="w-full mt-6 gap-2" asChild>
                  <Link href="/admin-access">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </form>
            </div>
          ) : (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Reset Password</h2>
              <p className="text-center text-slate-500 mb-8 text-sm">Enter your email to receive reset instructions</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsForgot(false); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="admin@brightsmile.com"
                      required
                    />
                  </div>
                </div>

                <Button className="w-full mt-6" type="submit">
                  Send Reset Link
                </Button>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => setIsForgot(false)} className="text-sm text-slate-500 hover:text-primary transition-colors">
                    Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} BrightSmile Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
