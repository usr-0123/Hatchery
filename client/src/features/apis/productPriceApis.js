import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../helpers/token";

const apiUrl = import.meta.env.VITE_API_URL;

export const productPriceApi = createApi({
    reducerPath: "productPriceApi",
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
    tagTypes: ['ProductPrice'],
    endpoints: (builder) => ({
        createNewProductPrice: builder.mutation({
            query: (productPrice) => ({
                url: '/product-price/new',
                method: 'POST',
                body: productPrice,
            }),
            invalidatesTags: ['ProductPrice'],
        }),

        fetchProductPrices: builder.query({
            query: () => '/product-price/fetch/all',
            providesTags: ['ProductPrice'],
        }),

        fetchProductPricesByProductPriceId: builder.query({
            query: (productPriceId) => `/product-price/fetch/product-price-id/${productPriceId}`,
            providesTags: ['ProductPrice'],
        }),

        fetchProductPricesByProduct_name: builder.query({
            query: (product_name) => `/product-price/fetch/product-name/${product_name}`,
            providesTags: ['ProductPrice'],
        }),

        fetchProductPricesByPrice: builder.query({
            query: (price) => `/product-price/fetch/price/${price}`,
            providesTags: ['ProductPrice'],
        }),

        fetchProductPricesByCurrency: builder.query({
            query: (currency) => `/product-price/fetch/currency/${currency}`,
            providesTags: ['ProductPrice'],
        }),

        fetchProductPricesByDate_updated: builder.query({
            query: (date_updated) => `/product-price/fetch/date-updated/${date_updated}`,
            providesTags: ['ProductPrice'],
        }),

        updateProductPrice: builder.mutation({
            query: ({ editorId, productPriceId, editedValues }) => ({
                url: `/product-price/update/${editorId}/${productPriceId}`,
                method: 'PATCH',
                body: editedValues
            }),
            invalidatesTags: ['ProductPrice'],
        }),

        deleteProductPrice: builder.mutation({
            query: ({editorId, productPriceId}) => ({
                url: `/product-price/delete/${editorId}/${productPriceId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useCreateNewProductPriceMutation, useFetchProductPricesQuery, useFetchProductPricesByProductPriceIdQuery, useFetchProductPricesByProduct_nameQuery, useFetchProductPricesByPriceQuery, useFetchProductPricesByCurrencyQuery, useFetchProductPricesByDate_updatedQuery, useUpdateProductPriceMutation, useDeleteProductPriceMutation } = productPriceApi;