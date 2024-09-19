import React, { useState } from 'react'
import { Card, Col, Statistic } from 'antd';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Feb',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const Admin_HomeDashboard = () => {
  const [year, setYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [chicks, setChoicks] = useState(60);
  const [maxValue, setMaxValue] = useState(100);

  const chartSetting = {
    yAxis: [
      {
        label: 'Amount (number)',
      },
    ],
    width: 700,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `${value}`;


  return (
    <>
      <div style={{ margin: '10px', padding: '10px', width: '100%', display: 'flex', flexWrap: 'wrap' }}>

        <BarChart
          // style={{width: '50%' }}
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
          series={[
            { dataKey: 'london', label: 'Bought Chicks' },
            { dataKey: 'paris', label: 'Bought Eggs', valueFormatter },
          ]}
          {...chartSetting}
        />

        <BarChart
          style={{ width: '50%' }}
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
          series={[
            { dataKey: 'newYork', label: 'Hatched Chicks', valueFormatter },
            { dataKey: 'seoul', label: 'Unhatched Chicks', valueFormatter },
          ]}
          {...chartSetting}
        />
      </div>

      {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} >
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable>
            <p style={{ width: '100%', textAlign: 'center' }}>Sold Chicks</p>
            <Gauge width={150} height={150} value={chicks} text={`${chicks} chicks`} startAngle={-135} endAngle={135} cornerRadius="50%" />
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable>
            <p style={{ width: '100%', textAlign: 'center' }}>Hatched Chicks</p>
            <Gauge width={150} height={150} value={60} text={`${chicks} chicks`} startAngle={-120} endAngle={120} cornerRadius="50%" />
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable>
            <p style={{ width: '100%', textAlign: 'center' }}>UnHatched Chicks</p>
            <Gauge width={150} height={150} value={60} text={`${chicks} eggs`} startAngle={-120} endAngle={120} cornerRadius="50%" />
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable>
            <p style={{ width: '100%', textAlign: 'center' }}>Spoilt Eggs</p>
            <Gauge width={150} height={150} value={60} text={`${chicks} eggs`} startAngle={-120} endAngle={120} cornerRadius="50%" />
          </Card>
        </Col>
        <Col style={{ margin: '20px 0 0 0' }} >
          <Card hoverable>
            <p style={{ width: '100%', textAlign: 'center' }}>Bought Eggs</p>
            <Gauge width={150} height={150} value={60} text={`${chicks} eggs`} startAngle={-135} endAngle={135} cornerRadius="50%" />
          </Card>
        </Col>
      </div> */}
    </>
  )
}

export default Admin_HomeDashboard;

// Integrate graphs for data representations