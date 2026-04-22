import { baseApi } from "@/src/redux/baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Dashboard"],
    }),
    getActivityLogs: builder.query({
      query: () => ({
        url: "/activity-logs",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["ActivityLog"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetActivityLogsQuery } = dashboardApi;
