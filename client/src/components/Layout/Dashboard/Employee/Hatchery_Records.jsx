import React, { useEffect, useState } from 'react'
import { Table } from 'antd';

import { useFetchHatchRecordsQuery } from '../../../../features/apis/hatchRecordsApis.js'
import { convertDateToUIFormat } from '../../../../helpers/dateConversion.js';

const Hatchery_Records = ({batch}) => {
    const [hatchRecords, setHatchRecords] = useState();
    const {data: hatchRecordsData, refetch: refetchHatchRecords} = useFetchHatchRecordsQuery();

    useEffect(() => {
        if (hatchRecordsData?.data) {
            setHatchRecords(hatchRecordsData.data);
        } else {
            setHatchRecords([]);
            refetchHatchRecords();
        };
    },[hatchRecordsData, refetchHatchRecords]);
    
    const columns = [
        {
            title: 'Date Hatched',
            dataIndex: 'dateHatched',
            key: 'dateHatched',
            render: ((dateHatched) => convertDateToUIFormat(dateHatched))
        },{
            title: 'Total Eggs',
            dataIndex: ('hatchedChicks','unHatchedEggs'),
            key: 'totalEggs',
            render: (text, record) => record.hatchedChicks + record.unHatchedEggs,
        },{
            title: 'Hatched Chicks',
            dataIndex: 'hatchedChicks',
            key: 'hatchedChicks'
        },{
            title: 'Unhatched Eggs',
            dataIndex: 'unHatchedEggs',
            key: 'unHatchedEggs'
        },
    ]

  return (
    <Table key='hatchRecordsTable' rowKey='hatchRecordid' columns={columns} dataSource={hatchRecords} pagination={{pageSize: 5}} />
  )
}

export default Hatchery_Records;