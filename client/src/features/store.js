import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { usersApi } from './apis/usersApis.js';
import { batchApi } from './apis/batchApis.js';
import { productPriceApi } from './apis/productPriceApis.js';
import { incubationApi } from './apis/incubationApis.js';
import { salesApis } from './apis/salesApis.js';
import { hatchApi } from './apis/hatchRecordsApis.js';
import { eggsApi } from './apis/eggsApis.js';
import { chicksApi } from './apis/chicksApis.js';

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [batchApi.reducerPath]: batchApi.reducer,
        [productPriceApi.reducerPath]: productPriceApi.reducer,
        [salesApis.reducerPath]: salesApis.reducer,
        [incubationApi.reducerPath]: productPriceApi.reducer,
        [hatchApi.reducerPath]: hatchApi.reducer,
        [eggsApi.reducerPath]: eggsApi.reducer,
        [chicksApi.reducerPath]: chicksApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            usersApi.middleware,
            batchApi.middleware,
            productPriceApi.middleware,
            salesApis.middleware,
            incubationApi.middleware,
            hatchApi.middleware,
            eggsApi.middleware,
            chicksApi.middleware,
        )
});

setupListeners(store.dispatch);