import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';

import Hatchery_Records from '../../Layout/Dashboard/Employee/Hatchery_Records.jsx';
import IncubationRecords from '../../Layout/Dashboard/Employee/IncubationRecords.jsx';
import Collected_Eggs from '../../Layout/Dashboard/Employee/Collected_Eggs.jsx';
import { useGetAllUsersQuery } from '../../../features/apis/usersApis.js';

const AdminProductionDashboard = () => {
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
            key: 'admin-hatchery-tab',
            label: 'Hatchery',
            children: <Hatchery_Records />,
        }, {
            key: 'admin-incubations-tab',
            label: 'Incubation',
            children: <IncubationRecords />,
        }, {
            key: 'admin-eggsCollection-tab',
            label: 'Eggs Collection',
            children: <Collected_Eggs usersArray={usersArray} />,
        }
    ];
    return (
        <Tabs defaultActiveKey="admin-general" items={tabItems} />
    )
}

export default AdminProductionDashboard;