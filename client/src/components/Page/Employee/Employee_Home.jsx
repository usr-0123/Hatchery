import React, { useEffect, useState } from 'react'

import { Tabs } from 'antd';

import New_Eggs_Collection from '../../Layout/Dashboard/Employee/New_Eggs_Collection.jsx';
import Collected_Eggs from '../../Layout/Dashboard/Employee/Collected_Eggs.jsx';
import { useGetAllUsersQuery } from '../../../features/apis/usersApis.js';

const Employee_Home = () => {
  const [usersArray, setUsersArray] = useState([]);

  const { data: usersData, refetch: refetchUser } = useGetAllUsersQuery();

  useEffect(() => {
    if (usersData?.data) {
      const farmers = usersData.data.filter(object => object.userRole === 'User');

      setUsersArray(farmers);

    } else {
      setUsersArray([]);
      refetchUser();
    }
  }, [usersData]);


  const tabItems = [
    {
      key: 'employee-general-tab',
      label: 'New Collection',
      children: <New_Eggs_Collection usersArray={usersArray} />,
    }, {
      key: 'employee-sales',
      label: 'Collection Records',
      children: <Collected_Eggs usersArray={usersArray} />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-home-tabs" items={tabItems} />
  )
}

export default Employee_Home;