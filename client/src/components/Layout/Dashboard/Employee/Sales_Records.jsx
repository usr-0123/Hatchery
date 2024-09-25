import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Descriptions, Form, InputNumber, Modal, Table } from 'antd';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useDeleteSaleMutation, useFetchSaleQuery, useUpdateSaleMutation } from '../../../../features/apis/salesApis.js';
import { formatToMoney } from '../../../../helpers/priceDisplayConversion.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';

const user = decodeToken();

const Sales_Records = () => {
    const [form] = Form.useForm();
    const [salesArray, setSalesArray] = useState([]);
    const [selectedObject, setSelectedObject] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: salesData, refetch: refetchSales, isLoading: fetchingIncubations } = useFetchSaleQuery();

    const [updateSale, { isLoading: updatingSale }] = useUpdateSaleMutation();

    const [deleteSale, { isLoading: deletingSale }] = useDeleteSaleMutation();

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
            key: 'price',
            title: 'Chick Price',
            dataIndex: 'price'
        }, {
            key: 'totalAmount',
            title: 'Total',
            dataIndex: 'totalAmount'
        }
    ]

    const handleSelect = (values) => {
        setSelectedObject(values);
        setIsModalOpen(true);
    };

    const handleEdit = async (values) => {
        const editValues = filterObjectByValues(values);
        if (selectedObject?.saleId && user?.userId) {
            const response = interceptor({ params: await updateSale({ editorId: user?.userId, saleId: selectedObject?.saleId, editValues }), type: 'Mutation' })
            if (response) {
                form.resetFields();
                setEditModalOpen(false);
                refetchSales();
                setIsModalOpen(false);
            };
        };
    };

    const onDelete = async () => {
        if (selectedObject?.saleId && user?.userId) {
            const response = interceptor({ params: await deleteSale({ editorId: user?.userId, saleId: selectedObject.saleId }), type: 'Mutation' });
            if (response) {
                setIsDeleteModalOpen(false);
                refetchSales();
                setIsModalOpen(false);
            };
        };
    };

    return (
        <>
            <Table
                title={() => 'Sales records.'}
                onRow={(record) => ({ onClick: () => handleSelect(record) })}
                key="listOfSales"
                loading={fetchingIncubations}
                columns={columns}
                dataSource={salesArray}
                pagination={{ pageSize: 5 }}
                rowKey="saleId"
            />

            <Modal
                key='selectedSaleObjectModal'
                title='Selected Sale.'
                loading={!selectedObject}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={'70%'}
                footer={[
                    <Button key='editSaleBtn' onClick={() => setEditModalOpen(true)} >Edit</Button>,
                    <Button key='deleteSaleBtn' danger onClick={() => setIsDeleteModalOpen(true)} >Delete</Button>
                ]}
            >
                <Descriptions bordered column={2} >
                    <Descriptions.Item label='Sale Date' >{selectedObject?.saleDate ? convertDateToUIFormat(selectedObject.saleDate) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Quantity Sold' >{selectedObject?.quantitySold || '0'}</Descriptions.Item>
                    <Descriptions.Item label='Price' >{selectedObject?.price ? formatToMoney(selectedObject.price) : '0.00'}</Descriptions.Item>
                    <Descriptions.Item label='Total' >{selectedObject?.totalAmount ? formatToMoney(selectedObject.totalAmount) : '0.00'}</Descriptions.Item>
                </Descriptions>
            </Modal>

            <Modal
                key='editSaleModal'
                title='Edit sale record.'
                loading={!selectedObject}
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                centered
                onOk={() => form.submit()}
                okButtonProps={{ disabled: updatingSale, loading: updatingSale, htmlType: 'submit' }}
                okText='Update'
            >
                <Form
                    onFinish={handleEdit}
                    form={form}
                    key='editSaleForm'
                    layout='vertical'
                >
                    <Form.Item
                        name='saleDate'
                        label='Sale Date'
                    >
                        <DatePicker
                            placeholder={convertDateToUIFormat(selectedObject?.saleDate) || 'Sale Date'}
                            key='saleDateEditInput'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='quantitySold'
                        label='Quantity Sold'
                    >
                        <InputNumber
                            placeholder={selectedObject?.quantitySold || 'Enter the number sold.'}
                            key='quantitySoldEditInput'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='price'
                        label='Price'
                    >
                        <InputNumber
                            placeholder={formatToMoney(selectedObject?.price) || 'Enter price.'}
                            key='priceEditInput'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title='Confirm delete?'
                open={isDeleteModalOpen}
                key='confirmDeleteSale'
                onCancel={() => setIsDeleteModalOpen(false)}
                okType='danger'
                okText='Delete'
                onOk={onDelete}
                okButtonProps={{ disabled: deletingSale, loading: deletingSale }}
                centered
            />
        </>
    )
}

export default Sales_Records;