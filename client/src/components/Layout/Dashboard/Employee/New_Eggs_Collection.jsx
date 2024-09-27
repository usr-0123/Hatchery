import { Button, Card, Descriptions, Form, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react'

import { useCreateBatchMutation } from '../../../../features/apis/batchApis.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { batchStatus } from '../../../../helpers/globalStrings.js';
import { useFetchProductPricesQuery } from '../../../../features/apis/productPriceApis.js';

const New_Eggs_Collection = ({ usersArray }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [product, setProduct] = useState([]);
    const { data: productsArray, refetch: refetchProductsArray } = useFetchProductPricesQuery();

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

        if (productsArray?.data) {
            if (productsArray?.data.length > 0) {
                setProduct(productsArray?.data);
            } else {
                setProduct();
            };
        } else {
            setProduct();
            refetchProductsArray();
        };

    }, [selectedUserId, productsArray, usersArray, refetchProductsArray]);

    const options = usersArray?.map((object) => ({
        value: object.userId,
        label: `${object.firstName} ${object.lastName} - ${object.userEmail}`,
    }));

    const productsOptions = product?.map((object) => ({
        value: object.price,
        label: `${object.product_name}`,
    }));

    const [createBatch, { isLoading: creatingBatch }] = useCreateBatchMutation();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        
        const receivedDate = new Date();
        const response = interceptor({ params: await createBatch({ ...values, receivedDate, batchStatus: batchStatus.recieved.value }), type: 'Mutation' });
        if (response) {
            form.resetFields();
            setSelectedUserId(null);
        };
    };

    return (
        <div style={{ display: 'flex', width: '100%', gap: '2%' }}>
            <Form
                onFinish={onFinish}
                form={form}
                style={{ width: '40%' }}
                layout='vertical'
            >
                <Form.Item
                    label='Farmer'
                    name='userId'
                    rules={[{
                        required: true,
                        message: 'Please select a user.'
                    }]}
                >
                    <Select onChange={(id) => setSelectedUserId(id)} style={{ width: '100%' }} options={options} defaultValue='Select User' />
                </Form.Item>
                <Form.Item
                    name='price'
                    label='Product Price'
                    rules={[{
                        required: true,
                        message: 'Please select a product.'
                    }]}
                >
                    <Select style={{ width: '100%' }} options={productsOptions} defaultValue='Select Product.' />
                </Form.Item>
                <Form.Item
                    name='totalEggs'
                    label='Number of Eggs'
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