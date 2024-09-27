import React, { useState } from 'react';
import { Button, DatePicker, Select, Space } from 'antd';
import { generatePDF } from '../helpers/pdf.js';
import { DownloadOutlined } from '@ant-design/icons';
import { calculateProfits } from '../helpers/sales.js';

const DownloadRecords = ({ salesArray, recievedBatch, incubationArray, hatchArray }) => {
    const [selection, setSelection] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleDateChange = (value) => {
        
        if (value) {
            const formattedMonth = value.format('M-YYYY');
            setSelectedMonth(formattedMonth);
        } else {
            setSelectedMonth(null);
        }
    };

    const reportForSeptember = calculateProfits(recievedBatch, salesArray, selectedMonth);

    const options = [
        {
            label: 'Recieved Eggs Reports.',
            value: 'recievedBatch',
        },
        {
            label: 'Incubations Reports.',
            value: 'incubationArray',
        },
        {
            label: 'Hatch Reports.',
            value: 'hatchArray',
        },
        {
            label: 'Sales Reports.',
            value: 'salesArray',
        },
        {
            label: 'Profits Reports.',
            value: 'reportForSeptember',
            children: <DatePicker />
        },
    ];

    const handleChange = (value) => {
        setSelection(value);
    };

    const handleDownload = () => {
        const selectedData = {
            recievedBatch,
            incubationArray,
            hatchArray,
            salesArray,
            reportForSeptember,
        };

        const filteredData = selection.reduce((acc, key) => {
            if (selectedData[key]) {
                acc[key] = selectedData[key];
            }
            return acc;
        }, {});


        generatePDF(filteredData);
    };

    return (
        <>
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="Select reports to download."
                onChange={handleChange}
                options={options}
                optionRender={(option) => (
                    <Space>
                        {option.data.label}
                    </Space>
                )}
            />
            <DatePicker placeholder='Select reports month' style={{ width: '40%' }} onChange={handleDateChange} />
            <Button style={{ margin: '10px', width: '40%' }} type="primary" disabled={selection?.length < 1} icon={<DownloadOutlined />} onClick={handleDownload} >Download</Button>
        </>
    )
}

export default DownloadRecords;