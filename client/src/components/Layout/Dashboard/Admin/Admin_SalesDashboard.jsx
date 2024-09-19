import React, { useEffect, useState } from 'react'

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Card, Col, Statistic } from 'antd';

import { useFetchSaleQuery } from '../../../../features/apis/salesApis.js';

const Admin_SalesDashboard = () => {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: salesData, refetch: refetchSales } = useFetchSaleQuery();

  useEffect(() => {
    if (salesData?.data) {
      setSales(salesData.data);
    } else {
      setSales([]);
      refetchSales();
    };
  }, [salesData]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} >
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable onClick={() => setIsModalOpen(true)}>
            <Gauge width={150} height={150} value={sales?.length} text={`${sales?.length} chicks`} startAngle={-135} endAngle={135} cornerRadius="50%" />
            <p style={{ width: '100%', textAlign: 'center' }}>Total number of Sales.</p>
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable onClick={() => setIsModalOpen(true)}>
            <Gauge width={150} height={150} value={sales?.length} text={`Ksh. ${sales?.length.toFixed(2)}`} startAngle={-135} endAngle={135} cornerRadius="50%" />
            <p style={{ width: '100%', textAlign: 'center' }}>Total amount from sales.</p>
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable onClick={() => setIsModalOpen(true)}>
            <Gauge width={150} height={150} value={sales?.length} text={`Ksh. ${sales?.length.toFixed(2)}`} startAngle={-135} endAngle={135} cornerRadius="50%" />
            <p style={{ width: '100%', textAlign: 'center' }}>Current month revenue.</p>
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable onClick={() => setIsModalOpen(true)}>
            <Gauge width={150} height={150} value={sales?.length} text={`Ksh. ${sales?.length}`} startAngle={-135} endAngle={135} cornerRadius="50%" />
            <p style={{ width: '100%', textAlign: 'center' }}>Total chicks sold.</p>
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable onClick={() => setIsModalOpen(true)}>
            <Gauge width={150} height={150} value={sales?.length} text={`Ksh. ${sales?.length}`} startAngle={-135} endAngle={135} cornerRadius="100%" />
            <p style={{ width: '100%', textAlign: 'center' }}>Current month chicks sales.</p>
          </Card>
        </Col>
      </div>
    </>
  )
}

export default Admin_SalesDashboard;

// I need to add the total revenue from sales. Allowing for filtered/categorised into date options.
// I need to get a comparison of the eggs recieved vs the eggs sold within a bracket of period.