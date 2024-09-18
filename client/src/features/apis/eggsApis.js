import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const eggsApi = createApi({
    reducerPath: 'eggApi',
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
    tagTypes: ['Eggs'],
    endpoints: (builder) => ({

        createEgg: builder.mutation({
            query: (egg) => ({
                url: '/egg/new',
                method: 'POST',
                body: egg,
            }),
            invalidatesTags: ['Eggs'],
        }),

        fetchEggs: builder.query({
            query: () => '/egg/fetch/all',
            providesTags: ['Eggs'],
        }),

        fetchEggsByEggId: builder.query({
            query: (eggId) => `/egg/fetch/eggId/${eggId}`,
            providesTags: ['Eggs'],
        }),

        fetchEggsByBatchId: builder.query({
            query: (batchId) => `/egg/fetch/batchId/${batchId}`,
            providesTags: ['Eggs'],
        }),

        fetchEggsByUserId: builder.query({
            query: (userId) => `/egg/fetch/userId/${userId}`,
            providesTags: ['Eggs'],
        }),

        fetchEggsByCollectionDate: builder.query({
            query: (collectionDate) => `/egg/fetch/collectionDate/${collectionDate}`,
            providesTags: ['Eggs'],
        }),

        updateEggs: builder.mutation({
            query: ({ editorId, eggId, editedValues }) => ({
                url: `/egg/update/${editorId}/${eggId}`,
                method: 'PATCH',
                body: editedValues
            }),
            invalidatesTags: ['Eggs'],
        }),

        deleteEgg: builder.mutation({
            query: ({ editorId, eggId }) => ({
                url: `/egg/delete/${editorId}/${eggId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Eggs'],
        }),
    }),
});

export const { useCreateEggMutation, useFetchEggsQuery, useFetchEggsByEggIdQuery, useFetchEggsByBatchIdQuery, useFetchEggsByUserIdQuery, useFetchEggsByCollectionDateQuery, useUpdateEggsMutation, useDeleteEggMutation } = eggsApi;