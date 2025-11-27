import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.userSignup,
        method: "POST",
        body: data,
      }),
    }),

    getUserDetails: builder.query<any, void>({
      query: () => ({
        url: ApiRouteService.userdetails,
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.updateProfile,
        method: "PUT",
        body: data,
      }),
    }),

    updateUserAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        // url: ApiRouteService.updateAddress,
        url: `/user/update-address/${id}`, 
        method: "PUT",
        body: data,
      }),
    }),

  }),
});

export const { useUserSignupMutation, useGetUserDetailsQuery,  useUpdateUserProfileMutation, useUpdateUserAddressMutation} = userApi;
