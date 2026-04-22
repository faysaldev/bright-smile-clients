import { baseApi } from "@/src/redux/baseApi/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Contact"],
    }),
    viewInquiries: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Contact"],
    }),
    updateInquiryStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/contact/${id}/status`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Contact"],
    }),
    replyToInquiry: builder.mutation({
      query: ({ id, reply }) => ({
        url: `/contact/${id}/reply`,
        method: "PUT",
        body: { reply },
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useViewInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useReplyToInquiryMutation,
} = contactApi;
