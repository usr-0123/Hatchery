import React, { useState } from 'react'
import { Button, Descriptions, Modal, Table } from 'antd';

import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';
import { interceptor } from '../../../../services/Interceptor.js';
import { useDeleteUserMutation } from '../../../../features/apis/usersApis.js';
import { decodeToken } from '../../../../helpers/token.js';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName'
  }, {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName'
  }, {
    title: 'Email Address',
    dataIndex: 'userEmail',
    key: 'userEmail'
  }, {
    title: 'User Role',
    dataIndex: 'userRole',
    key: 'userRole'
  }, {
    title: 'User Location',
    dataIndex: 'userLocation',
    key: 'userLocation'
  }, {
    title: 'Membership Date',
    dataIndex: 'membershipDate',
    key: 'membershipDate',
    render: (membershipDate) => convertDateToUIFormat(membershipDate)
  }
];

const Users_List = ({ users, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedQId, setSelectedQId] = useState(null);

  const [del, {isLoading:isDeleting}] = useDeleteUserMutation();

  const user = decodeToken();

  let userInfo = null;

  const userObject = users?.length > 0 && users?.filter(object => object.userId === selectedQId);

  if (userObject.length > 0) {
    userInfo = userObject[0];
  };

  const handleDelete = async () => {
    if (selectedQId && user) {

      const response = interceptor({ params: await del({ editorId: user?.userId, userId: selectedQId }), type: 'Mutation' });

      if (response) {
        refetch();
        setIsModalOpen(false);
      };
    };
  };

  const handleSelect = (userId) => {
    setSelectedQId(userId);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table key='userId' onRow={(record) => ({ onClick: () => handleSelect(record.userId) })} columns={columns} dataSource={users} pagination={{ pageSize: 5 }} />
      <Modal
        title="User Details"
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        footer={[
          <Button key="delete" onClick={handleDelete} loading={isDeleting}>Delete</Button>,
          !editUser && <Button key="edit" onClick={() => setEditUser(!editUser)} >Edit</Button>,
          editUser && <Button key="cancelEdit" onClick={() => setEditUser(!editUser)} >Cancel Edit</Button>
        ]}
      >
        {userInfo && <Descriptions bordered column={2}>
          <Descriptions.Item label="Name">{userInfo.firstName} {userInfo.lastName} {userInfo.surName || ''}</Descriptions.Item>
          <Descriptions.Item label="User Role">{userInfo.userRole}</Descriptions.Item>
          <Descriptions.Item label="Username">{userInfo.userName || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Email">{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{userInfo.userPhoneNumber || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Street">{userInfo.userStreet || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Location">{userInfo.userLocation || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Membership Date">{convertDateToUIFormat(userInfo.membershipDate)}</Descriptions.Item>
        </Descriptions>}
      </Modal>
    </>
  )
}

export default Users_List;
