import { Button, DatePicker, Descriptions, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useDeletebatchMutation, useFetchJointBatchesQuery, useUpdateBatchMutation } from '../../../../features/apis/batchApis.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { decodeToken } from '../../../../helpers/token.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';

const user = decodeToken();

const Collected_Eggs = ({ usersArray }) => {
    const [eggsData, setEggsData] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const { data: batchData, refetch: refetchBatches, isLoading: fetchingBatches } = useFetchJointBatchesQuery();
    
    const [updateBatch, { isLoading: updatingBatch, }] = useUpdateBatchMutation();

    const [deleteBatch, { isLoading: deletingBatch }] = useDeletebatchMutation();

    useEffect(() => {
        if (batchData?.data) {
            const recievedBatch = batchData.data.filter(object => object?.batchStatus === 'recieved');

            if (recievedBatch.length > 0) {
                setEggsData(recievedBatch);
            };

        } else {
            setEggsData([]);
            refetchBatches();
        }
    }, [batchData, refetchBatches]);

    const handleSelect = (values) => {

        setSelectedObject(values);
        setIsModalOpen(true);
    };

    const handleDeleteBatch = async () => {

        if (selectedObject?.batchId && user) {
            const response = interceptor({ params: await deleteBatch({ editorId: user?.userId, batchId: selectedObject?.batchId }), type: 'Mutation' });

            if (response) {
                setIsDeleteModal(false);
                refetchBatches();
                setIsModalOpen(false);
            };

        };
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Date',
            dataIndex: 'receivedDate',
            key: 'receivedDate',
            render: (receivedDate) => convertDateToUIFormat(receivedDate),
        },
        {
            title: 'Total Eggs',
            dataIndex: 'totalEggs',
            key: 'totalEggs',
        }, {
            title: 'Location',
            dataIndex: 'userLocation',
            key: 'userLocation',
        },
    ];

    const batchStatusOptions = [
        { value: null, label: 'Select status' },
        { value: 'received', label: 'Received' },
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
    ];

    let options = usersArray?.map((object) => ({
        value: object.userId,
        label: `${object.firstName} ${object.lastName}`,
    }));

    options = [{ value: null, label: 'Select User' }, ...options];

    const onFinish = async (values) => {
        const filtered = filterObjectByValues(values)
        if (selectedObject?.batchId && user) {

            const response = interceptor({ params: await updateBatch({ editorId: user?.userId, batchId: selectedObject.batchId, editedValues: filtered }), type: 'Mutation' });

            if (response) {
                setIsEditModal(false);
                refetchBatches();
                setIsModalOpen(false);
            };

        };
    };

    return (
        <>
            <Table
                title={() => 'Collected eggs'}
                onRow={(record) => ({ onClick: () => handleSelect(record) })}
                key="collectedEggsTable"
                loading={fetchingBatches}
                columns={columns}
                dataSource={eggsData}
                pagination={{ pageSize: 5 }}
                rowKey="batchId"
            />
            <Modal
                title="Eggs Collection Record"
                key="eggsCollectionModal"
                centered
                loading={!selectedObject}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={700}
                footer={[
                    <Button onClick={() => setIsEditModal(true)}>Edit</Button>,
                    <Button danger onClick={() => setIsDeleteModal(true)}>Delete</Button>
                ]}
            >
                <Descriptions column={2} bordered >
                    <Descriptions.Item label='Farmer'>{selectedObject && `${selectedObject?.firstName || ''} ${selectedObject?.lastName || ''} ${selectedObject?.surName || ''}`}</Descriptions.Item>
                    <Descriptions.Item label='Collection Date'>{selectedObject && convertDateToUIFormat(selectedObject?.receivedDate) || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Total Eggs'>{selectedObject && `${selectedObject?.totalEggs}`}</Descriptions.Item>
                    <Descriptions.Item label='Location'>{selectedObject && `${selectedObject?.userLocation || 'N/A'}`}</Descriptions.Item>

                </Descriptions>
            </Modal>
            <Modal
                open={isEditModal}
                centered
                onOk={(details) => onFinish(details)}
                onCancel={() => setIsEditModal(false)}
            >
                <Form
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        name='userId'
                        label='User'
                    >
                        <Select
                            style={{ width: '100%' }}
                            options={options}
                            placeholder={selectedObject ? `${selectedObject.firstName || ''} ${selectedObject.lastName || ''}` : 'Select User'}
                        />
                    </Form.Item>

                    <Form.Item
                        name='receivedDate'
                        label='Received Date'
                    >
                        <DatePicker format='YYYY-MM-DD' placeholder={selectedObject ? convertDateToUIFormat(selectedObject.receivedDate) || new Date() : 'Select date'} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='totalEggs'
                        label='Total Eggs'
                    >
                        <InputNumber min={1} style={{ width: '100%' }} placeholder={selectedObject ? selectedObject.totalEggs || 0 : 'Number of eggs'} />
                    </Form.Item>

                    <Form.Item
                        name='batchStatus'
                        label='Batch Status'
                    >
                        <Select
                            options={batchStatusOptions}
                            style={{ width: '100%' }}
                            placeholder={selectedObject ? selectedObject.batchStatus || 0 : 'Select Status'}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Button type='primary' loading={updatingBatch} htmlType='submit' > Submit </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={isDeleteModal}
                centered
                loading={deletingBatch}
                onOk={handleDeleteBatch}
                onCancel={() => setIsDeleteModal(false)}
            >
                <p>Confirm Deleting collection record.</p>
            </Modal>
        </>
    );
};

export default Collected_Eggs;