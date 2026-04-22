"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Calendar,
  Activity,
  Star,
  TrendingUp,
  Clock,
  MessageSquare,
  Loader2,
  DollarSign,
  FileText,
  User,
} from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";
import { useGetDashboardStatsQuery } from "@/src/redux/features/dashboard/dashboardApi";
import { format } from "date-fns";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: dashboardData, isLoading } =
    useGetDashboardStatsQuery(undefined);
  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary/30" />
      </div>
    );
  }

  const {
    stats: backendStats,
    recentAppointments,
    recentLogs,
  } = dashboardData || {};

  const stats = [
    {
      label: "Total Appointments",
      value: backendStats?.totalAppointments?.value || "0",
      icon: Calendar,
      trend: `${backendStats?.totalAppointments?.trend || 0}%`,
      color: "bg-blue-600",
      trendUp: true,
    },
    {
      label: "New Patients",
      value: backendStats?.newPatients?.value || "0",
      icon: UserPlus,
      trend: `${backendStats?.newPatients?.trend || 0}%`,
      color: "bg-emerald-600",
      trendUp: true,
    },
    {
      label: "Revenue",
      value: `$${backendStats?.revenue?.value?.toLocaleString() || "0"}`,
      icon: DollarSign,
      trend: `${backendStats?.revenue?.trend || 0}%`,
      color: "bg-violet-600",
      trendUp: true,
    },
    {
      label: "Avg Rating",
      value: backendStats?.avgRatings?.value || "0.0",
      icon: Star,
      trend: backendStats?.avgRatings?.trend || "0",
      color: "bg-amber-500",
      trendUp: true,
    },
  ];

  const getActivityIcon = (module: string) => {
    switch (module?.toLowerCase()) {
      case "appointment":
        return <Calendar className="w-4 h-4" />;
      case "contact":
        return <MessageSquare className="w-4 h-4" />;
      case "system":
        return <Activity className="w-4 h-4" />;
      case "blog":
        return <FileText className="w-4 h-4" />;
      case "doctor":
        return <User className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (module: string) => {
    switch (module?.toLowerCase()) {
      case "appointment":
        return "bg-blue-500";
      case "contact":
        return "bg-amber-500";
      case "system":
        return "bg-emerald-500";
      case "blog":
        return "bg-indigo-500";
      case "doctor":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="space-y-8 animate-fade-up pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">
            Welcome back! Here's a snapshot of your clinic's performance.
          </p>
        </div>
        <Link
          href="/admin-access/booking"
          className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" /> New Booking
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-4 rounded-2xl ${stat.color} shadow-lg shadow-black/10`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 ${stat.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"} text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-full`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest opacity-60">
                  {stat.label}
                </p>
              </div>
              <div
                className={`absolute -right-6 -bottom-6 w-24 h-24 ${stat.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none`}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Chart/List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
              Recent Appointments
            </h2>
            <Link
              href="/admin-access/booking"
              className="text-xs font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 py-4 font-black">Patient</th>
                  <th className="px-6 py-4 font-black">Service</th>
                  <th className="px-6 py-4 font-black">Schedule</th>
                  <th className="px-6 py-4 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentAppointments?.length > 0 ? (
                  recentAppointments.map((booking: any) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5 font-bold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                            {booking.patientInfo?.name?.charAt(0) || "P"}
                          </div>
                          {booking.patientInfo?.name}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-slate-600 font-medium">
                          {booking.serviceId?.title}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-bold">
                            {format(new Date(booking.date), "MMM d, yyyy")}
                          </span>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {booking.timeSlot}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            booking.status === "Confirmed" ||
                            booking.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : booking.status === "Pending" ||
                                  booking.status === "pending"
                                ? "bg-amber-50 text-amber-600 border-amber-100"
                                : booking.status === "Cancelled" ||
                                    booking.status === "cancelled"
                                  ? "bg-rose-50 text-rose-600 border-rose-100"
                                  : "bg-slate-50 text-slate-600 border-slate-100"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400 font-medium italic"
                    >
                      No recent appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
              Activity Log
            </h2>
            <Link
              href="/admin-access/activity-logs"
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary hover:underline"
            >
              See Logs
            </Link>
          </div>
          <div className="space-y-6">
            {recentLogs?.length > 0 ? (
              recentLogs.map((activity: any, idx: number) => (
                <div key={activity._id || idx} className="flex gap-4 group">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-2xl ${getActivityColor(activity.module)} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      {getActivityIcon(activity.module)}
                    </div>
                    {idx !== recentLogs.length - 1 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                        {activity.action}
                      </p>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors">
                        {activity.module}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 italic line-clamp-1">
                      {activity.details}
                    </p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {format(new Date(activity.createdAt), "h:mm a · MMM d")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 font-medium italic text-sm py-4">
                No recent activities.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
