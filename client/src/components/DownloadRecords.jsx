import React, { useState } from 'react';
import { Button, Select, Space } from 'antd';
import { generatePDF } from '../helpers/pdf.js';
import { DownloadOutlined } from '@ant-design/icons';

const DownloadRecords = ({ salesArray, recievedBatch, incubationArray, hatchArray }) => {
    const [selection, setSelection] = useState([]);

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
    ];

    const handleChange = (value) => {
        setSelection(value);
    };

    const handleDownload = () => {
        // Map selected values to their corresponding arrays
        const selectedData = {
            recievedBatch,
            incubationArray,
            hatchArray,
            salesArray,
        };

        // Filter the selected arrays based on the current selection
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
            <Button style={{ margin: '10px' }} type="primary" disabled={selection?.length < 1} icon={<DownloadOutlined />} onClick={handleDownload} >Download</Button>
        </>
    )
}

export default DownloadRecords;