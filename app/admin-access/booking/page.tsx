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
import { toast } from "sonner";
import {
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "@/src/redux/features/appointments/appointmentsApi";

export default function AdminBookings() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [updateApoinments] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const {
    data: bookingsRes,
    isLoading,
    error,
  } = useGetAllAppointmentsQuery(filter === "all" ? {} : { status: filter });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateApoinments({ id, status: newStatus }).unwrap();
      toast.success(`Appointment marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteAppointment({ id }).unwrap();
        toast.success("Appointment deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete appointment");
      }
    }
  };

  const bookings = bookingsRes || [];

  const searchedBookings = bookings.filter((booking: any) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = booking.patientInfo.name
      .toLowerCase()
      .includes(searchLower);
    const matchesId = booking._id.toLowerCase().includes(searchLower);
    return matchesName || matchesId;
  });

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
                    </div>
                  </td>
                </tr>
              ) : (
                searchedBookings.map((booking: any) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {booking._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">
                        {booking.patientInfo.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {booking.patientInfo.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800">
                        {booking.serviceId?.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {booking.doctorId?.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {booking.timeSlot}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${
                          booking.status === "Confirmed"
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
                        {booking.status === "Confirmed" && (
                          <button
                            onClick={() =>
                              handleStatusChange(booking._id, "Completed")
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
                                handleStatusChange(booking._id, "Confirmed")
                              }
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(booking._id, "Cancelled")
                              }
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Cancel"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && searchedBookings.length === 0 && (
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
        <div className="p-4 text-center text-slate-500">
          Manual booking creation via admin is coming soon. Please use the
          public booking page for now.
        </div>
      </AdminModal>
    </div>
  );
}
