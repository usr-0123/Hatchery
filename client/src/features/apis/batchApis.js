import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const batchApi = createApi({
    reducerPath: "batchApi",
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
    tagTypes: ['Batches'],
    endpoints: (builder) => ({

        createBatch: builder.mutation({
            query: (batch) => ({
                url: '/batch/new',
                method: 'POST',
                body: batch,
            }),
            invalidatesTags: ['Batches'],
        }),

        fetchbatches: builder.query({
            query: () => '/batch/fetch/all',
            providesTags: ['Batches'],
        }),

        fetchBatchByBatchId: builder.query({
            query: (batchId) => `/batch/fetch/batchId/${batchId}`,
            providesTags: ['Batches'],
        }),

        fetchBatchByUserId: builder.query({
            query: (userId) => `/batch/fetch/userId/${userId}`,
            providesTags: ['Batches'],
        }),

        fetchBatchByReceivedDate: builder.query({
            query: (receivedDate) => `/batch/fetch/receivedDate/${receivedDate}`,
            providesTags: ['Batches'],
        }),

        fetchBatchByBatchStatus: builder.query({
            query: (batchStatus) => `/batch/fetch/batchStatus/${batchStatus}`,
            providesTags: ['Batches'],
        }),

        updateBatch: builder.mutation({
            query: ({ editorId, batchId, editedValues }) => ({
                url: `/batch/update/${editorId}/${batchId}`,
                method: 'PATCH',
                body: editedValues
            }),
            invalidatesTags: ['Batches'],
        }),

        deletebatch: builder.mutation({
            query: ({ editorId, batchId }) => ({
                url: `/batch/delete/${editorId}/${batchId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Batches'],
        }),
    }),
});

export const { useCreateBatchMutation, useFetchbatchesQuery, useFetchBatchByBatchIdQuery, useFetchBatchByUserIdQuery, useLazyFetchBatchByReceivedDateQuery, useFetchBatchByBatchStatusQuery, useUpdateBatchMutation, useDeletebatchMutation } = batchApi;