import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const incubationApi = createApi({
    reducerPath: 'incubationApi',
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
    tagTypes: ['Incubation'],
    endpoints: (builder) => ({

        createIncubation: builder.mutation({
            query: (incubation) => ({
                url: '/incubation/add',
                method: 'POST',
                body: incubation,
            }),
            invalidatesTags: ['Incubation'],
        }),

        fetchIncubation: builder.query({
            query: () => '/incubation/fetch/all',
            providesTags: ['Incubation'],
        }),

        fetchIncubationByIncubationId: builder.query({
            query: (incubationId) => `/incubation/fetch/incubationId/${incubationId}`,
            providesTags: ['Incubation'],
        }),

        fetchIncubationByBatchId: builder.query({
            query: (batchId) => `/incubation/fetch/batchId/${batchId}`,
            providesTags: ['Incubation'],
        }),

        fetchIncubationByStartDate: builder.query({
            query: (startDate) => `/incubation/fetch/startDate/${startDate}`,
            providesTags: ['Incubation'],
        }),

        fetchIncubationByHatchDate: builder.query({
            query: (hatchDate) => `/incubation/fetch/hatchDate/${hatchDate}`,
            providesTags: ['Incubation'],
        }),

        fetchIncubationByIncubationState: builder.query({
            query: (IncubationState) => `/incubation/fetch/incubationState/${IncubationState}`,
            providesTags: ['Incubation'],
        }),

        updateIncubation: builder.mutation({
            query: ({ editorId, incubationId, editedValues }) => ({
                url: `/incubation/update/${editorId}/${incubationId}`,
                body: editedValues,
                method: 'PATCH',
            }),
            invalidatesTags: ['Incubation'],
        }),

        deleteIncubation: builder.mutation({
            query: ({incubationId, editorId}) => ({
                url: `/incubation/delete/${editorId}/${incubationId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Incubation'],
        }),
    }),
});

export const {
    useCreateIncubationMutation,
    useFetchIncubationQuery,
    useFetchIncubationByIncubationIdQuery,
    useFetchIncubationByBatchIdQuery,
    useFetchIncubationByStartDateQuery,
    useFetchIncubationByHatchDateQuery,
    useFetchIncubationByIncubationStateQuery,
    useUpdateIncubationMutation,
    useDeleteIncubationMutation
} = incubationApi;