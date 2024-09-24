import { Button, Card, Descriptions, Form, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react'

import { useCreateBatchMutation } from '../../../../features/apis/batchApis.js';
import { interceptor } from '../../../../services/Interceptor.js';

const New_Eggs_Collection = ({ usersArray }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (selectedUserId && usersArray.length > 0) {
            const userObject = usersArray.filter(user => user.userId === selectedUserId);

            if (userObject.length > 0) {
                setSelectedUser(userObject[0]);
            } else {
                setSelectedUser();
            };

        } else {
            setSelectedUser();
        };

    }, [selectedUserId, usersArray]);

    const options = usersArray?.map((object) => ({
        value: object.userId,
        label: `${object.firstName} ${object.lastName} - ${object.userEmail}`,
    }));

    const [createBatch, { isLoading: creatingBatch }] = useCreateBatchMutation();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const receivedDate = new Date();
        const batchStatus = 'recieved';
        const response = interceptor({ params: await createBatch({ ...values, receivedDate, batchStatus }), type: 'Mutation' });
        if (response) {
            form.resetFields();
        };

    };

    return (
        <div style={{ display: 'flex', width: '100%', gap: '2%' }}>
            <Form
                onFinish={onFinish}
                form={form}
                style={{ width: '40%' }}
            >
                <Form.Item
                    name='userId'
                    rules={[{
                        required: true,
                        message: 'Please select a user.'
                    }]}
                >
                    <Select onChange={(id) => setSelectedUserId(id)} style={{ width: '100%' }} options={options} defaultValue='Select User' />
                </Form.Item>
                <Form.Item
                    name='totalEggs'
                    rules={[{
                        required: true,
                        message: 'Please enter the number of collected eggs..'
                    }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} placeholder='Number of eggs.' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={creatingBatch} >Submit</Button>
                </Form.Item>
            </Form>

            <Card title={'Selected User Info.'} loading={!selectedUser} style={{ width: '60%' }}>
                <Descriptions bordered column={2} colon={true} >
                    <Descriptions.Item label={'Names'} >{selectedUser?.firstName || 'N/A'} {selectedUser?.lastName || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label={'Location:'} >{selectedUser?.userLocation || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label={'Email'} >{selectedUser?.userEmail || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label={'Phone'} >{selectedUser?.userPhoneNumber || 'N/A'}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}

export default New_Eggs_Collection;