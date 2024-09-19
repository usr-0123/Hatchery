import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Form, Modal, Select, Table } from 'antd';
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { useDeleteUserMutation, useUpdateUserDetailsMutation } from '../../../../features/apis/usersApis.js';
import { decodeToken } from '../../../../helpers/token.js';

const columns = [
  { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  { title: 'Email Address', dataIndex: 'userEmail', key: 'userEmail' },
  {
    title: 'User Role',
    dataIndex: 'userRole',
    key: 'userRole',
    render: (userRole) => (userRole === 'User' ? 'Farmer' : userRole)
  },
  { title: 'User Location', dataIndex: 'userLocation', key: 'userLocation' },
  {
    title: 'Membership Date',
    dataIndex: 'membershipDate',
    key: 'membershipDate',
    render: (membershipDate) => convertDateToUIFormat(membershipDate)
  }
];

const userRoles = [
  { key: 'default', label: 'Select role', value: null },
  { key: 'employee', label: 'Employee', value: 'Employee' },
  { key: 'farmer', label: 'Farmer', value: 'User' },
  { key: 'admin', label: 'Admin', value: 'Admin' }
];

const Users_List = ({ users, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedQId, setSelectedQId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [update, { isLoading: updatingUser }] = useUpdateUserDetailsMutation();
  const [del, { isLoading: isDeleting }] = useDeleteUserMutation();
  const user = decodeToken();

  const handleSelect = (userId) => {
    setSelectedQId(userId);
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    if (user && selectedQId) {
      const response = await interceptor({
        params: update({
          editorId: user.userId,
          userId: selectedQId,
          editedValues: values
        }),
        type: 'Mutation'
      });

      if (response) {
        setEditUser(false);
        refetch();
        form.resetFields();
      }
    }
  };

  const handleDelete = async () => {
    if (selectedQId && user) {
      const response = await interceptor({
        params: del({
          editorId: user.userId,
          userId: selectedQId
        }),
        type: 'Mutation'
      });

      if (response) {
        refetch();
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    if (selectedQId) {
      const userObject = users?.find((u) => u.userId === selectedQId);
      setSelectedUser(userObject || null);
    } else {
      setSelectedUser(null);
    }
  }, [selectedQId, users]);

  useEffect(() => {
    if (selectedUser && editUser) {
      form.setFieldsValue({ userRole: selectedUser.userRole });
    }
  }, [selectedUser, editUser, form]);

  return (
    <>
      <Table
        key='userId'
        onRow={(record) => ({
          onClick: () => handleSelect(record.userId)
        })}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="User Details"
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        footer={[
          <Button key="delete" type="primary" danger onClick={handleDelete} loading={isDeleting}>Delete</Button>,
          <Button type="primary" key="edit" onClick={() => setEditUser(!editUser)}>{!editUser ? 'Edit' : 'Cancel Edit'}</Button>
        ]}
      >

        <Form
          onFinish={onFinish}
          form={form}
          style={{ width: '100%', display: editUser ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <h1>Update this user's role.</h1>
          <Form.Item
            name="userRole"
            rules={[{ required: true, message: 'Please select a role.' }]}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Select
              defaultValue={selectedUser?.userRole}
              style={{ minWidth: '300px' }}
              options={userRoles}
            />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" disabled={updatingUser} loading={updatingUser} htmlType="submit">Update</Button>
          </Form.Item>
        </Form>

        <Descriptions style={{ display: editUser ? 'none' : 'contents' }} bordered column={2}>
          <Descriptions.Item label="Name">{`${selectedUser?.firstName || 'N/A'} ${selectedUser?.lastName || 'N/A'}`}</Descriptions.Item>
          <Descriptions.Item label="User Role">{selectedUser?.userRole === 'User' ? 'Farmer' : selectedUser?.userRole || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Username">{selectedUser?.userName || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Email">{selectedUser?.userEmail || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{selectedUser?.userPhoneNumber || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Street">{selectedUser?.userStreet || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Location">{selectedUser?.userLocation || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Membership Date">{convertDateToUIFormat(selectedUser?.membershipDate) || 'N/A'}</Descriptions.Item>
        </Descriptions>

      </Modal>
    </>
  );
};

export default Users_List;