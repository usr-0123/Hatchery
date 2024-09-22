import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'

import New_Incubation from '../../Layout/Dashboard/Employee/New_Incubation.jsx';

import { useGetAllUsersQuery } from '../../../features/apis/usersApis.js';
import { useFetchJointBatchesQuery } from '../../../features/apis/batchApis.js';
import IncubationRecords from '../../Layout/Dashboard/Employee/IncubationRecords.jsx';

const Employee_Incubation = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [batchesData, setBatchesData] = useState([]);

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

  const { data: batchData, refetch: refetchBatches, isLoading: fetchingBatches } = useFetchJointBatchesQuery();

  useEffect(() => {
    if (batchData?.data) {
      setBatchesData(batchData.data);
    } else {
      setBatchesData([]);
      refetchBatches();
    }
  }, [batchData, refetchBatches]);

  const tabItems = [
    {
      key: 'employee-general-tab',
      label: 'New Incubation',
      children: <New_Incubation usersArray={usersArray} batch={batchesData} refetchBatches={refetchBatches} />,
    }, {
      key: 'employee-incubations',
      label: 'Incubation Records',
      children: <IncubationRecords batch={batchesData} />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-incubation-tabs" items={tabItems} />
  )
}

export default Employee_Incubation;