import { Tabs } from 'antd';

import React from 'react'

import Hatchery_Records from '../../Layout/Dashboard/Employee/Hatchery_Records.jsx';

const Employee_Hatchery = () => {

  const tabItems = [
    {
      key: 'employee-hatcheries',
      label: 'Hatcheries',
      children: <Hatchery_Records />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-hatchery-tabs" items={tabItems} />

  )
}

export default Employee_Hatchery;