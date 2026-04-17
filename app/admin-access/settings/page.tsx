"use client";

import { Save, User, Mail, Lock, Globe, Bell, Shield, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = ["General", "Security", "Notifications", "Clinic Info"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${activeTab} settings saved successfully!`);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage admin account and application preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 min-h-[400px]">
          <form onSubmit={handleSave}>
            {/* General Settings */}
            {activeTab === "General" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-slate-400" /> Admin Profile
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Admin User"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@brightsmile.com"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                </section>
                
                <section className="pt-6 border-t border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-slate-400" /> Platform Preferences
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                      <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm">
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                      <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "Security" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-slate-400" /> Change Password
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        required
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                      <input 
                        type="password" 
                        required
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        required
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                    </div>
                  </div>
                </section>

                <section className="pt-6 border-t border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-slate-400" /> Two-Factor Authentication
                  </h2>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">Require 2FA for this account</p>
                      <p className="text-slate-500 text-xs mt-1">Add an extra layer of security to your admin account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </section>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "Notifications" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-400" /> Email Notifications
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: 'n1', label: 'New Patient Booking', desc: 'Receive an email when a patient books online.', checked: true },
                      { id: 'n2', label: 'Booking Cancellations', desc: 'Receive an email when an appointment is cancelled.', checked: true },
                      { id: 'n3', label: 'New Contact Form Message', desc: 'Get notified of new inquiries from the website.', checked: true },
                      { id: 'n4', label: 'Weekly Summary Report', desc: 'A digest of all weekly activity sent every Friday.', checked: false },
                    ].map((notif) => (
                      <div key={notif.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{notif.label}</p>
                          <p className="text-slate-500 text-xs mt-1">{notif.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input type="checkbox" className="sr-only peer" defaultChecked={notif.checked} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Clinic Info Settings */}
            {activeTab === "Clinic Info" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-slate-400" /> Clinic Display Details
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">These details will be displayed publicly on the website footer and contact page.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><Mail className="w-4 h-4"/> Contact Email Output</label>
                      <input 
                        type="email" 
                        defaultValue="hello@brightsmile.com"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><Phone className="w-4 h-4"/> Clinic Phone</label>
                      <input 
                        type="text" 
                        defaultValue="(123) 456-7890"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Clinic Address</label>
                      <textarea 
                        defaultValue="123 Dental Ave, Suite 100&#10;New York, NY 10001"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-20 resize-none"
                        required
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            <div className="pt-8 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" /> Save {activeTab} Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
