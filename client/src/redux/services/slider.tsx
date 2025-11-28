import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Fetch all sliders
    getAllSliders: builder.query({
      query: () => ({
        url: ApiRouteService.slider,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Add new slider
    addSlider: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.slider,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Slider"],
    }),

    // Get slider by ID
    getSliderById: builder.query({
      query: (id) => ({
        url: `${ApiRouteService.slider}/${id}`,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Get slider by slug (optional — remove if not needed)
    getSliderBySlug: builder.query({
      query: (slug) => ({
        url: `${ApiRouteService.slider}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Update slider
    updateSlider: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.slider}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Slider"],
    }),

    // Delete slider
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `${ApiRouteService.slider}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slider"],
    }),
  }),
});

export const {
  useGetAllSlidersQuery,
  useGetSliderByIdQuery,
  useGetSliderBySlugQuery,
  useAddSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;
 