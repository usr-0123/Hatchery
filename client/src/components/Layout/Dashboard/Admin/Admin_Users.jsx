import React, { useEffect, useState } from 'react'

import { useGetAllUsersQuery } from '../../../../features/apis/usersApis.js';
import Users_List from './Users_List.jsx';
import { Tabs } from 'antd';
import New_User from './New_User.jsx';

const Admin_Users = () => { 
  const [users, setUsers] = useState([]);
  let admins = [];
  let employees = [];
  let farmers = [];

  const { data: usersData, refetch: refetchAllUsers, isLoading: fetchingAllUsers } = useGetAllUsersQuery();

  useEffect(() => {

    if (usersData?.data) {
      setUsers(usersData.data)
    } else {
      refetchAllUsers();
      setUsers([]);
    };

  }, [usersData, refetchAllUsers]);

  admins = users?.filter(object => object.userRole === "Admin");
  employees = users?.filter(object => object.userRole === "Employee");
  farmers = users?.filter(object => object.userRole === "User");

  const tabItems = [
    {
      key: 'admin-users',
      label: 'Users',
      children: <Users_List users={users} refetch={refetchAllUsers} />,
    }, {
      key: 'all-admins',
      label: 'Admins',
      children: <Users_List users={admins} refetch={refetchAllUsers} />,
    }, {
      key: 'all-farmers',
      label: 'Farmers',
      children: <Users_List users={farmers} refetch={refetchAllUsers} />,
    }, {
      key: 'all-employees',
      label: 'Employees',
      children: <Users_List users={employees} />,
    }, {
      key: 'new-user',
      label: 'Add User',
      children: <New_User />,
    }
  ];

  return (
    <Tabs defaultActiveKey="admin-general" items={tabItems} />
  )
}

export default Admin_Users;