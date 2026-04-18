import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  step: number;
  serviceId: string | null;
  doctorId: string | null;
  date: string | null;
  timeSlot: string | null;
  patientInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  } | null;
}

const initialState: BookingState = {
  step: 1,
  serviceId: null,
  doctorId: null,
  date: null,
  timeSlot: null,
  patientInfo: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setNextStep: (state) => {
      state.step += 1;
    },
    setPrevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    setService: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },
    setDoctor: (state, action: PayloadAction<string>) => {
      state.doctorId = action.payload;
    },
    setDateTime: (state, action: PayloadAction<{ date: string; timeSlot: string }>) => {
      state.date = action.payload.date;
      state.timeSlot = action.payload.timeSlot;
    },
    setPatientInfo: (state, action: PayloadAction<BookingState["patientInfo"]>) => {
      state.patientInfo = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setNextStep,
  setPrevStep,
  setService,
  setDoctor,
  setDateTime,
  setPatientInfo,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
