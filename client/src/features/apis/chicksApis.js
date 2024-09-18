import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../helpers/token";

const apiUrl = import.meta.env.VITE_API_URL;

export const chicksApi = createApi({
    reducerPath: 'chickApi',
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
    tagTypes: ['Chicks'],
    endpoints: (builder) => ({

        createChick: builder.mutation({
            query: (chick) => ({
                url: '/chicks/new',
                method: 'POST',
                body: chick,
            }),
            invalidatesTags: ['Chicks'],
        }),

        fetchChicks: builder.query({
            query: () => '/chicks/fetch/all',
            providesTags: ['Chicks'],
        }),

        fetchChickByChickId: builder.query({
            query: (chickId) => `/chicks/fetch/chickId/${chickId}`,
            providesTags: ['Chicks'],
        }),

        fetchChickByBatchId: builder.query({
            query: (batchId) => `/chicks/fetch/batchId/${batchId}`,
            providesTags: ['Chicks'],
        }),

        fetchChickByHatchRecordId: builder.query({
            query: (hatchRecordId) => `/chicks/fetch/hatchRecordId/${hatchRecordId}`,
            providesTags: ['Chicks'],
        }),

        fetchChickByChickType: builder.query({
            query: (chickType) => `/chicks/fetch/chickType/${chickType}`,
            providesTags: ['Chicks'],
        }),

        fetchChickByHealthStatus: builder.query({
            query: (healthStatus) => `/chicks/fetch/healthStatus/${healthStatus}`,
            providesTags: ['Chicks'],
        }),

        updateChick: builder.mutation({
            query: ({ editedValues, editorId, chickId }) => ({
                url: `/chicks/update/${editorId}/${chickId}`,
                method: 'PATCH',
                body: editedValues
            }),
            invalidatesTags: ['Chicks'],
        }),

        deleteChick: builder.mutation({
            query: ({ editorId, chickId }) => ({
                url: `/chicks/delete/${editorId}/${chickId}`,
            }),
            invalidatesTags: ['Chicks'],
        }),
    }),
});

export const {
    useCreateChickMutation,
    useFetchChicksQuery,
    useFetchChickByChickIdQuery,
    useFetchChickByBatchIdQuery,
    useFetchChickByHatchRecordIdQuery,
    useFetchChickByChickTypeQuery,
    useFetchChickByHealthStatusQuery,
    useUpdateChickMutation,
    useDeleteChickMutation
} = chicksApi;