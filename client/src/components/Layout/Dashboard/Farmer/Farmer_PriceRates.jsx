import React from 'react'
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { Table } from 'antd';

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: 'product_name'
    }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    }, {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency'
    }, {
        title: 'Last Updated Date',
        dataIndex: 'date_updated',
        key: 'date_updated',
        render: (date_updated) => convertDateToUIFormat(date_updated)
    }
];

const Farmer_PriceRates = ({ productPrices, batches }) => {

    return (
        <div>
            <Table title={() => 'Products Price Rates'} key='productPriceId' columns={columns} dataSource={productPrices} />
        </div>
    )
}

export default Farmer_PriceRates;