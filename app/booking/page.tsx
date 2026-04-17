"use client";

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/lib/store/store";
import {
  setNextStep,
  setPrevStep,
  setService,
  setDoctor,
  setDateTime,
  setPatientInfo,
} from "@/src/lib/store/bookingSlice";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import { cn } from "@/src/lib/utils";
import {
  CalendarCheck,
  User,
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { gsap } from "@/src/hooks/useGsap";

const services = [
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics",
  "Cosmetic Dentistry",
  "Emergency Care",
];
const doctors = [
  {
    name: "Dr. James Mitchell",
    specialty: "General & Cosmetic Dentistry",
    exp: "20+ years",
  },
  {
    name: "Dr. Sarah Chen",
    specialty: "Orthodontics & Pediatric",
    exp: "15+ years",
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Oral Surgery & Implants",
    exp: "12+ years",
  },
];
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const stepsConfig = [
  { label: "Service", icon: CalendarCheck },
  { label: "Doctor", icon: User },
  { label: "Date & Time", icon: Clock },
  { label: "Confirm", icon: CheckCircle },
];

const Booking = () => {
  const dispatch = useDispatch();
  const { step, serviceId, doctorId, date, timeSlot, patientInfo } = useSelector(
    (state: RootState) => state.booking
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const canNext = () => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!doctorId;
    if (step === 3) return !!date && !!timeSlot;
    if (step === 4) return !!patientInfo?.name && !!patientInfo?.email;
    return false;
  };

  // Animate step transitions
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (canNext()) {
      dispatch(setNextStep());
    }
  };

  const handlePrev = () => {
    dispatch(setPrevStep());
  };

  return (
    <div className="pb-16 pt-8">
      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Appointments
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mt-2 mb-2">
              Book Your Appointment
            </h1>
            <p className="text-muted-foreground text-lg">
              Quick and easy online booking in 4 simple steps.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {stepsConfig.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500",
                    i + 1 < step
                      ? "bg-primary text-primary-foreground scale-90"
                      : i + 1 === step
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {i + 1 < step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {s.label}
                </span>
                {i < stepsConfig.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2 transition-colors duration-500",
                      i + 1 < step ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="glass-card p-8 sm:p-10 rounded-3xl">
            <div ref={contentRef} key={step}>
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl mb-6">
                    Choose a Service
                  </h3>
                  {services.map((s) => (
                    <button
                      key={s}
                      onClick={() => dispatch(setService(s))}
                      className={cn(
                        "w-full text-left px-6 py-4 rounded-xl border-2 transition-all text-sm font-medium group",
                        serviceId === s
                          ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10"
                          : "border-border hover:border-primary/40 hover:bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{s}</span>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            serviceId === s
                              ? "border-primary bg-primary"
                              : "border-border"
                          )}
                        >
                          {serviceId === s && (
                            <CheckCircle className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-xl mb-6">
                    Choose Your Doctor
                  </h3>
                  {doctors.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => dispatch(setDoctor(d.name))}
                      className={cn(
                        "w-full text-left px-6 py-5 rounded-xl border-2 transition-all group",
                        doctorId === d.name
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                            doctorId === d.name
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {d.name
                            .split(" ")
                            .slice(1)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="font-heading font-semibold">{d.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {d.specialty}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          {d.exp}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-heading font-bold text-xl mb-6">
                    Pick Date & Time
                  </h3>
                  <div className="flex justify-center mb-6">
                    <Calendar
                      mode="single"
                      selected={date ? new Date(date) : undefined}
                      onSelect={(newDate) =>
                        dispatch(
                          setDateTime({
                            date: newDate ? newDate.toISOString() : "",
                            timeSlot: timeSlot || "",
                          })
                        )
                      }
                      disabled={(d) => d < new Date() || d.getDay() === 0}
                      className="pointer-events-auto rounded-xl"
                    />
                  </div>
                  {date && (
                    <div>
                      <p className="text-sm font-semibold mb-3">Available Times</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() =>
                              dispatch(setDateTime({ date, timeSlot: t }))
                            }
                            className={cn(
                              "px-3 py-2.5 rounded-xl border-2 text-sm transition-all font-medium",
                              timeSlot === t
                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                : "border-border hover:border-primary/40"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-6">
                    Your Information
                  </h3>
                  <Input
                    placeholder="Full Name"
                    className="rounded-xl py-5"
                    value={patientInfo?.name || ""}
                    onChange={(e) =>
                      dispatch(
                        setPatientInfo({
                          ...patientInfo,
                          name: e.target.value,
                          email: patientInfo?.email || "",
                          phone: patientInfo?.phone || "",
                          notes: patientInfo?.notes || "",
                        })
                      )
                    }
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="rounded-xl py-5"
                    value={patientInfo?.email || ""}
                    onChange={(e) =>
                      dispatch(
                        setPatientInfo({
                          ...patientInfo,
                          name: patientInfo?.name || "",
                          email: e.target.value,
                          phone: patientInfo?.phone || "",
                          notes: patientInfo?.notes || "",
                        })
                      )
                    }
                  />
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="rounded-xl py-5"
                    value={patientInfo?.phone || ""}
                    onChange={(e) =>
                      dispatch(
                        setPatientInfo({
                          ...patientInfo,
                          name: patientInfo?.name || "",
                          email: patientInfo?.email || "",
                          phone: e.target.value,
                          notes: patientInfo?.notes || "",
                        })
                      )
                    }
                  />

                  <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-6 text-sm space-y-2 mt-6 border border-border">
                    <p className="font-heading font-bold text-base mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Appointment Summary
                    </p>
                    <p>
                      <span className="text-muted-foreground">Service:</span>{" "}
                      <span className="font-medium">{serviceId}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Doctor:</span>{" "}
                      <span className="font-medium">{doctorId}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      <span className="font-medium">
                        {date
                          ? new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      <span className="font-medium">{timeSlot}</span>
                    </p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-3xl mb-3">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-muted-foreground text-lg mb-2">
                    Thank you, {patientInfo?.name}!
                  </p>
                  <p className="text-muted-foreground">
                    A confirmation email has been sent to{" "}
                    <strong className="text-foreground">{patientInfo?.email}</strong>.
                  </p>
                  <div className="bg-secondary/50 rounded-2xl p-6 mt-8 text-sm space-y-2 max-w-sm mx-auto">
                    <p>
                      <span className="text-muted-foreground">Service:</span>{" "}
                      <span className="font-medium">{serviceId}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Doctor:</span>{" "}
                      <span className="font-medium">{doctorId}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      <span className="font-medium">
                        {date
                          ? new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      <span className="font-medium">{timeSlot}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="gap-2 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canNext()}
                    className="gap-2 rounded-xl px-8"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    disabled={!canNext()}
                    onClick={handleNext}
                    className="gap-2 rounded-xl px-8"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm Booking
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
