"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";
import { toast } from "sonner";
import {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useCheckAvailabilityQuery,
} from "@/src/redux/features/appointments/appointmentsApi";
import { useGetAllServicesQuery } from "@/src/redux/features/services/servicesApi";
import { useGetAllDoctorsQuery } from "@/src/redux/features/doctors/doctorsApi";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Clock,
  Sparkles,
  User,
  Download,
  Stethoscope,
  Info,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/src/hooks/useGsap";


const BookingDownloadButton = dynamic(
  () => import("@/src/components/booking/BookingDownloadButton"),
  { ssr: false },
);


export default function AdminBookings() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Manual Booking State
  const [modalStep, setModalStep] = useState(1);
  const [manualBooking, setManualBooking] = useState({
    serviceId: "",
    doctorId: "",
    date: "",
    timeSlot: "",
    patientInfo: {
      name: "",
      email: "",
      phone: "",
      isNewPatient: true,
      notes: "",
    },
  });

  const [updateApoinments] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();

  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addModalOpen && stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [modalStep, addModalOpen]);

  const { data: services, isLoading: loadingServices } = useGetAllServicesQuery(undefined);

  const { data: doctors, isLoading: loadingDoctors } = useGetAllDoctorsQuery(undefined);
  const { data: availableSlots, isFetching: loadingSlots } = useCheckAvailabilityQuery(
    { doctorId: manualBooking.doctorId, date: manualBooking.date },
    { skip: !manualBooking.doctorId || !manualBooking.date },
  );


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

  const handleManualNext = async () => {
    if (modalStep === 4) {
      try {
        await createAppointment({
          serviceId: manualBooking.serviceId,
          doctorId: manualBooking.doctorId,
          date: manualBooking.date,
          timeSlot: manualBooking.timeSlot,
          patientInfo: manualBooking.patientInfo,
        }).unwrap();
        setModalStep(5);
        toast.success("Manual booking created successfully!");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create booking");
      }
    } else {
      setModalStep((prev) => prev + 1);
    }
  };

  const resetManualModal = () => {
    setAddModalOpen(false);
    setModalStep(1);
    setManualBooking({
      serviceId: "",
      doctorId: "",
      date: "",
      timeSlot: "",
      patientInfo: {
        name: "",
        email: "",
        phone: "",
        isNewPatient: true,
        notes: "",
      },
    });
  };

  const selectedService = services?.find((s: any) => s._id === manualBooking.serviceId);
  const selectedDoctor = doctors?.find((d: any) => d._id === manualBooking.doctorId);


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
          <CalendarIcon className="w-4 h-4" /> Add Booking
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
                      <div className="scale-75 origin-right">
                        <BookingDownloadButton
                          data={{
                            patientName: booking.patientInfo.name,
                            patientEmail: booking.patientInfo.email,
                            patientPhone: booking.patientInfo.phone,
                            service: booking.serviceId?.title || "N/A",
                            doctor: booking.doctorId?.name || "N/A",
                            date: new Date(booking.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                            time: booking.timeSlot,
                          }}
                        />
                      </div>
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
        onClose={resetManualModal}
        title="Add New Manual Booking"
      >
        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar px-1">
          <div className="px-6 pb-6">
            {/* Enhanced Stepper */}
            <div className="relative flex items-center justify-between mb-10 px-4 pt-2">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -translate-y-1/2 z-0" 
              style={{ width: `${((modalStep - 1) / 3) * 100}%` }}
            />
            
            {[
              { step: 1, icon: Stethoscope, label: "Service" },
              { step: 2, icon: User, label: "Doctor" },
              { step: 3, icon: Clock, label: "Time" },
              { step: 4, icon: Info, label: "Info" },
            ].map((s) => (
              <div key={s.step} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4",
                    s.step < modalStep
                      ? "bg-primary border-primary text-white scale-90"
                      : s.step === modalStep
                        ? "bg-white border-primary text-primary scale-110 shadow-xl shadow-primary/20"
                        : "bg-white border-slate-100 text-slate-400",
                  )}
                >
                  {s.step < modalStep ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter transition-colors duration-300",
                  s.step === modalStep ? "text-primary" : "text-slate-400"
                )}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div ref={stepRef} key={modalStep}>
            {modalStep === 1 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Choose Service</h3>
                  <p className="text-sm text-slate-500">Select the dental treatment for this booking.</p>
                </div>
                {loadingServices ? (
                  <div className="grid grid-cols-1 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {services?.map((s: any) => (
                      <button
                        key={s._id}
                        onClick={() => setManualBooking({ ...manualBooking, serviceId: s._id })}
                        className={cn(
                          "group relative w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                          manualBooking.serviceId === s._id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                        )}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                              manualBooking.serviceId === s._id ? "bg-primary text-white" : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                            )}>
                              <Stethoscope className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-slate-700">{s.title}</span>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                            manualBooking.serviceId === s._id ? "bg-primary border-primary" : "border-slate-200"
                          )}>
                            {manualBooking.serviceId === s._id && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {modalStep === 2 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Select Specialist</h3>
                  <p className="text-sm text-slate-500">Assign a doctor to this appointment.</p>
                </div>
                {loadingDoctors ? (
                  <div className="grid grid-cols-1 gap-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {doctors?.map((d: any) => (
                      <button
                        key={d._id}
                        onClick={() => setManualBooking({ ...manualBooking, doctorId: d._id })}
                        className={cn(
                          "group w-full text-left p-4 rounded-2xl border-2 transition-all duration-300",
                          manualBooking.doctorId === d._id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-slate-200 overflow-hidden shadow-sm">
                              {d.image ? (
                                <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                                  {d.name[0]}
                                </div>
                              )}
                            </div>
                            {manualBooking.doctorId === d._id && (
                              <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 border-2 border-white shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800">{d.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{d.role}</p>
                          </div>
                          <div className="bg-slate-100 group-hover:bg-primary/10 px-3 py-1 rounded-full transition-colors">
                            <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary uppercase tracking-wider">Expert</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {modalStep === 3 && (
              <div className="space-y-6">
                <div className="mb-2 text-center">
                  <h3 className="text-xl font-bold text-slate-800">Schedule Time</h3>
                  <p className="text-sm text-slate-500">Pick a preferred date and session.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 mx-auto lg:mx-0">
                    <Calendar
                      mode="single"
                      selected={manualBooking.date ? new Date(manualBooking.date) : undefined}
                      onSelect={(date) =>
                        setManualBooking({
                          ...manualBooking,
                          date: date ? date.toISOString().split("T")[0] : "",
                          timeSlot: "",
                        })
                      }
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-xl"
                    />
                  </div>
                  {manualBooking.date && (
                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex items-center gap-2 px-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Available Sessions</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {loadingSlots ? (
                          [1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-10 bg-slate-50 animate-pulse rounded-xl" />
                          ))
                        ) : (
                          availableSlots?.allSlots?.map((t: string) => {
                            const isBooked = availableSlots.bookedSlots?.includes(t);
                            return (
                              <button
                                key={t}
                                disabled={isBooked}
                                onClick={() => setManualBooking({ ...manualBooking, timeSlot: t })}
                                className={cn(
                                  "group relative py-2.5 rounded-xl border-2 text-[10px] font-bold transition-all duration-300",
                                  manualBooking.timeSlot === t
                                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                    : isBooked
                                      ? "bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed opacity-50"
                                      : "border-slate-100 hover:border-primary/40 hover:bg-white text-slate-600",
                                )}
                              >
                                {t}
                                {isBooked && <span className="absolute top-0 right-0 text-[5px] bg-slate-200 text-slate-400 px-1 rounded-bl-lg">FULL</span>}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {modalStep === 4 && (
              <div className="space-y-6">
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Patient Details</h3>
                  <p className="text-sm text-slate-500">Finalize the booking with patient information.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      className="rounded-2xl border-2 border-slate-100 focus:border-primary py-6 transition-all"
                      value={manualBooking.patientInfo.name}
                      onChange={(e) =>
                        setManualBooking({
                          ...manualBooking,
                          patientInfo: { ...manualBooking.patientInfo, name: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                      <Input
                        placeholder="email@example.com"
                        className="rounded-2xl border-2 border-slate-100 focus:border-primary py-6 transition-all"
                        value={manualBooking.patientInfo.email}
                        onChange={(e) =>
                          setManualBooking({
                            ...manualBooking,
                            patientInfo: { ...manualBooking.patientInfo, email: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone</label>
                      <Input
                        placeholder="+1 234 567 890"
                        className="rounded-2xl border-2 border-slate-100 focus:border-primary py-6 transition-all"
                        value={manualBooking.patientInfo.phone}
                        onChange={(e) =>
                          setManualBooking({
                            ...manualBooking,
                            patientInfo: { ...manualBooking.patientInfo, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Notes (Optional)</label>
                    <textarea
                      placeholder="Any specific instructions..."
                      className="w-full rounded-2xl border-2 border-slate-100 bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                      rows={3}
                      value={manualBooking.patientInfo.notes}
                      onChange={(e) =>
                        setManualBooking({
                          ...manualBooking,
                          patientInfo: { ...manualBooking.patientInfo, notes: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">Booking Summary</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Treatment</p>
                        <p className="text-sm font-bold truncate">{selectedService?.title}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Doctor</p>
                        <p className="text-sm font-bold truncate">{selectedDoctor?.name}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Appointment</p>
                        <p className="text-sm font-bold">{new Date(manualBooking.date).toLocaleDateString()} at {manualBooking.timeSlot}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 5 && (
              <div className="text-center py-12 space-y-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-emerald-200">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-md animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">Confirmed!</h3>
                  <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                    The manual booking for <span className="font-bold text-slate-800">{manualBooking.patientInfo.name}</span> has been successfully recorded.
                  </p>
                </div>
                <div className="pt-6 flex flex-col gap-4 max-w-sm mx-auto">
                  <div className="p-1 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <BookingDownloadButton
                      data={{
                        patientName: manualBooking.patientInfo.name,
                        patientEmail: manualBooking.patientInfo.email,
                        patientPhone: manualBooking.patientInfo.phone,
                        service: selectedService?.title || "",
                        doctor: selectedDoctor?.name || "",
                        date: new Date(manualBooking.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }),
                        time: manualBooking.timeSlot,
                      }}
                    />
                  </div>
                  <Button onClick={resetManualModal} variant="outline" className="rounded-2xl py-6 font-bold border-2 border-slate-100 hover:bg-slate-50">
                    Finish & Close
                  </Button>
                </div>
              </div>
            )}

            {/* Enhanced Footer Actions */}
            {modalStep < 5 && (
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => modalStep === 1 ? resetManualModal() : setModalStep(modalStep - 1)}
                  className="gap-2 rounded-2xl px-6 py-6 text-slate-500 font-bold hover:bg-slate-50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> {modalStep === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                  onClick={handleManualNext}
                  disabled={
                    (modalStep === 1 && !manualBooking.serviceId) ||
                    (modalStep === 2 && !manualBooking.doctorId) ||
                    (modalStep === 3 && (!manualBooking.date || !manualBooking.timeSlot)) ||
                    (modalStep === 4 && (!manualBooking.patientInfo.name || !manualBooking.patientInfo.phone)) ||
                    isSubmitting
                  }
                  className={cn(
                    "gap-3 rounded-2xl px-10 py-6 font-bold shadow-xl transition-all duration-300",
                    isSubmitting ? "bg-slate-200" : "bg-primary hover:scale-[1.02] hover:shadow-primary/30"
                  )}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />
                  ) : (
                    <>
                      {modalStep === 4 ? "Complete Booking" : "Next Step"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </AdminModal>



    </div>
  );
}
