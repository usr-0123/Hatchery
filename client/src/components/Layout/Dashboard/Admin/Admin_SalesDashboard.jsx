import React, { useEffect, useState } from 'react'

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { DatePicker } from 'antd';


import { formatSalesDataByMonth } from '../../../../helpers/eggsCount.js';

const Admin_SalesDashboard = ({ sales }) => {
  const [year, setYear] = useState(2024);

  const onChange = (date, dateString) => {
    const selectedYear = parseInt(dateString, 10);
    setYear(selectedYear);
  };

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
        transform: 'translate(-30px, 0)',
      },
    },
  };

  const transformedData = formatSalesDataByMonth(sales, year);
  
  return (
    <>
      <DatePicker onChange={onChange} placeholder={year || 'Select year'} style={{ width: '30%' }} picker="year" />
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>

        <div style={{ width: '50%' }}>
          <p>Hatch and Unhatched Chicks.</p>
          <BarChart
            style={{ padding: '16px' }}
            dataset={transformedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
            series={[
              { dataKey: 'quantitySold', label: 'Total Chicks Sold' },
            ]}
            {...chartSetting}
          />
        </div>
        <div style={{ width: '50%' }}>
          <p>Revenue From Sold Chicks Over Time.</p>
          <BarChart
            style={{ padding: '16px' }}
            dataset={transformedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
            series={[
              { dataKey: 'totalAmount', label: 'Total Chicks Revenue' },
            ]}
            {...chartSetting}
          />
        </div>
      </div>
      
    </>
  )
}

export default Admin_SalesDashboard;
