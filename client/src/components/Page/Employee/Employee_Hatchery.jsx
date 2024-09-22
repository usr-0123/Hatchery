import React, { useEffect, useState } from 'react'

import { Tabs } from 'antd';

import { useFetchJointBatchesQuery } from '../../../features/apis/batchApis.js';

import New_Hatchery from '../../Layout/Dashboard/Employee/New_Hatchery.jsx';
import Hatchery_Records from '../../Layout/Dashboard/Employee/Hatchery_Records.jsx';

const Employee_Hatchery = () => {
  const [batchesData, setBatchesData] = useState([]);

  const { data: batchData, refetch: refetchBatches, isLoading: fetchingBatches } = useFetchJointBatchesQuery();

  useEffect(() => {
    if (batchData?.data) {
      const hatchery = batchData?.data.filter(object => object.batchStatus === 'hatched' || object.batchStatus === 'Hatched');

      if (hatchery.length > 0) {
        setBatchesData(hatchery);
      } else {
        setBatchesData([]);
      };

    } else {
      setBatchesData([]);
      refetchBatches();
    }
  }, [batchData, refetchBatches]);

  const tabItems = [
    {
      key: 'employee-hatcheries',
      label: 'Hatcheries',
      children: <Hatchery_Records batch={batchesData} loadingBatches={fetchingBatches} refetchBatches={refetchBatches} />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-hatchery-tabs" items={tabItems} />

  )
}

export default Employee_Hatchery;