import React, { useState } from 'react'
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';

const Farmer_Production = ({ batches }) => {
    const [value, setValue] = useState(dayjs());
    const [selectedValue, setSelectedValue] = useState(dayjs());

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const cellRender = (current, info) => {

        const currentDate = current.format('YYYY-MM-DD');
        const currentMonth = current.month();

        if (info.type === 'date') {
            const batchesForDay = batches.filter(batch => dayjs(batch.receivedDate).format('YYYY-MM-DD') === currentDate && batch.batchStatus === 'recieved');
            const totalEggsForDay = batchesForDay.reduce((sum, batch) => sum + batch.totalEggs, 0);

            return (
                <div className="ant-picker-cell-inner">
                    <div>{current.date()}</div>
                    {totalEggsForDay > 0 && <Badge count={`${totalEggsForDay} eggs recieved`} overflowCount={Infinity} style={{ backgroundColor: '#52c41a' }} />}
                </div>
            );
        }

        if (info.type === 'month') {
            const batchesForMonth = batches.filter(batch => dayjs(batch.receivedDate).month() === currentMonth && batch.batchStatus === 'recieved');
            const totalEggsForMonth = batchesForMonth.reduce((sum, batch) => sum + batch.totalEggs, 0);

            return (
                <div className="ant-picker-cell-inner">
                    <div>{dayjs(current).format('MMM')}</div>
                    {totalEggsForMonth > 0 && <Badge count={`${totalEggsForMonth} eggs recieved`} overflowCount={Infinity} style={{ backgroundColor: '#52c41a' }} />}
                </div>
            );
        }

        return info.originNode;
    };

    return (<Calendar value={value} onSelect={onSelect} cellRender={cellRender} onPanelChange={onPanelChange} />)
}

export default Farmer_Production;