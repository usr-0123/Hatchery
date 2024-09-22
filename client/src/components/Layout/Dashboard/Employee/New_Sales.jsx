import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';

import { interceptor } from '../../../../services/Interceptor.js';
import { useCreateSaleMutation } from '../../../../features/apis/salesApis.js';
import { filterObjectByValues } from '../../../../helpers/editObjectProperties.js';
import { useFetchProductPricesQuery } from '../../../../features/apis/productPriceApis.js';

const New_Sales = () => {
    const [productPrice, setProductPrice] = useState([]);
    const [form] = Form.useForm();
    const [newSale, { isLoading: creatingSale }] = useCreateSaleMutation();
    const { data: productPricesData, refetch: refetchProductPrices } = useFetchProductPricesQuery()

    useEffect(() => {
        if (productPricesData?.data) {
            const options = productPricesData?.data?.map((object, index) => ({
                value: object.price,
                label: object.product_name,
                key: index,
            }));
            setProductPrice(options);
        } else {
            setProductPrice([]);
            refetchProductPrices();
        };

     }, [productPricesData, refetchProductPrices]);

    const onFinish = async (values) => {

        const notNullObject = filterObjectByValues(values);

        const response = interceptor({ params: await newSale(notNullObject), type: 'Mutation' })
        if (response) {
            form.resetFields();
        };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Form
                key='newSalesForm'
                onFinish={(e) => onFinish(e)}
                form={form}
                style={{ width: '50%' }}
            >
                <Form.Item name='chickPrice' >
                    <Select defaultValue='Select product...' options={productPrice}  rules={[{ required: true, message: 'Chick price is required.'}]} />
                </Form.Item>

                <Form.Item name='saleDate' rules={[{ required: true, message: 'Sale date is required.' }]} >
                    <DatePicker placeholder='Select sales date' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name='quantitySold' rules={[{ required: true, message: 'Quantity sold is required.' }]} >
                    <InputNumber placeholder='Please enter the number of chick sold' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button key='newSalesBtn' loading={creatingSale} htmlType='submit' >Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default New_Sales;