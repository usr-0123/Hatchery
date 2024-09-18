import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'

import { decodeToken } from '../../../../helpers/token.js';
import { useFetchBatchByUserIdQuery } from '../../../../features/apis/batchApis.js';
import Farmer_General from './Farmer_General.jsx';
import Farmer_Production from './Farmer_Production.jsx';
import { useFetchProductPricesQuery } from '../../../../features/apis/productPriceApis.js';
import Farmer_PriceRates from './Farmer_PriceRates.jsx';

const Farmer_Home = () => {
    const [user, setUser] = useState(null);
    const [batches, setBatches] = useState([]);
    const [productPrices, setProductPrices] = useState([]);

    useEffect(() => {
        const decodedUser = decodeToken();
        setUser(decodedUser);
    }, []);

    const { data: batchesData, refetch, isLoading: fetchingUserBatches } = useFetchBatchByUserIdQuery(user?.userId);
    const { data: productPricesData, refetch: refetchProductPrices, isLoading: fetchingProducstPrices } = useFetchProductPricesQuery();

    useEffect(() => {

        if (batchesData?.data) {
            setBatches(batchesData.data)
        } else {
            refetch();
            setBatches([]);
        };

    }, [batchesData, refetch]);

    useEffect(() => {
        if (productPricesData?.data) {
            setProductPrices(productPricesData.data);
        } else {
            setProductPrices([]);
            refetchProductPrices();
        };

    }, [productPricesData, refetchProductPrices]);

    const tabItems = [
        {
            key: 'farmer_General',
            label: 'General',
            children: <Farmer_General productPrices={productPrices} batches={batches} />,
        }, {
            key: 'farmer_Production',
            label: 'Daily Supply',
            children: <Farmer_Production productPrices={productPrices} batches={batches} />,
        }, {
            key: 'product-rates',
            label: 'Product Rates',
            children: <Farmer_PriceRates productPrices={productPrices} batches={batches} />,
        }
    ];

    return (
        <Tabs defaultActiveKey="farmer_General" items={tabItems} />
    )
};

export default Farmer_Home;