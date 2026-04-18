import { baseApi } from "@/src/redux/baseApi/baseApi";

const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: (params) => ({
        url: "/appointments/availability",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Appointment"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: "/appointments",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Appointment"],
    }),
    getAllAppointments: builder.query({
      query: (params) => ({
        url: "/appointments",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Appointment"],
    }),
    updateAppointmentStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCheckAvailabilityQuery,
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} = appointmentsApi;
