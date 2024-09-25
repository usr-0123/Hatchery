import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Form, Input, InputNumber, Modal, Table } from 'antd';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { useCreateNewProductPriceMutation, useDeleteProductPriceMutation, useFetchProductPricesQuery, useUpdateProductPriceMutation } from '../../../../features/apis/productPriceApis.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';
import NewProductForm from './NewProductForm.jsx';

const Admin_Products = () => {
  const [productPrices, setProductPrices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [form] = Form.useForm();

  const { data: productPricesData, refetch: refetchProductPrices, isLoading: fetchingProducstPrices } = useFetchProductPricesQuery();

  const [update, { isLoading: updating }] = useUpdateProductPriceMutation();

  const [del, { isLoading: isDeleting }] = useDeleteProductPriceMutation();

  const user = decodeToken();

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

  const handleSelect = (value) => {
    setSelectedObject(value)
    setSelectedId(value?.productPriceId);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {

    let updateDate = new Date();

    const response = interceptor({ params: await update({ editorId: user?.userId, productPriceId: selectedId, editedValues: { date_updated: updateDate, ...values } }), type: 'Mutation' });

    if (response) {
      form.resetFields();
      refetchProductPrices();
      setEdit(false);
      setIsModalOpen(false);
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
      <Table style={{ display: newProduct ? 'none' : 'contents' }} title={() => 'Products Price Rates'} onRow={(record) => ({ onClick: () => handleSelect(record) })} key='productPriceId' columns={columns} dataSource={productPrices} pagination={{ pageSize: 5 }} />

      <div style={{ display: newProduct ? 'contents' : 'none' }} >
        <NewProductForm refetchProductPrices={refetchProductPrices} setNewProduct={setNewProduct} />
      </div>
      <Button type='primary' onClick={() => setNewProduct(!newProduct)} >{!newProduct ? 'Add Product' : 'Close form'}</Button>

      <Modal
        title="Product Price Details"
        key="productsModal"
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        footer={[
          <Button key="edit" onClick={() => setEdit(!edit)} > {edit ? 'Cancel Edit' : 'Edit'} </Button>,
          <Button key="delete" danger onClick={handleDelete} loading={isDeleting}>Delete</Button>,
        ]}
      >
        <Form
          form={form}
          key='editDetailsForm'
          style={{ display: !edit ? 'none' : 'contents' }}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            label="Product"
            name="product_name"
          >
            <Input placeholder={selectedObject?.product_name || 'Enter new product name.'} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
          >
            <InputNumber
              min={0}
              placeholder={selectedObject?.price || 'Enter new product price'}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
          >
            <Input placeholder={selectedObject?.currency} />
          </Form.Item>
          <Form.Item>
            <Button key="submitEdit" htmlType="submit" type='primary' disabled={updating} loading={updating} >Update</Button>
          </Form.Item>
        </Form>

        <Descriptions style={{ display: edit ? 'none' : 'contents' }} bordered column={2}>

          <Descriptions.Item label="Product"> {selectedObject?.product_name || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Price"> {selectedObject?.price || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Currency"> {selectedObject?.currency || 'N/A'} </Descriptions.Item>
          <Descriptions.Item label="Last Update"> {convertDateToUIFormat(selectedObject?.date_updated) || 'N/A'} </Descriptions.Item>

        </Descriptions>
      </Modal>
    </>
  )
}

export default Admin_Products;