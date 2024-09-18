import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Form, Input, InputNumber, Modal, Table } from 'antd';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useDeleteProductPriceMutation, useFetchProductPricesQuery, useUpdateProductPriceMutation } from '../../../../features/apis/productPriceApis.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';

const Admin_Products = () => {
  const [productPrices, setProductPrices] = useState([]);
  const [productPrice, setProductPrice] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const { data: productPricesData, refetch: refetchProductPrices, isLoading: fetchingProducstPrices } = useFetchProductPricesQuery();

  const [update, { isLoading: updating }] = useUpdateProductPriceMutation();

  const [del, { isLoading: isDeleting }] = useDeleteProductPriceMutation();

  const user = decodeToken();

  const productPriceObject = productPrices?.length > 0 && productPrices?.filter(object => object.productPriceId === selectedId);

  useEffect(() => {
    if (productPriceObject.length > 0) {
      setProductPrice(productPriceObject[0]);
    };
  }, [productPriceObject])

  useEffect(() => {
    if (productPricesData?.data) {
      setProductPrices(productPricesData.data);
    } else {
      setProductPrices([]);
      refetchProductPrices();
    };

  }, [productPricesData, refetchProductPrices]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name'
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    }, {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency'
    }, {
      title: 'Last Updated Date',
      dataIndex: 'date_updated',
      key: 'date_updated',
      render: (date_updated) => convertDateToUIFormat(date_updated)
    }
  ];

  const handleSelect = (productPriceId) => {
    setSelectedId(productPriceId);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {
    let updateDate = new Date();
    
    const response = interceptor({ params: await update({ editorId: user?.userId, productPriceId: selectedId, editedValues: {date_updated: updateDate, ...values} }), type: 'Mutation' });

    if (response) {
      refetchProductPrices();
      setEdit(false);
    };
  };

  const handleDelete = async () => {
    if (selectedId && user) {

      const response = interceptor({ params: await del({ editorId: user?.userId, productPriceId: selectedId }), type: 'Mutation' });

      if (response) {
        refetchProductPrices();
        setIsModalOpen(false);
      };
    };
  };

  return (
    <>
      <Table title={() => 'Products Price Rates'} onRow={(record) => ({ onClick: () => handleSelect(record.productPriceId) })} key='productPriceId' columns={columns} dataSource={productPrices} pagination={{ pageSize: 5 }} />
      <Modal
        title="Product Price Details"
        key="productsModal"
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        footer={[
          <Button key="delete" danger type='primary' onClick={handleDelete} loading={isDeleting}>Delete</Button>,
          !edit && <Button type='primary' key="edit" onClick={() => setEdit(!edit)} >Edit</Button>,
          edit && <Button type='primary' key="cancelEdit" onClick={() => setEdit(!edit)} >Cancel Edit</Button>

        ]}
      >
        {edit ?
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              product_name: productPrice.product_name,
              price: productPrice.price,
              currency: productPrice.currency,
            }}
            onFinish={handleEditSubmit}
          >
            <Form.Item
              label="Product"
              name="product_name"
              rules={[{ required: true, message: 'Please enter the product name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Currency"
              name="currency"
              rules={[{ required: true, message: 'Please select the currency' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button key="submitEdit" htmlType="submit" type='primary' disabled={updating} loading={updating} >Update</Button>
            </Form.Item>
          </Form> :
          <Descriptions bordered column={2}>

            <Descriptions.Item label="Product"> {productPrice.product_name || 'N/A'} </Descriptions.Item>
            <Descriptions.Item label="Price"> {productPrice.price || 'N/A'} </Descriptions.Item>
            <Descriptions.Item label="Currency"> {productPrice.currency || 'N/A'} </Descriptions.Item>
            <Descriptions.Item label="Last Update"> {convertDateToUIFormat(productPrice.date_updated) || 'N/A'} </Descriptions.Item>

          </Descriptions>
        }
      </Modal>
    </>
  )
}

export default Admin_Products;