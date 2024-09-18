import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd';

import { useFetchSaleQuery } from '../../../../features/apis/salesApis.js';
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';

const Admin_Sales = () => {
    const [sales, setSales] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: salesData, refetch: refetchSales } = useFetchSaleQuery();

    const columns = [
        {
            title: 'Sale Date',
            dataIndex: 'saleDate',
            key: 'saleDate',
            render: (saleDate) => convertDateToUIFormat(saleDate)
        }, {
            title: 'Chick Price',
            dataIndex: 'chickPrice',
            key: 'chickPrice',
            render: (chickPrice) => `Ksh. ${chickPrice.toFixed(2)}`
        }, {
            title: 'Quantity Sold',
            dataIndex: 'quantitySold',
            key: 'quantitySold'
        }, {
            title: 'Total Ammount (Ksh.)',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (totalAmount) => `Ksh. ${totalAmount.toFixed(2)}`
        }
    ];

    const handleSelect = (saleId) => {
        setSelectedId(saleId);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (salesData?.data) {
            setSales(salesData.data);
        } else {
            setSales([]);
            refetchSales();
        };
    }, [salesData]);

    return (
        <>
            <Table title={() => 'Chicks Sales Records'} onRow={(record) => ({ onClick: () => handleSelect(record.saleId) })} key='saleId' columns={columns} dataSource={sales} pagination={{ pageSize: 5 }} />
            <Modal
                title="Sale Details Modal"
                key="salesModal"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={700}
            >{selectedId || 'N/A'}</Modal>
        </>
    )
}

export default Admin_Sales;