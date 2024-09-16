import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { usersApi } from './apis/usersApis.js';
import { batchApi } from './apis/batchApis.js';
import {productPriceApi} from './apis/productPriceApis.js';

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [batchApi.reducerPath]: batchApi.reducer,
        [productPriceApi.reducerPath]: productPriceApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            usersApi.middleware,
            batchApi.middleware,
            productPriceApi.middleware,
        )
});

setupListeners(store.dispatch);