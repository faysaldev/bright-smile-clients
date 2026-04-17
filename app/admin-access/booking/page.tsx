"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";

export default function AdminBookings() {
  const [filter, setFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const initialBookings = [
    {
      id: "B-1021",
      patient: "Sarah Miller",
      phone: "(555) 123-4567",
      service: "Teeth Whitening",
      date: "2026-10-24",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      status: "Upcoming",
    },
    {
      id: "B-1022",
      patient: "Michael Chen",
      phone: "(555) 987-6543",
      service: "General Checkup",
      date: "2026-10-24",
      time: "11:30 AM",
      doctor: "Dr. Johnson",
      status: "Upcoming",
    },
    {
      id: "B-1023",
      patient: "Emily Davis",
      phone: "(555) 456-7890",
      service: "Dental Implants",
      date: "2026-10-24",
      time: "02:00 PM",
      doctor: "Dr. Williams",
      status: "Pending",
    },
    {
      id: "B-1024",
      patient: "James Wilson",
      phone: "(555) 789-0123",
      service: "Orthodontics",
      date: "2026-10-23",
      time: "09:00 AM",
      doctor: "Dr. Smith",
      status: "Completed",
    },
    {
      id: "B-1025",
      patient: "Patricia Brown",
      phone: "(555) 234-5678",
      service: "Root Canal",
      date: "2026-10-23",
      time: "01:30 PM",
      doctor: "Dr. Johnson",
      status: "Cancelled",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  const handleAddBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBooking = {
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      patient: formData.get("patient") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      doctor: formData.get("doctor") as string,
      status: "Upcoming",
    };
    setBookings([newBooking, ...bookings]);
    setAddModalOpen(false);
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status.toLowerCase() === filter);

  return (
    <div className="space-y-6 animate-fade-up min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Booking Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and track patient appointments.
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" /> Add Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient or ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Patient Info</th>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-600">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">
                      {booking.patient}
                    </p>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-800">{booking.service}</p>
                    <p className="text-xs text-slate-500">{booking.doctor}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-800">{booking.date}</p>
                    <p className="text-xs text-slate-500">{booking.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${
                        booking.status === "Upcoming"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : booking.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : booking.status === "Cancelled"
                              ? "bg-red-50 text-red-600 border-red-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {booking.status === "Upcoming" && (
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "Completed")
                          }
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="Mark Completed"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "Upcoming")
                            }
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "Cancelled")
                            }
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No bookings found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Booking"
      >
        <form onSubmit={handleAddBooking} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Patient Name
              </label>
              <input
                name="patient"
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Service
              </label>
              <select
                name="service"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              >
                <option>General Checkup</option>
                <option>Teeth Whitening</option>
                <option>Dental Implants</option>
                <option>Orthodontics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Doctor
              </label>
              <select
                name="doctor"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              >
                <option>Dr. Smith</option>
                <option>Dr. Johnson</option>
                <option>Dr. Williams</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                name="date"
                type="date"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Time
              </label>
              <input
                name="time"
                type="time"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Save Booking
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
