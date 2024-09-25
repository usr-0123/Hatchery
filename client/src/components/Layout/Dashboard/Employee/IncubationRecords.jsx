import React, { useEffect, useState } from 'react'

import { Button, DatePicker, Descriptions, Form, InputNumber, Modal, Select, Table } from 'antd';

import { useDeleteIncubationMutation, useFetchIncubationQuery, useUpdateIncubationMutation } from '../../../../features/apis/incubationApis.js';
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { decodeToken } from '../../../../helpers/token.js';
import { useCreateRecordMutation } from '../../../../features/apis/hatchRecordsApis.js';
import { incubationOptions } from '../../../../helpers/globalStrings.js';

const columns = [
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate) => convertDateToUIFormat(startDate),
    }, {
        title: 'Total Eggs',
        dataIndex: 'totalEggs',
        key: 'totalEggs',
    }, {
        title: 'Incubation State',
        dataIndex: 'incubationState',
        showSorterTooltip: {
            target: 'full-header',
        },
        filters: incubationOptions,
        onFilter: (value, record) => record?.incubationState?.indexOf(value) === 0,
        key: 'incubationState',
    }, {
        title: 'Hatch Date',
        dataIndex: 'hatchDate',
        key: 'hatchDate',
        render: (hatchDate) => convertDateToUIFormat(hatchDate),
    }
];

const user = decodeToken();

const IncubationRecords = () => {

    const [incubationArray, setIncubationArray] = useState([]);

    const { data: incubationData, refetch: refetchincubations, isLoading: fetchingIncubationRecords } = useFetchIncubationQuery();

    const [selectedObject, setSelectedObject] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (values) => {
        setSelectedObject(values);
        setIsModalOpen(true);
    };

    const [isEditModalOpen, setEditIsModalOpen] = useState(false);
    const [incubationState, setIncubationState] = useState();
    const [editIncubation, { isLoading: editingIncubation }] = useUpdateIncubationMutation();
    const [newHatchRecord, { isLoading: creatingHatch }] = useCreateRecordMutation();
    const [form] = Form.useForm();

    const handleEdit = async (value) => {
        const notNull = filterObjectByValues(value);

        if (incubationState && incubationState === "Hatched") {

            if (selectedObject && notNull?.hatchedChicks) {

                const hatch = {
                    hatchedChicks: notNull?.hatchedChicks,
                    unHatchedEggs: +selectedObject?.totalEggs - +notNull?.hatchedChicks,
                    dateHatched: notNull?.dateHatched
                };

                if (hatch) {
                    const result = interceptor({ params: await newHatchRecord(hatch), type: 'Mutation' });

                    if (result && user?.userId && selectedObject?.incubationId) {
                        const incubationResponse = interceptor({ params: await editIncubation({ editorId: user?.userId, incubationId: selectedObject.incubationId, editedValues: { IncubationState: 'Hatched' } }), type: 'Mutation' });
                        if (incubationResponse) {
                            form.resetFields();
                            setEditIsModalOpen(false);
                            refetchincubations();
                            setIsModalOpen(false);
                        };
                    };
                };
            };

        } else {

            if (selectedObject.incubationId) {
                const response = interceptor({ params: await editIncubation({ editorId: user?.userId, incubationId: selectedObject.incubationId, editedValues: notNull }), type: 'Mutation' });
                if (response) {
                    form.resetFields();
                    setEditIsModalOpen(false);
                    refetchincubations();
                    setIsModalOpen(false);
                };
            };
        };
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [deleteIncubation, { isLoading: deletingIncubation }] = useDeleteIncubationMutation();

    const onDelete = async () => {
        if (selectedObject?.batchId && user?.userId) {
            const response = interceptor({ params: await deleteIncubation({ editorId: user?.userId, incubationId: selectedObject.incubationId }), type: 'Mutation' });
            if (response) {
                setIsDeleteModalOpen(false);
                refetchincubations();
                setIsModalOpen(false);
            };
        };
    };

    useEffect(() => {
        if (incubationData?.data) {
            if (incubationData?.data.length > 0) {
                setIncubationArray(incubationData?.data);
            } else {
                setIncubationArray([]);
            };
        } else {
            setIncubationArray([]);
            refetchincubations();
        };

    }, [incubationData, refetchincubations]);

    return (
        <>
            <Table
                title={() => 'Active incubations'}
                onRow={(record) => ({ onClick: () => handleSelect(record) })}
                key="listOfIncubations"
                loading={incubationArray.length < 0 || fetchingIncubationRecords}
                columns={columns}
                dataSource={incubationArray}
                pagination={{ pageSize: 5 }}
                rowKey="IncubationId"
                showSorterTooltip={{
                    target: 'filter-icon',
                }}
            />

            <Modal
                key='selectedIncubationModal'
                title='Selected Incubation'
                loading={!selectedObject}
                open={isModalOpen && selectedObject}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={'70%'}
                footer={[
                    <Button key='editIncBtn' onClick={() => setEditIsModalOpen(true)} >Edit</Button>,
                    <Button key='deleteIncBtn' danger onClick={() => setIsDeleteModalOpen(true)} >Delete</Button>
                ]}
            >
                <Descriptions bordered column={2} >
                    <Descriptions.Item label='Start Date' >{selectedObject?.startDate ? convertDateToUIFormat(selectedObject.startDate) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Hatch Date' >{selectedObject?.hatchDate ? convertDateToUIFormat(selectedObject.hatchDate) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Incubation State' >{selectedObject?.incubationState || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Total Eggs' >{selectedObject?.totalEggs || '0'}</Descriptions.Item>
                </Descriptions>
            </Modal>

            <Modal
                key='editincubationRecordsModal'
                title='Edit incubation record.'
                loading={!selectedObject}
                open={isEditModalOpen && selectedObject}
                onCancel={() => setEditIsModalOpen(false)}
                centered
                onOk={form.submit}
                okButtonProps={{ disabled: editingIncubation || creatingHatch, loading: editingIncubation || creatingHatch }}
                okText='Update'
            >
                <Form
                    form={form}
                    onFinish={handleEdit}
                    key='editIncubationForm'
                    layout='vertical'
                >
                    <Form.Item
                        name='incubationState'
                        label='Incubation State'
                    >
                        <Select
                            placeholder={selectedObject && selectedObject.incubationState ? selectedObject.incubationState : 'Select incubation State'}
                            onChange={(value) => setIncubationState(value)}
                            options={incubationOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name='startDate'
                        label='Start Date'
                    >
                        <DatePicker key='startDateEditInput' placeholder={selectedObject && selectedObject.startDate ? convertDateToUIFormat(selectedObject.startDate) : 'Start date'} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name={incubationState && incubationState === "Hatched" ? 'dateHatched' : 'hatchDate'}
                        label='Hatch Date'
                    >
                        <DatePicker key='hatchDateEditInput' placeholder={selectedObject?.hatchDate ? convertDateToUIFormat(selectedObject.hatchDate) : 'Hatch date'} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name={incubationState && incubationState === "Hatched" ? 'hatchedChicks' : 'totalEggs'}
                        label={incubationState && incubationState === "Hatched" ? 'Hatched Chicks' : 'Total Eggs'}
                        rules={[{
                            required: incubationState && incubationState === 'Hatched',
                            message: 'Number of hatched chicks required'
                        }]}
                    >
                        <InputNumber max={selectedObject?.totalEggs} placeholder={incubationState && incubationState === 'Hatched' ? 'Enter the number of hatched chicks.' : selectedObject?.totalEggs || 'Enter number of eggs.'} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title='Confirm deleting this incubation record?'
                open={isDeleteModalOpen}
                key='confirmDeleteIncubation'
                onCancel={() => setIsDeleteModalOpen(false)}
                okType='danger'
                okText='Delete'
                onOk={onDelete}
                okButtonProps={{ disabled: deletingIncubation, loading: deletingIncubation }}
                centered
            />
        </>
    )
};

export default IncubationRecords;