"use client";

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";
import { setNextStep, setPrevStep, setService, setDoctor, setDateTime, setPatientInfo, resetBooking } from "@/src/redux/features/booking/bookingSlice";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import { cn } from "@/src/lib/utils";
import { CalendarCheck, User, Clock, CheckCircle, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "@/src/hooks/useGsap";
import { useGetAllServicesQuery } from "@/src/redux/features/services/servicesApi";
import { useGetAllDoctorsQuery } from "@/src/redux/features/doctors/doctorsApi";
import { useCheckAvailabilityQuery, useCreateAppointmentMutation } from "@/src/redux/features/appointments/appointmentsApi";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const BookingDownloadButton = dynamic(() => import("@/src/components/booking/BookingDownloadButton"), { ssr: false });

const stepsConfig = [
  { label: "Service", icon: CalendarCheck },
  { label: "Doctor", icon: User },
  { label: "Date & Time", icon: Clock },
  { label: "Confirm", icon: CheckCircle },
];

export default function BookingPage() {
  const dispatch = useDispatch();
  const { step, serviceId, doctorId, date, timeSlot, patientInfo } = useSelector((state: RootState) => state.booking);
  const contentRef = useRef<HTMLDivElement>(null);
  const { data: services, isLoading: loadingServices } = useGetAllServicesQuery(undefined);
  const { data: doctors, isLoading: loadingDoctors } = useGetAllDoctorsQuery(undefined);
  const { data: availableSlots, isFetching: loadingSlots } = useCheckAvailabilityQuery({ doctorId: doctorId!, date: date! }, { skip: !doctorId || !date });
  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();

  const canNext = () => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!doctorId;
    if (step === 3) return !!date && !!timeSlot;
    if (step === 4) return !!patientInfo?.name && !!patientInfo?.email && !!patientInfo?.phone;
    return false;
  };

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, [step]);

  const handleNext = async () => {
    if (step === 4) {
      try {
        await createAppointment({ serviceId: serviceId!, doctorId: doctorId!, date: date!, timeSlot: timeSlot!, patientInfo: { name: patientInfo!.name, email: patientInfo!.email, phone: patientInfo!.phone, isNewPatient: patientInfo!.isNewPatient, notes: patientInfo!.notes } }).unwrap();
        dispatch(setNextStep());
        toast.success("Appointment booked successfully!");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to book appointment");
      }
    } else if (canNext()) {
      dispatch(setNextStep());
    }
  };

  const selectedService = services?.find((s: any) => s._id === serviceId);
  const selectedDoctor = doctors?.find((d: any) => d._id === doctorId);

  const renderTimeSlots = (slots: string[], period: string, icon: React.ReactNode, label: string) => {
    if (!slots.some((t) => t.includes(period))) return null;
    return (
      <div>
        <div className="flex items-center gap-2 mb-3 text-slate-500">{icon}<span className="text-[11px] font-bold uppercase tracking-wider">{label}</span></div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.filter((t) => t.includes(period)).map((t) => {
            const isBooked = availableSlots?.bookedSlots?.includes(t);
            return (
              <button key={t} disabled={isBooked} onClick={() => dispatch(setDateTime({ date: date!, timeSlot: t }))}
                className={cn("px-3 py-2.5 rounded-xl border-2 text-xs transition-all font-semibold relative overflow-hidden",
                  timeSlot === t ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10" : isBooked ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-60" : "border-border hover:border-primary/40 hover:bg-secondary/50")}>
                {t}
                {isBooked && (<div className="absolute inset-0 flex items-center justify-center bg-slate-50/10 backdrop-blur-[0.5px]"><span className="text-[8px] bg-slate-200 text-slate-500 px-1 rounded-sm">FULL</span></div>)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-16 pt-8">
      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Appointments</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mt-2 mb-2">Book Your Appointment</h1>
            <p className="text-muted-foreground text-lg">Quick and easy online booking in 4 simple steps.</p>
          </div>

          <div className="flex items-center justify-between mb-10">
            {stepsConfig.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500", i + 1 < step ? "bg-primary text-primary-foreground scale-90" : i + 1 === step ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30" : "bg-secondary text-muted-foreground")}>
                  {i + 1 < step ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                {i < stepsConfig.length - 1 && (<div className={cn("w-8 sm:w-16 h-0.5 mx-2 transition-colors duration-500", i + 1 < step ? "bg-primary" : "bg-border")} />)}
              </div>
            ))}
          </div>

          <div className="glass-card p-8 sm:p-10 rounded-3xl min-h-[400px]">
            <div ref={contentRef} key={step}>
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl mb-6">Choose a Service</h3>
                  {loadingServices ? (<div className="space-y-3">{[1,2,3].map((i) => (<div key={i} className="h-14 bg-muted animate-pulse rounded-xl" />))}</div>) : (
                    services?.map((s: any) => (
                      <button key={s._id} onClick={() => dispatch(setService(s._id))} className={cn("w-full text-left px-6 py-4 rounded-xl border-2 transition-all text-sm font-medium group", serviceId === s._id ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10" : "border-border hover:border-primary/40 hover:bg-secondary/50")}>
                        <div className="flex items-center justify-between"><span>{s.title}</span><div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", serviceId === s._id ? "border-primary bg-primary" : "border-border")}>{serviceId === s._id && <CheckCircle className="w-3 h-3 text-primary-foreground" />}</div></div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-xl mb-6">Choose Your Doctor</h3>
                  {loadingDoctors ? (<div className="space-y-4">{[1,2].map((i) => (<div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />))}</div>) : (
                    doctors?.map((d: any) => (
                      <button key={d._id} onClick={() => dispatch(setDoctor(d._id))} className={cn("w-full text-left px-6 py-5 rounded-xl border-2 transition-all group", doctorId === d._id ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-border hover:border-primary/40")}>
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors overflow-hidden", doctorId === d._id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                            {d.image ? <img src={d.image} alt={d.name} className="w-full h-full object-cover" /> : d.name.split(" ").map((n: string) => n[0]).join("")}
                          </div>
                          <div className="flex-1"><p className="font-heading font-semibold">{d.name}</p><p className="text-sm text-muted-foreground">{d.role}</p></div>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Expert</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-heading font-bold text-xl mb-6">Pick Date & Time</h3>
                  <div className="flex justify-center mb-6">
                    <Calendar mode="single" selected={date ? new Date(date) : undefined} onSelect={(newDate) => dispatch(setDateTime({ date: newDate ? newDate.toISOString().split("T")[0] : "", timeSlot: "" }))} disabled={(d) => d < new Date() || d.getDay() === 0} className="pointer-events-auto rounded-xl border" />
                  </div>
                  {date && (
                    <div>
                      <p className="text-sm font-semibold mb-3">Available Times</p>
                      {loadingSlots ? (<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">{[1,2,3,4].map((i) => (<div key={i} className="h-10 bg-muted animate-pulse rounded-xl" />))}</div>) : (
                        <div className="space-y-6">
                          {renderTimeSlots(availableSlots?.allSlots || [], "AM", <Sparkles className="w-3.5 h-3.5" />, "Morning Sessions")}
                          {renderTimeSlots(availableSlots?.allSlots || [], "PM", <Clock className="w-3.5 h-3.5" />, "Afternoon Sessions")}
                          {(!availableSlots?.allSlots || availableSlots.allSlots.length === 0) && (<div className="py-10 text-center bg-secondary/30 rounded-2xl border border-dashed border-border"><p className="text-sm text-muted-foreground">No appointments available for this date.</p></div>)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-6">Your Information</h3>
                  <Input placeholder="Full Name" className="rounded-xl py-5" value={patientInfo?.name || ""} onChange={(e) => dispatch(setPatientInfo({ ...patientInfo!, name: e.target.value }))} />
                  <Input placeholder="Email Address" type="email" className="rounded-xl py-5" value={patientInfo?.email || ""} onChange={(e) => dispatch(setPatientInfo({ ...patientInfo!, email: e.target.value }))} />
                  <Input placeholder="Phone Number" type="tel" className="rounded-xl py-5" value={patientInfo?.phone || ""} onChange={(e) => dispatch(setPatientInfo({ ...patientInfo!, phone: e.target.value }))} />
                  <div onClick={() => dispatch(setPatientInfo({ ...patientInfo!, isNewPatient: !patientInfo?.isNewPatient }))} className={cn("flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all", patientInfo?.isNewPatient ? "border-primary bg-primary/5" : "border-border")}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", patientInfo?.isNewPatient ? "border-primary bg-primary" : "border-slate-300")}>{patientInfo?.isNewPatient && <CheckCircle className="w-3.5 h-3.5 text-white" />}</div>
                      <span className="text-sm font-semibold">I am a new patient</span>
                    </div>
                  </div>
                  <Input placeholder="Notes (Optional)" className="rounded-xl py-5" value={patientInfo?.notes || ""} onChange={(e) => dispatch(setPatientInfo({ ...patientInfo!, notes: e.target.value }))} />
                  <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-6 text-sm space-y-2 mt-6 border border-border">
                    <p className="font-heading font-bold text-base mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Appointment Summary</p>
                    <p><span className="text-muted-foreground">Service:</span> <span className="font-medium">{selectedService?.title}</span></p>
                    <p><span className="text-muted-foreground">Doctor:</span> <span className="font-medium">{selectedDoctor?.name}</span></p>
                    <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date ? new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ""}</span></p>
                    <p><span className="text-muted-foreground">Time:</span> <span className="font-medium">{timeSlot}</span></p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-primary" /></div>
                  <h3 className="font-heading font-bold text-3xl mb-3">Appointment Request Received!</h3>
                  <p className="text-muted-foreground text-lg mb-2">Thank you, {patientInfo?.name}!</p>
                  <p className="text-muted-foreground">Your appointment request has been sent. We will confirm it shortly via email at <strong className="text-foreground">{patientInfo?.email}</strong>.</p>
                  <div className="bg-secondary/50 rounded-2xl p-6 mt-8 text-sm space-y-2 max-w-sm mx-auto">
                    <p><span className="text-muted-foreground">Service:</span> <span className="font-medium">{selectedService?.title}</span></p>
                    <p><span className="text-muted-foreground">Doctor:</span> <span className="font-medium">{selectedDoctor?.name}</span></p>
                    <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date ? new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ""}</span></p>
                    <p><span className="text-muted-foreground">Time:</span> <span className="font-medium">{timeSlot}</span></p>
                  </div>
                  <Button className="mt-8 rounded-xl" onClick={() => { dispatch(resetBooking()); window.location.href = "/"; }}>Return Home</Button>
                  <div className="mt-4">
                    <BookingDownloadButton data={{ patientName: patientInfo?.name || "", patientEmail: patientInfo?.email || "", patientPhone: patientInfo?.phone || "", service: selectedService?.title || "", doctor: selectedDoctor?.name || "", date: date ? new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "", time: timeSlot || "" }} />
                  </div>
                </div>
              )}
            </div>

            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => dispatch(setPrevStep())} disabled={step === 1 || isSubmitting} className="gap-2 rounded-xl"><ArrowLeft className="w-4 h-4" /> Back</Button>
                {step < 4 ? (
                  <Button onClick={handleNext} disabled={!canNext()} className="gap-2 rounded-xl px-8">Continue <ArrowRight className="w-4 h-4" /></Button>
                ) : (
                  <Button disabled={!canNext() || isSubmitting} onClick={handleNext} className="gap-2 rounded-xl px-8">
                    {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" /> : <CheckCircle className="w-4 h-4" />}
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
