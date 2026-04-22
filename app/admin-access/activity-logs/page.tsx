"use client";

import { useGetActivityLogsQuery } from "@/src/redux/features/dashboard/dashboardApi";
import { format } from "date-fns";
import {
  Clock,
  Calendar,
  MessageSquare,
  User,
  Settings,
  Activity,
  Search,
  Filter,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function ActivityLogs() {
  const { data: logs, isLoading } = useGetActivityLogsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  console.log(logs);

  const getActivityIcon = (module: string) => {
    switch (module?.toLowerCase()) {
      case "appointment":
        return <Calendar className="w-5 h-5" />;
      case "contact":
        return <MessageSquare className="w-5 h-5" />;
      case "doctor":
        return <User className="w-5 h-5" />;
      case "setting":
        return <Settings className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (module: string) => {
    switch (module?.toLowerCase()) {
      case "appointment":
        return "bg-blue-500 text-blue-600";
      case "contact":
        return "bg-amber-500 text-amber-600";
      case "doctor":
        return "bg-indigo-500 text-indigo-600";
      case "setting":
        return "bg-slate-500 text-slate-600";
      default:
        return "bg-emerald-50 text-emerald-600";
    }
  };

  const filteredLogs = logs?.filter((log: any) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || log.module === filterType;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary/30" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Audit Logs
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">
            Track every important event happening across your platform.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {/* Filters Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search actions or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 md:w-48 px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary transition-all shadow-sm appearance-none outline-none"
            >
              <option value="all">All Activities</option>
              <option value="Appointment">Appointments</option>
              <option value="Contact">Inquiries</option>
            </select>
          </div>
        </div>

        {/* Logs Timeline */}
        <div className="p-8">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-100 before:via-slate-100 before:to-transparent">
            {filteredLogs?.length > 0 ? (
              filteredLogs.map((log: any, idx: number) => {
                const colorClass = getActivityColor(log.module);
                const [bgColor, textColor] = colorClass.split(" ");

                return (
                  <div
                    key={log._id || idx}
                    className="relative flex items-start gap-8 group"
                  >
                    {/* Timeline Dot/Icon */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-2xl ${bgColor} text-white border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      {getActivityIcon(log.module)}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 transition-all duration-300 group-hover:bg-white group-hover:shadow-xl group-hover:border-primary/10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-black text-slate-800 tracking-tight">
                            {log.action}
                          </h3>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${bgColor} text-white`}
                          >
                            {log.module}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {format(
                            new Date(log.createdAt),
                            "MMM d, yyyy · h:mm a",
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                        {log.details}
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-100/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-black uppercase">
                            {log.user?.name?.charAt(0) || "A"}
                          </div>
                          <span className="text-xs font-bold text-slate-500">
                            Performed by {log.user?.name || "System Admin"}
                          </span>
                        </div>
                        <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                          View Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                  No activity logs found
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Try adjusting your search or filter to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
