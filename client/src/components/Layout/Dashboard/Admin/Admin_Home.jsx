import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'

import Admin_Eggs from './Admin_Eggs.jsx';
import Admin_Chicks from './Admin_Chicks.jsx';
import { useFetchbatchesQuery } from '../../../../features/apis/batchApis.js';
import Admin_SalesDashboard from './Admin_SalesDashboard.jsx';
import Admin_HomeDashboard from './Admin_HomeDashboard.jsx';

const Admin_Home = () => {
  const [batchArray, setBatchArray] = useState([]);
  const [recievedBatch, setRecievedBatch] = useState([]);
  const [hatchedBatch, setHatchedBatch] = useState([]);
  const [incubationBatch, setIncubationBatch] = useState([]);

  const { data: batchData, refetch: refetchBatch } = useFetchbatchesQuery();

  useEffect(() => {
    if (batchData?.data) {
      setBatchArray(batchData.data)
    } else {
      setBatchArray([]);
    };

  }, [batchData, refetchBatch])

  useEffect(() => {
    if (batchArray.length > 0) {
      const recieved = batchArray.filter(object => object.batchStatus === 'recieved' || object.batchStatus === 'received');


      if (recieved.length > 0) {
        setRecievedBatch(recieved);
      } else {
        setRecievedBatch([])
      };

      const hatched = batchArray.filter(object => object.batchStatus === 'hatched');

      if (hatched.length > 0) {
        setHatchedBatch(hatched);
      } else {
        setHatchedBatch([]);
      };

      const incubated = batchArray.filter(object => object.batchStatus === 'incubated');

      if (incubated.length > 0) {
        setIncubationBatch(incubated);
      } else {
        setIncubationBatch([]);
      };

    };
  }, [batchArray]);

  const tabItems = [
    {key: 'admin-general-tab',
      label: 'General',
      children: <Admin_HomeDashboard />,
    }, {
      key: 'admin-sales',
      label: 'Sales Records',
      children: <Admin_SalesDashboard />,
    }, {
      key: 'admin-eggs',
      label: 'Eggs Records',
      children: <Admin_Eggs batch={batchArray} recieved={recievedBatch} hatched={hatchedBatch} incubation={incubationBatch} />,
    }, {
      key: 'all-chicks',
      label: 'Chicks Records',
      children: <Admin_Chicks batch={batchArray} recieved={recievedBatch} hatched={hatchedBatch} incubation={incubationBatch} />,
    }
  ];

  return (
    <Tabs defaultActiveKey="admin-general" items={tabItems} />
  )
}

export default Admin_Home;