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

    getOrderDetails: builder.query({
      query: (id) => `/order/my-order/${id}`,
    }),

    getAllOrders: builder.query({
      query: () => "/order",
      providesTags: ["Order"],

    }),


    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Order"],
    }),

  }),
});

export const { 
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation 
 } = orderApi;
