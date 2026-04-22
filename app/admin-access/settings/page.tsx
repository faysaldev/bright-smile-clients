"use client";

import { Lock, Mail, Globe, Clock, ShieldCheck, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const currentUser = useSelector(selectCurrentUser);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    // Simulation of password change
    toast.success("Password change request submitted!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-4xl animate-fade-up space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 text-sm font-medium italic opacity-70">
          Manage your administrative profile and security preferences.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {/* Top Tab Section */}
        <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
          {[
            { id: "Profile", icon: UserIcon, label: "Admin Profile" },
            { id: "Security", icon: ShieldCheck, label: "Login & Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm border border-slate-200/60 scale-[1.01]"
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary" : "text-slate-300"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 sm:p-12 min-h-[500px]">
          {activeTab === "Profile" && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-10 border-b border-slate-50">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-xl shadow-primary/5">
                  <UserIcon className="w-10 h-10" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentUser?.name || "System Admin"}</h2>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Platform Administrator
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Account Identification
                  </h3>
                  <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <p className="text-base font-bold text-slate-700 tracking-tight">{currentUser?.email || "admin@brightsmile.com"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" /> Localization Defaults
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Language</label>
                          <p className="text-sm font-bold text-slate-700">English (United States)</p>
                        </div>
                        <span className="px-2 py-1 rounded-lg bg-slate-200 text-[8px] font-black uppercase text-slate-600">Default</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">System Timezone</label>
                      <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                        <Clock className="w-4 h-4 text-primary/50" />
                        (GMT+06:00) Dhaka, Bangladesh
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-amber-50/50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-sm border border-amber-50">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-amber-800 font-bold uppercase tracking-tight mb-1">Administrative Restriction</p>
                  <p className="text-[11px] text-amber-700/80 font-medium leading-relaxed">
                    Account identity details are managed by the root system administrator. If you need to update your primary email or localization settings, please contact the IT support department.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="pb-8 border-b border-slate-50">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                  <Lock className="w-8 h-8 text-primary" /> Security & Access
                </h2>
                <p className="text-slate-400 text-sm font-medium mt-1.5 italic opacity-80">Keep your administrative access secure with regular password updates.</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-8 max-w-lg mx-auto sm:mx-0">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Current Password</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="h-14 rounded-2xl border-2 border-slate-100 focus:border-primary transition-all bg-slate-50/30 font-medium"
                    required
                  />
                </div>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px bg-slate-100 flex-1" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">New Credentials</span>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">New Password</label>
                    <Input 
                      type="password" 
                      placeholder="Min. 8 chars"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="h-14 rounded-2xl border-2 border-slate-100 focus:border-primary transition-all bg-slate-50/30 font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Repeat Password</label>
                    <Input 
                      type="password" 
                      placeholder="Confirm match"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="h-14 rounded-2xl border-2 border-slate-100 focus:border-primary transition-all bg-slate-50/30 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full sm:w-auto px-12 h-14 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    Update Password
                  </Button>
                </div>
              </form>

              <div className="pt-10 border-t border-slate-50">
                <div className="flex items-center gap-4 p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-900 uppercase tracking-tight">Encryption Active</p>
                    <p className="text-[10px] text-emerald-700/70 font-medium mt-0.5">Your data and session are protected by end-to-end industry standard encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
