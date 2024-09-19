import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Form, Input, InputNumber, Modal, Table } from 'antd';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useCreateNewProductPriceMutation, useDeleteProductPriceMutation, useFetchProductPricesQuery, useUpdateProductPriceMutation } from '../../../../features/apis/productPriceApis.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';

const Admin_Products = () => {
  const [productPrices, setProductPrices] = useState([]);
  const [productPrice, setProductPrice] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [form] = Form.useForm();

  const { data: productPricesData, refetch: refetchProductPrices, isLoading: fetchingProducstPrices } = useFetchProductPricesQuery();

  const [create, { isLoading: creatingNewProduct }] = useCreateNewProductPriceMutation();

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

  const handleCreateProduct = async (values) => {

    const response = interceptor({ params: await create(values), type: 'Mutation' });

    if (response) {
      form.resetFields();
      refetchProductPrices();
      setNewProduct(false);
    };

  };

  const handleSelect = (productPriceId) => {
    setSelectedId(productPriceId);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {
    let updateDate = new Date();

    const response = interceptor({ params: await update({ editorId: user?.userId, productPriceId: selectedId, editedValues: { date_updated: updateDate, ...values } }), type: 'Mutation' });

    if (response) {
      form.resetFields();
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
      <Table style={{ display: newProduct ? 'none' : 'contents' }} title={() => 'Products Price Rates'} onRow={(record) => ({ onClick: () => handleSelect(record.productPriceId) })} key='productPriceId' columns={columns} dataSource={productPrices} pagination={{ pageSize: 5 }} />
      <Button type='primary' onClick={() => setNewProduct(!newProduct)} >{!newProduct ? 'Add Product' : 'Close form'}</Button>

      <div style={{ width: '50%', margin: '0 20%' }}>
        <Form
          form={form}
          key='newProductForm'
          layout="vertical"
          style={{ display: newProduct ? 'contents' : 'none' }}
          onFinish={handleCreateProduct}
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
            <Button key="submitEdit" htmlType="submit" type='primary' disabled={creatingNewProduct} loading={creatingNewProduct} >Submit</Button>
          </Form.Item>
        </Form>
      </div>

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
          <Button type='primary' key="edit" onClick={() => setEdit(!edit)} > {edit ? 'Cancel Edit' : 'Edit'} </Button>,
        ]}
      >
        <Form
          form={form}
          key='editDetailsForm'
          style={{ display: !edit ? 'none' : 'contents' }}
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
        </Form>

        <Descriptions style={{ display: edit ? 'none' : 'contents' }} bordered column={2}>

          <Descriptions.Item label="Product"> {productPrice.product_name || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Price"> {productPrice.price || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Currency"> {productPrice.currency || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Last Update"> {convertDateToUIFormat(productPrice.date_updated) || 'N/A'} </Descriptions.Item>

        </Descriptions>
      </Modal>
    </>
  )
}

export default Admin_Products;