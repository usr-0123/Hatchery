import React from 'react'

import { useCreateNewProductPriceMutation } from '../../../../features/apis/productPriceApis.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { Button, Form, Input, InputNumber } from 'antd';

const NewProductForm = ({ refetchProductPrices, setNewProduct }) => {
    const [form] = Form.useForm();
    const [create, { isLoading: creatingNewProduct }] = useCreateNewProductPriceMutation();

    const handleCreateProduct = async (values) => {

        const response = interceptor({ params: await create(values), type: 'Mutation' });

        if (response) {
            form.resetFields();
            refetchProductPrices();
            setNewProduct(false);
        };

    };

    return (
        <Form
            style={{ width: '50%', margin: '0 20%' }}
            form={form}
            key='newProductForm'
            layout="vertical"
            onFinish={handleCreateProduct}
        >
            <Form.Item
                label="Product"
                name="product_name"
                rules={[{ required: true, message: 'Please enter the product name' }]}
            >
                <Input placeholder='Enter the product name' />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please enter the price' }]}
            >
                <InputNumber
                    min={0}
                    placeholder='Enter product price'
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                label="Currency"
                name="currency"
                rules={[{ required: true, message: 'Please enter the currency' }]}
            >
                <Input placeholder='Enter the currency' />
            </Form.Item>
            <Form.Item>
                <Button key="submitEdit" htmlType="submit" type='primary' disabled={creatingNewProduct} loading={creatingNewProduct} >Submit</Button>
            </Form.Item>
        </Form>
    )
}

export default NewProductForm;