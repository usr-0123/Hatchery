import React, { useEffect, useState } from 'react'

import { Button, Card, DatePicker, Descriptions, Form, InputNumber, Select, Table } from 'antd';

import dayjs from 'dayjs';

import { useCreateBatchMutation, useUpdateBatchMutation } from '../../../../features/apis/batchApis.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { decodeToken } from '../../../../helpers/token.js';
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useCreateIncubationMutation } from '../../../../features/apis/incubationApis.js';

const user = decodeToken();

const New_Incubation = ({ usersArray, batch, refetchBatches }) => {
    const [newBatch, setNewBatch] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [batchEggs, setBatchEggs] = useState(0);
    const [incubationDate, setIncubationDate] = useState();

    useEffect(() => {
        if (batch?.length > 0) {
            const newBatches = batch.filter(object => object.batchStatus === 'new');

            if (newBatches.length > 0) {
                setNewBatch(newBatches);
            } else {
                setNewBatch([]);
            };
        } else {
            setNewBatch([])
            refetchBatches();
        };

    }, [batch, refetchBatches]);

    const [form] = Form.useForm();

    const [createBatch, { isLoading: creatingBatch }] = useCreateBatchMutation();

    const onFinish = async () => {

        const result = await createBatch({ totalEggs: +batchEggs, userId: user?.userId, receivedDate: new Date(), batchStatus: 'new' });

        if (result.data) {
            form.resetFields();
        } else {
            interceptor({ params: result, type: 'Mutation' })
        };

    };

    const [createIncubation, { isLoading: creatingIncubation, }] = useCreateIncubationMutation();

    const [updateBatch, { isLoading: updatingBatch, }] = useUpdateBatchMutation();

    const newIncubation = async () => {

        if (incubationDate && selectedBatch) {
            const response = interceptor({ params: await createIncubation({ batchId: selectedBatch, startDate: incubationDate }), type: 'Mutation' });
            if (response) {
                form.resetFields();
                const UpdatRresponse = interceptor({ params: await updateBatch({ editorId: user?.userId, batchId: selectedBatch, editedValues: { batchStatus: 'incubation' } }), type: 'Mutation' });
                if (UpdatRresponse) {
                    refetchBatches();
                };

            };
        };
    };

    const newBatchColumns = [
        {
            title: 'Date',
            dataIndex: 'receivedDate',
            key: 'receivedDate',
            render: (date) => convertDateToUIFormat(date),
        }, {
            title: 'Amount',
            dataIndex: 'totalEggs',
            key: 'totalEggs',
        }
    ]

    return (
        <div style={{ display: 'flex', width: '100%', gap: '2%' }}>
            <Form
                onFinish={onFinish}
                form={form}
                key='newBatch'
                style={{ width: '50%', display: selectedBatch ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Form.Item>
                    <p>New Batch Form.</p>
                </Form.Item>
                <Form.Item
                    name='totalEggs'
                    rules={[{
                        required: true,
                        message: 'Please enter the number of collected eggs..'
                    }]}
                >
                    <InputNumber onChange={(value) => setBatchEggs(value)} min={1} style={{ width: '100%' }} placeholder='Number of eggs.' />
                </Form.Item>
                <Form.Item>
                    <Button key='newBatchBtn' type='primary' onClick={onFinish} loading={creatingBatch} >Submit</Button>
                </Form.Item>
            </Form>

            <Form
                onFinish={newIncubation}
                form={form}
                title={() => 'New Incubation.'}
                key='newIncubationForm'
                style={{ width: '50%', display: selectedBatch ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}
            >
                <Form.Item>
                    <p>New Incubation Form.</p>
                </Form.Item>
                <Form.Item
                    name='startDate'
                    rules={[{
                        required: true,
                        message: 'Please enter the date of incubation.'
                    }]}
                >
                    <DatePicker
                        onChange={(value) => setIncubationDate(value)}
                        minDate={dayjs().subtract(21, 'day')}
                        maxDate={dayjs().add(1, 'day')}
                        style={{ width: '100%' }} placeholder='Start date.'
                    />
                </Form.Item>
                <Form.Item>
                    <Button key='newIncubationBtn' type='primary' disabled={!incubationDate} onClick={newIncubation} loading={creatingIncubation} >Submit</Button>
                </Form.Item>
            </Form>

            <Card title='Available Batches.' loading={newBatch.length < 0} style={{ width: '60%' }}>
                <p>Click any to select</p>
                <Table dataSource={newBatch} columns={newBatchColumns} key='newBatchesTable' rowKey='batchId' pagination={{ pageSize: 5 }} onRow={(record) => ({ onClick: () => setSelectedBatch(record.batchId) })} />
            </Card>

        </div>
    )
}

export default New_Incubation;