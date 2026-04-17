"use client";

import { useState } from "react";
import { Users, Calendar, Activity, Star, TrendingUp } from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";

export default function AdminDashboard() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  const stats = [
    { label: "Total Appointments", value: "1,234", icon: Calendar, trend: "+12.5%", color: "bg-blue-500" },
    { label: "New Patients", value: "324", icon: Users, trend: "+5.2%", color: "bg-emerald-500" },
    { label: "Revenue", value: "$45,231", icon: Activity, trend: "+15.3%", color: "bg-indigo-500" },
    { label: "Avg Rating", value: "4.9", icon: Star, trend: "+0.1", color: "bg-amber-500" },
  ];

  const recentBookings = [
    { id: "1", patient: "Sarah Miller", service: "Teeth Whitening", date: "Oct 24, 2026", time: "10:00 AM", status: "Upcoming" },
    { id: "2", patient: "Michael Chen", service: "General Checkup", date: "Oct 24, 2026", time: "11:30 AM", status: "Upcoming" },
    { id: "3", patient: "Emily Davis", service: "Dental Implants", date: "Oct 24, 2026", time: "02:00 PM", status: "Pending" },
    { id: "4", patient: "James Wilson", service: "Orthodontics", date: "Oct 23, 2026", time: "09:00 AM", status: "Completed" },
  ];

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    alert("New patient added successfully!");
    setPatientModalOpen(false);
  };

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Appointment scheduled successfully!");
    setAppointmentModalOpen(false);
  };

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Report generated and downloaded successfully!");
    setReportModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button 
          onClick={() => setReportModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-slate-800`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</p>
              </div>
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${stat.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Chart/List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Appointments</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 w-1/4">{booking.patient}</td>
                    <td className="px-6 py-4 text-slate-600">{booking.service}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex flex-col">
                        <span>{booking.date}</span>
                        <span className="text-xs text-slate-400">{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        booking.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="space-y-3 mb-8">
            <button 
              onClick={() => setPatientModalOpen(true)}
              className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg text-left hover:bg-slate-50 transition-colors group"
            >
              <span className="font-medium text-slate-700 text-sm">Add New Patient</span>
              <Users className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </button>
            <button 
              onClick={() => setAppointmentModalOpen(true)}
              className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg text-left hover:bg-slate-50 transition-colors group"
            >
              <span className="font-medium text-slate-700 text-sm">Schedule Appointment</span>
              <Calendar className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </button>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-4">Activity Log</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-800">New Booking received</p>
                <p className="text-xs text-slate-500">Sarah Miller for Whitening</p>
                <p className="text-xs text-slate-400 mt-1">10 min ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-800">Payment Processed</p>
                <p className="text-xs text-slate-500">Invoice #INV-2041 Paid</p>
                <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-800">New Contact Message</p>
                <p className="text-xs text-slate-500">Question about insurance</p>
                <p className="text-xs text-slate-400 mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdminModal 
        isOpen={reportModalOpen} 
        onClose={() => setReportModalOpen(false)} 
        title="Generate Report"
      >
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <option>Financial Summary</option>
              <option>Patient Attendance</option>
              <option>Treatment Popularity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
            <div className="flex gap-2 text-sm">
              <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" required />
              <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" required />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
              Download PDF
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal 
        isOpen={patientModalOpen} 
        onClose={() => setPatientModalOpen(false)} 
        title="Add New Patient"
      >
        <form onSubmit={handleCreatePatient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input type="tel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
              Save Patient
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal 
        isOpen={appointmentModalOpen} 
        onClose={() => setAppointmentModalOpen(false)} 
        title="Schedule Appointment"
      >
        <form onSubmit={handleScheduleAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Patient Search</label>
            <input type="text" placeholder="Search by name or ID..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <option>General Checkup & Cleaning</option>
              <option>Teeth Whitening</option>
              <option>Dental Implants</option>
              <option>Orthodontics</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
              <input type="time" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
              Schedule Now
            </button>
          </div>
        </form>
      </AdminModal>

    </div>
  );
}
