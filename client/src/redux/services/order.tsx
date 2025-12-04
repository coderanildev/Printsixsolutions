import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // CREATE ORDER
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: ApiRouteService.order,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // GET USER ORDERS
    getMyOrders: builder.query({
    query: () => ({
        url: ApiRouteService.order + "/my-orders",
        method: "GET",
    }),
    providesTags: ["Order"],
    }),



  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery  } = orderApi;
