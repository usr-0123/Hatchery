import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';

import New_Incubation from '../../Layout/Dashboard/Employee/New_Incubation.jsx';
import IncubationRecords from '../../Layout/Dashboard/Employee/IncubationRecords.jsx';
import { useFetchbatchesQuery } from '../../../features/apis/batchApis.js';
import { useFetchIncubationQuery } from '../../../features/apis/incubationApis.js';
import { sumConsumedEggsBatch, sumReceivedEggsBatch } from '../../../helpers/eggsCount.js';

const Employee_Incubation = () => {
  const [totalEggs, setTotalEggs] = useState(0);
  const { data: batcheArray, refetch: refetchbatches } = useFetchbatchesQuery();
  const { data: incubationArray, refetch: refetchIncubations } = useFetchIncubationQuery();

  useEffect(() => {
    if (batcheArray?.data && incubationArray?.data) {
      const boughtEggs = sumReceivedEggsBatch(batcheArray?.data);
      const usedEggs = sumConsumedEggsBatch(incubationArray?.data);

      const eggs = +boughtEggs - +usedEggs;

      if (eggs > 0) {
        setTotalEggs(eggs);
      } else {
        setTotalEggs(0);
      };
    } else {
      setTotalEggs(0);
      refetchbatches();
      refetchIncubations();
    };
  }, [batcheArray, incubationArray, refetchbatches, refetchIncubations]);

  const tabItems = [
    {
      key: 'employee-general-tab',
      label: 'New Incubation',
      children: <New_Incubation totalEggs={totalEggs} />,
    }, {
      key: 'employee-incubations',
      label: 'Incubation Records',
      children: <IncubationRecords totalEggs={totalEggs} />,
    }
  ];

  return (
    <Tabs defaultActiveKey="employee-incubation-tabs" items={tabItems} />
  )
}

export default Employee_Incubation;