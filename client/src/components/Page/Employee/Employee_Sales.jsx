import React from 'react'
import { Tabs } from 'antd';

import Sales_Records from '../../Layout/Dashboard/Employee/Sales_Records.jsx';
import New_Sales from '../../Layout/Dashboard/Employee/New_Sales.jsx';

const Employee_Sales = () => {
  const tabItems = [
    {
      key: 'employee-sales',
      label: 'New Sales',
      children: <New_Sales />,
    },{
      key: 'employee-new-sales',
      label: 'Sales',
      children: <Sales_Records />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-sales-tabs" items={tabItems} />
  )
}

export default Employee_Sales;