import { Modal, Tabs, Button } from 'antd';
import React, { useEffect, useState } from 'react'

import Admin_Eggs from './Admin_Eggs.jsx';
import Admin_Chicks from './Admin_Chicks.jsx';
import Admin_SalesDashboard from './Admin_SalesDashboard.jsx';
import Admin_HomeDashboard from './Admin_HomeDashboard.jsx';
import { useFetchJointBatchesQuery } from '../../../../features/apis/batchApis.js';
import { useFetchSaleQuery } from '../../../../features/apis/salesApis.js';
import { useFetchHatchRecordsQuery } from '../../../../features/apis/hatchRecordsApis.js';

import { DownloadOutlined } from '@ant-design/icons';
import { generatePDF } from '../../../../helpers/pdf.js';

const Admin_Home = () => {
  const [batchArray, setBatchArray] = useState([]);
  const [salesArray, setSalesArray] = useState([]);
  const [hatchArray, setHatchArray] = useState([]);
  const [recievedBatch, setRecievedBatch] = useState([]);
  const [hatchedBatch, setHatchedBatch] = useState([]);
  const [incubationBatch, setIncubationBatch] = useState([]);
  const [downloadModal, setDownloadModal] = useState(false);

  const { data: batchData, refetch: refetchBatch } = useFetchJointBatchesQuery();

  const { data: salesData, refetch: refetchSales } = useFetchSaleQuery();

  const { data: hatchRecords, refetch: refetchHatchRecords } = useFetchHatchRecordsQuery();

  useEffect(() => {
    if (batchData?.data) {
      setBatchArray(batchData.data)
    } else {
      setBatchArray([]);
      refetchBatch();
    };

    if (salesData?.data) {
      setSalesArray(salesData.data)
    } else {
      setSalesArray([]);
      refetchSales();
    };

    if (hatchRecords?.data) {
      setHatchArray(hatchRecords.data)
    } else {
      setHatchArray([]);
      refetchHatchRecords();
    };

  }, [batchData, salesData, hatchRecords, refetchBatch, refetchSales, refetchHatchRecords])

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
    {
      key: 'admin-general-tab',
      label: 'General',
      children: <Admin_HomeDashboard batch={batchArray} recieved={recievedBatch} sales={salesArray} hatchRecords={hatchArray} />,
    }, {
      key: 'admin-sales',
      label: 'Sales Records',
      children: <Admin_SalesDashboard batch={batchArray} recieved={recievedBatch} sales={salesArray} hatchRecords={hatchArray} />,
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
    <>
      <Tabs defaultActiveKey="admin-general" items={tabItems} />
      <Modal
        title='Generate pdf Report'
        open={downloadModal}
        centered
        onCancel={() => setDownloadModal(false)}
        onOk={() => generatePDF({ farmerRecords:recievedBatch, incubationRecords: [], hatchRecords:hatchArray })}
        okText='Download'
        okButtonProps={{ icon: <DownloadOutlined /> }}
      >
      </Modal>
      <Button type="primary" icon={<DownloadOutlined />} onClick={() => setDownloadModal(true)} size={'large'}>Download Sales Report</Button>
    </>
  )
}

export default Admin_Home;