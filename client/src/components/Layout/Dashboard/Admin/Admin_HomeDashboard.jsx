import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { formatBatchAndSalesDataByMonth, formatHatchDataByMonth, sumReceivedEggsBatch } from '../../../../helpers/eggsCount.js';

const Admin_HomeDashboard = ({ batch, recieved, sales, hatchRecords }) => {
  const [totalRecievedEggs, setTotalRecievedEggs] = useState(0);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    if (recieved.length > 0) {
      const eggsRecieved = sumReceivedEggsBatch(recieved)
      setTotalRecievedEggs(eggsRecieved);
    } else {
      setTotalRecievedEggs(0);
    };

  }, [recieved]);

  const transformedData = formatBatchAndSalesDataByMonth(batch, sales, year);

  const transformedHatchData = formatHatchDataByMonth(hatchRecords, year);

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

  const valueFormatter = (value) => `${value}`;

  return (
    <>
      <DatePicker onChange={onChange} placeholder={year || 'Select year'} style={{ width: '30%' }} picker="year" />
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10%' }}>
        <div style={{ width: '45%' }}>
          <p>Hatch and Unhatched Chicks.</p>
          <BarChart
            style={{ padding: '16px' }}
            dataset={transformedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
            series={[
              { dataKey: 'totalEggs', label: 'Total Bought Eggs' },
              { dataKey: 'quantitySold', label: 'Total Chicks Sold' },
            ]}
            {...chartSetting}
          />
        </div>

        <div style={{ width: '45%' }}>
          <p>Hatch and Unhatched Chicks.</p>
          <BarChart
            style={{ padding: '16px' }}
            dataset={transformedHatchData}
            xAxis={[{ scaleType: 'band', dataKey: 'month', label: `Months (${year})` }]}
            series={[
              { dataKey: 'hatchedChicks', label: 'Hatched Chicks', valueFormatter },
              { dataKey: 'unhatchedChicks', label: 'Unhatched Chicks', valueFormatter },
            ]}
            {...chartSetting}
          />
        </div>
      </div>

    </>
  )
}

export default Admin_HomeDashboard;