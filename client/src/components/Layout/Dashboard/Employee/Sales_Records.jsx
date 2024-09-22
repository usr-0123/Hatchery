import { Table } from 'antd';
import React, { useEffect, useState } from 'react'

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useFetchSaleQuery } from '../../../../features/apis/salesApis.js';

const Sales_Records = () => {
    const [salesArray, setSalesArray] = useState([]);

    const { data: salesData, refetch: refetchSales, isLoading: fetchingIncubations } = useFetchSaleQuery();

    useEffect(() => {
        if (salesData?.data) {
            setSalesArray(salesData?.data);
        } else {
            setSalesArray([]);
            refetchSales();
        };
    }, [salesData, refetchSales]);

    const columns = [
        {
            key: 'saleDate',
            title: 'Date',
            dataIndex: 'saleDate',
            render: (saleDate) => convertDateToUIFormat(saleDate)
        }, {
            key: 'quantitySold',
            title: 'Quantity Sold',
            dataIndex: 'quantitySold'
        }, {
            key: 'chickPrice',
            title: 'Chick Price',
            dataIndex: 'chickPrice'
        }, {
            key: 'totalAmount',
            title: 'Total',
            dataIndex: 'totalAmount'
        }
    ]

    return (
        <Table
            title={() => 'Sales records.'}
            // onRow={(record) => ({ onClick: () => handleSelect(record) })}
            key="listOfSales"
            loading={fetchingIncubations}
            columns={columns}
            dataSource={salesArray}
            pagination={{ pageSize: 5 }}
            rowKey="saleId"
        />
    )
}

export default Sales_Records;