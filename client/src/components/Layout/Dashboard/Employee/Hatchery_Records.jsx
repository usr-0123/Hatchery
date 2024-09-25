import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Descriptions, Form, InputNumber, Modal, Table } from 'antd';

import { useDeleteHatchMutation, useFetchHatchRecordsQuery, useUpdateHatchRecordsMutation } from '../../../../features/apis/hatchRecordsApis.js'
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';

const user = decodeToken();

const Hatchery_Records = () => {
    const [form] = Form.useForm();
    
    const [hatchRecords, setHatchRecords] = useState();

    const { data: hatchRecordsData, refetch: refetchHatchRecords, isLoading: loadingHatchRecords } = useFetchHatchRecordsQuery();

    const [updateHatch, { isLoading: updatingHatchRecords }] = useUpdateHatchRecordsMutation();

    const [deletehatch, { isLoading: deletingHatch }] = useDeleteHatchMutation();

    const [selectedObject, setSelectedObject] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (hatchRecordsData?.data) {
            setHatchRecords(hatchRecordsData.data);
        } else {
            setHatchRecords([]);
            refetchHatchRecords();
        };
    }, [hatchRecordsData, refetchHatchRecords]);

    const columns = [
        {
            title: 'Date Hatched',
            dataIndex: 'dateHatched',
            key: 'dateHatched',
            render: (dateHatched) => convertDateToUIFormat(dateHatched)
        }, {
            title: 'Total Eggs',
            dataIndex: ('hatchedChicks', 'unHatchedEggs'),
            key: 'totalEggs',
            render: (text, record) => record.hatchedChicks + record.unHatchedEggs,
        }, {
            title: 'Hatched Chicks',
            dataIndex: 'hatchedChicks',
            key: 'hatchedChicks'
        }, {
            title: 'Unhatched Eggs',
            dataIndex: 'unHatchedEggs',
            key: 'unHatchedEggs'
        },
    ]

    const handleSelect = (params) => {
        setSelectedObject(params);
        setIsModalOpen(true);
    };

    const handleEdit = async (params) => {
        const notNull = filterObjectByValues(params);

        const response = interceptor({ params: await updateHatch({ editorId: user?.userId, hatchRecordId: selectedObject?.hatchRecordId, editedValues: notNull }), type: 'Mutation' })
        if (response) {
            form.resetFields();
            setEditModalOpen(false);
            refetchHatchRecords();
            setIsModalOpen(false);
        };
    };

    const onDelete = async () => {
        if (selectedObject?.hatchRecordId && user?.userId) {
            const response = interceptor({ params: await deletehatch({ editorId: user?.userId, hatchRecordId: selectedObject?.hatchRecordId }), type: 'Mutation' });
            if (response) {
                setIsDeleteModalOpen(false);
                refetchHatchRecords();
                setIsModalOpen(false);
            };
        };
    };

    return (
        <>

            <Table
                key='hatchRecordsTable'
                title={() => 'Hatch Records'}
                onRow={(record) => ({ onClick: () => handleSelect(record) })}
                loading={loadingHatchRecords}
                columns={columns}
                dataSource={hatchRecords}
                pagination={{ pageSize: 5 }}
                rowKey='hatchRecordId'
            />

            <Modal
                key='selectedHatchObjectModal'
                title='Selected Hatch.'
                loading={!selectedObject}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={'70%'}
                footer={[
                    <Button key='editHatchBtn' onClick={() => setEditModalOpen(true)} >Edit</Button>,
                    <Button key='deleteHatchBtn' danger onClick={() => setIsDeleteModalOpen(true)} >Delete</Button>
                ]}
            >
                <Descriptions bordered column={2} >
                    <Descriptions.Item label='Hatch Date' >{selectedObject?.dateHatched ? convertDateToUIFormat(selectedObject.dateHatched) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Total Eggs' >{selectedObject?.hatchedChicks + selectedObject?.unHatchedEggs || '0'}</Descriptions.Item>
                    <Descriptions.Item label='Hatched Chicks' >{selectedObject?.hatchedChicks || '0'}</Descriptions.Item>
                    <Descriptions.Item label='UnHatched Eggs' >{selectedObject?.unHatchedEggs || '0'}</Descriptions.Item>
                </Descriptions>
            </Modal>

            <Modal
                key='editHatchModal'
                title='Edit hatch record.'
                loading={!selectedObject}
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                centered
                onOk={() => form.submit()}
                okButtonProps={{ disabled: updatingHatchRecords, loading: updatingHatchRecords, htmlType: 'submit' }}
                okText='Update'
            >
                <Form
                    onFinish={handleEdit}
                    form={form}
                    key='editHatchRecord'
                    layout='vertical'
                >
                    <Form.Item
                        name='dateHatched'
                        label='Hatch Date'
                    >
                        <DatePicker
                            placeholder={selectedObject?.dateHatched ? convertDateToUIFormat(selectedObject?.dateHatched) : 'Hatched date.'}
                            key='hatchedDateEditinput'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='hatchedChicks'
                        label='Hatched Chicks'
                    >
                        <InputNumber
                            placeholder={selectedObject?.hatchedChicks || 'Please enter number of hatched chicks.'}
                            key='hatchedChicksEditInput'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                </Form>
            </Modal>

            <Modal
                title='Confirm delete?'
                open={isDeleteModalOpen}
                key='confirmDeleteHatch'
                onCancel={() => setIsDeleteModalOpen(false)}
                okType='danger'
                okText='Delete'
                onOk={onDelete}
                okButtonProps={{ disabled: deletingHatch, loading: deletingHatch }}
                centered
            />
        </>
    )
}

export default Hatchery_Records;