import React, { useEffect, useState } from 'react'

import { Button, DatePicker, Descriptions, Form, InputNumber, Modal, Select, Table } from 'antd';

import { useDeleteIncubationMutation, useFetchIncubationQuery, useUpdateIncubationMutation } from '../../../../features/apis/incubationApis.js';
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { decodeToken } from '../../../../helpers/token.js';
import { useCreateRecordMutation } from '../../../../features/apis/hatchRecordsApis.js';
import { useUpdateBatchMutation } from '../../../../features/apis/batchApis.js';
import { incubationOptions } from '../../../../helpers/globalStrings.js';

const columns = [
    {
        title: 'Incubation State',
        dataIndex: 'IncubationState',
        key: 'IncubationState',
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate) => convertDateToUIFormat(startDate),
    }, {
        title: 'Hatch Date',
        dataIndex: 'hatchDate',
        key: 'hatchDate',
        render: (hatchDate) => convertDateToUIFormat(hatchDate),
    }
];

const user = decodeToken();

const IncubationRecords = ({ batch }) => {

    const [incubationArray, setIncubationArray] = useState([]);

    const { data: incubationData, refetch: refetchincubations, isLoading: fetchingIncubationRecords } = useFetchIncubationQuery();

    const [selectedObject, setSelectedObject] = useState();
    const [selectedBatchObject, setSelectedBatchObject] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (values) => {
        setSelectedObject(values);
        setIsModalOpen(true);
    };

    const [isEditModalOpen, setEditIsModalOpen] = useState(false);
    const [isEditValues, setEditIsEditValues] = useState({});
    const [isHatchValues, setIsHatchValues] = useState({});
    const [isHatched, setIsHatched] = useState(false);
    const [editIncubation, { isLoading: editingIncubation }] = useUpdateIncubationMutation();
    const [updateBatch, {isLoading: updatingBatch}] = useUpdateBatchMutation();
    const [newHatch, { isLoading: creatingHatch }] = useCreateRecordMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditValues?.IncubationState === "Hatched") {
            setIsHatched(true);
        } else {
            setIsHatched(false);
        };

        if (selectedObject?.batchId) {
            const batchObject = batch.filter(object => object?.batchId === selectedObject.batchId);

            if (batchObject.length > 0) {
                setSelectedBatchObject(batchObject[0])
            } else {
                setSelectedBatchObject(null);
            };
        } else {
            setSelectedBatchObject(null);
        };
    }, [isEditValues, isHatchValues]);

    const handleEdit = async () => {
        if (isHatched) {
            if (selectedObject?.batchId) {
                const { hatchedChicks, dateHatched } = isHatchValues;
                const hatch = {
                    batchId: selectedObject?.batchId,
                    unHatchedEggs: +selectedBatchObject?.totalEggs - +hatchedChicks,
                    hatchedChicks,
                    dateHatched
                };
                const hatchNotNull = filterObjectByValues(hatch);
                if (hatchNotNull) {
                    const result = { params: await newHatch(hatchNotNull), type: 'Mutation' };
                    
                    if (result) {
                        const incubationResponse = { params: await editIncubation({ editorId: user?.userId, incubationId: selectedObject.incubationId, editedValues: {IncubationState: 'Hatched'}}), type: 'Mutation' };
                        const batchResponse = { params: await updateBatch({ editorId: user?.userId, batchId: selectedObject.batchId, editedValues: {batchStatus: 'Hatched'}}), type: 'Mutation' };
                        if (incubationResponse && batchResponse) {
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
                const notNull = filterObjectByValues(isEditValues);
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
            const ongoingIncubations = incubationData?.data.filter(object => object.IncubationState === 'Ongoing');
            if (ongoingIncubations.length > 0) {
                setIncubationArray(ongoingIncubations);
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
            />
            <Modal
                key='selectedIncubationModal'
                title='Selected Incubation'
                loading={!selectedObject}
                open={isModalOpen && selectedObject}
                onCancel={() => setIsModalOpen(false)}
                centered
                footer={[
                    <Button key='editIncBtn' onClick={() => setEditIsModalOpen(true)} >Edit</Button>,
                    <Button key='deleteIncBtn' danger onClick={() => setIsDeleteModalOpen(true)} >Delete</Button>
                ]}
            >
                <Descriptions bordered column={2} >
                    <Descriptions.Item label='Start Date' >{selectedObject?.startDate ? convertDateToUIFormat(selectedObject.startDate) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Hatch Date' >{selectedObject?.hatchDate ? convertDateToUIFormat(selectedObject.hatchDate) : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label='Incubation State' >{selectedObject?.IncubationState || 'N/A'}</Descriptions.Item>
                </Descriptions>
            </Modal>
            <Modal
                key='editincubationRecordsModal'
                title='Edit incubation record.'
                loading={!selectedObject}
                open={isEditModalOpen && selectedObject}
                onCancel={() => setEditIsModalOpen(false)}
                centered
                onOk={handleEdit}
                okButtonProps={{ disabled: editingIncubation, loading: editingIncubation || updatingBatch }}
                okText='Update'
            >
                <Form
                    form={form}
                    key='editIncubationForm'
                >
                    <Form.Item
                        name='IncubationState'
                    >
                        <Select placeholder={selectedObject && selectedObject.IncubationState ? selectedObject.IncubationState : 'Select incubation State'} onChange={(value) => setEditIsEditValues({ ...isEditValues, IncubationState: value })} options={incubationOptions} />
                    </Form.Item>
                    <Form.Item
                        name='startDate'
                        hidden={isHatched}
                    >
                        <DatePicker key='startDateEditInput' placeholder={selectedObject && selectedObject.startDate ? convertDateToUIFormat(selectedObject.startDate) : 'Start date'} onChange={(value) => setEditIsEditValues({ ...isEditValues, startDate: value })} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='hatchDate'
                        hidden={isHatched}
                    >
                        <DatePicker key='hatchDateEditInput' placeholder={selectedObject && selectedObject.hatchDate ? convertDateToUIFormat(selectedObject.hatchDate) : 'Hatch date'} onChange={(value) => setEditIsEditValues({ ...isEditValues, hatchDate: value })} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='dateHatched'
                        hidden={!isHatched}
                        rules={[{
                            required: true,
                            message: 'The hatch date is required.'
                        }]}
                    >
                        <DatePicker key='dateHatchedEditInput' placeholder={'Enter hatched date'} onChange={(value) => setIsHatchValues({ ...isHatchValues, dateHatched: value })} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='hatchedChicks'
                        rules={[{
                            required: true,
                            message: 'The number of hatched chicks is required.'
                        }]}
                        hidden={!isHatched}
                    >

                        <InputNumber max={selectedBatchObject?.totalEggs} placeholder={'Enter number of hatched chicks'} onChange={(value) => setIsHatchValues({ ...isHatchValues, hatchedChicks: value })} style={{ width: '100%' }} />
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