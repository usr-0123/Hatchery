import React, { useEffect, useState } from 'react'

import { Button, DatePicker, Form, InputNumber } from 'antd';

import dayjs from 'dayjs';

import { interceptor } from '../../../../services/Interceptor.js';
import { useCreateIncubationMutation } from '../../../../features/apis/incubationApis.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';

const New_Incubation = ({totalEggs}) => {

    const [form] = Form.useForm();

    const [createIncubation, { isLoading: creatingIncubation, }] = useCreateIncubationMutation();

    const newIncubation = async (values) => {
        const notNull = filterObjectByValues(values);

        const response = interceptor({ params: await createIncubation(notNull), type: 'Mutation' });

        if (response) {
            form.resetFields();
            refetchbatches();
        };
    };

    // fetch all batches and get the count and set it into a state

    // also deduct the incubated eggs

    // sumReceivedEggsBatch(batchArray)

    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', gap: '2%' }}>

            <Form
                onFinish={newIncubation}
                form={form}
                layout='vertical'
                title='New Incubation.'
                key='newIncubationForm'
                style={{ width: '50%' }}
            >
                <Form.Item
                    name='totalEggs'
                    label='Total Eggs'
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject(new Error('Please enter number of eggs.'))
                                }

                                if (value < 1) {
                                    return Promise.reject(new Error('The least number of eggs to incubate is 1.'));
                                }

                                if (value > totalEggs) {
                                    return Promise.reject(new Error(`There is ${totalEggs} eggs available.`));
                                }

                                return Promise.resolve();
                            },
                        },]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder='Number of eggs.'
                    />
                </Form.Item>
                <Form.Item
                    name='startDate'
                    label='Start Date'
                    rules={[{
                        required: true,
                        message: 'Please enter the date of incubation.'
                    }]}
                >
                    <DatePicker
                        minDate={dayjs().subtract(21, 'day')}
                        maxDate={dayjs().add(1, 'day')}
                        style={{ width: '100%' }} placeholder='Start date.'
                    />
                </Form.Item>
                <Form.Item>
                    <Button key='newIncubationBtn' htmlType='submit' loading={creatingIncubation} >Submit</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default New_Incubation;