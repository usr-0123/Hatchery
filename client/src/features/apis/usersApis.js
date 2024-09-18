import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            };
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: ({ editorId, user }) => ({
                url: `/user/register/${editorId}`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),

        authenticateUser: builder.mutation({
            query: (user) => ({
                url: '/user/login',
                method: 'POST',
                body: user,
            }),
        }),

        getAllUsers: builder.query({
            query: () => '/users/all',
            providesTags: ["Users"],
        }),

        getUserByStreet: builder.query({
            query: (street) => `/users/street/${street}`,
            providesTags: ["Users"],
        }),

        getUserByLocation: builder.query({
            query: (location) => `/users/location/${location}`,
            providesTags: ["Users"],
        }),

        getUserByMembershipDate: builder.query({
            query: (membershipDate) => `/users/membership_date/${membershipDate}`,
            providesTags: ["Users"],
        }),

        getUserByUserId: builder.query({
            query: (userId) => `/user/user_id/${userId}`,
            providesTags: ["Users"],
        }),

        getUserByEmail: builder.query({
            query: (userEmail) => `/user/email/${userEmail}`,
            providesTags: ["Users"],
        }),

        getUserByUserName: builder.query({
            query: (userName) => `/user/username/${userName}`,
            providesTags: ["Users"],
        }),

        getUserByPhoneNumber: builder.query({
            query: (userPhoneNumber) => `/user/phone_number/${userPhoneNumber}`,
            providesTags: ["Users"],
        }),

        updateUserDetails: builder.mutation({
            query: ({ editorId, userId, editedValues }) => ({
                url: `/user/update/${editorId}/${userId}`,
                method: 'PATCH',
                body: editedValues
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation({
            query: ({editorId, userId}) => ({
                url: `/user/delete/${editorId}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Users"],
        }),

    }),
});

export const { useRegisterUserMutation, useAuthenticateUserMutation, useGetAllUsersQuery, useGetUserByPhoneNumberQuery, useGetUserByUserNameQuery, useGetUserByEmailQuery, useLazyGetUserByUserIdQuery, useGetUserByMembershipDateQuery, useGetUserByLocationQuery, useGetUserByStreetQuery, useUpdateUserDetailsMutation, useDeleteUserMutation } = usersApi;