import { apiSlice } from "../interceptor/apiSlice";

export const paymentApi  = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

           createPaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/paypal/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaypalPaymentMutation } = paymentApi;

