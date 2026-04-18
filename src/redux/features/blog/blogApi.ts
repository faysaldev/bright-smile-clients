import { baseApi } from "@/src/redux/baseApi/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => ({
        url: "/blog",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Blog"],
    }),
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `/blog/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Blog"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Blog"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Blog"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;
