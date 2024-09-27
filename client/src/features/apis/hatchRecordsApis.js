import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const hatchApi = createApi({
    reducerPath: 'hatchRecordsApi',
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
    tagTypes: ['HatchRecord'],
    endpoints: (builder) => ({
        createRecord: builder.mutation({
            query: (hatch) => ({
                url: '/hatchRecord/add',
                body: hatch,
                method: 'POST',
            }),
            invalidatesTags: ['HatchRecord'],
        }),

        fetchHatchRecords: builder.query({
            query: () => '/hatchRecord/fetch/all',
            providesTags: ['HatchRecord'],
        }),

        fetchHatchRecordsByHatchRecordId: builder.query({
            query: () => `/hatchRecord/fetch/hatchRecordId/${hatchRecordId}`,
            providesTags: ['HatchRecord'],
        }),

        fetchHatchRecordsByBatchId: builder.query({
            query: () => `/hatchRecord/fetch/batchId/${batchId}`,
            providesTags: ['HatchRecord'],
        }),

        fetchHatchRecordsByDateHatched: builder.query({
            query: (dateHatched) => `/hatchRecord/fetch/dateHatched/${dateHatched}`,
            providesTags: ['HatchRecord'],
        }),

        updateHatchRecords: builder.mutation({
            query: ({ editorId, hatchRecordId, editedValues }) => ({
                url: `/hatcheRecord/update/${editorId}/${hatchRecordId}`,
                body: editedValues,
                method: 'PATCH',
            }),
            invalidatesTags: ['HatchRecord'],
        }),

        deleteHatch: builder.mutation({
            query: ({ editorId, hatchRecordId }) => ({
                url: `/hatchRecord/delete/${editorId}/${hatchRecordId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['HatchRecord'],
        }),
    }),
});

export const {
    useCreateRecordMutation,
    useFetchHatchRecordsQuery,
    useFetchHatchRecordsByHatchRecordIdQuery,
    useFetchHatchRecordsByBatchIdQuery,
    useFetchHatchRecordsByDateHatchedQuery,
    useUpdateHatchRecordsMutation,
    useDeleteHatchMutation
} = hatchApi;