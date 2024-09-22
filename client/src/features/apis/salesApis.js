import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "../../helpers/token.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const salesApis = createApi({
    reducerPath: 'salesApi',
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
    tagTypes: ['Sales'],
    endpoints: (builder) => ({
        createSale: builder.mutation({
            query: (sale) => ({
                url: '/sales/new',
                body: sale,
                method: 'POST',
            }),
            invalidatesTags: ['Sales'],
        }),

        fetchSale: builder.query({
            query: () => `/sales/fetch/all`,
            providesTags: ['Sales'],
        }),

        fetchSaleBySaleId: builder.query({
            query: (saleId) => `/sales/fetch/saleId/${saleId}`,
            providesTags: ['Sales'],
        }),

        fetchSaleByBatchId: builder.query({
            query: (batchId) => `/sales/fetch/batchId/${batchId}`,
            providesTags: ['Sales'],
        }),

        fetchSaleByChickId: builder.query({
            query: (chickId) => `/sales/fetch/chickId/${chickId}`,
            providesTags: ['Sales'],
        }),

        fetchSaleBySaleDate: builder.query({
            query: (saleDate) => `/sales/fetch/saleDate/${saleDate}`,
            providesTags: ['Sales'],
        }),

        updateSale: builder.mutation({
            query: ({ editorId, saleId, editValues }) => ({
                url: `/sales/update/${editorId}/${saleId}`,
                body: editValues,
                method: 'PATCH',
            }),
            invalidatesTags: ['Sales'],
        }),

        deleteSale: builder.mutation({
            query: ({ editorId, saleId }) => `/sales/delete/${editorId}/${saleId}`,
            invalidatesTags: ['Sales'],
            method: 'DELETE',
        }),
    }),
});

export const {
    useCreateSaleMutation,
    useFetchSaleQuery,
    useFetchSaleByBatchIdQuery,
    useFetchSaleByChickIdQuery,
    useFetchSaleBySaleDateQuery,
    useFetchSaleBySaleIdQuery,
    useUpdateSaleMutation,
    useDeleteSaleMutation
} = salesApis;