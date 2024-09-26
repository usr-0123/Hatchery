import { useEffect, useState } from 'react';
import { useFetchIncubationQuery } from '../features/apis/incubationApis';
import { Typography } from 'antd';
const { Text, Link } = Typography;

import './NotifyHatch.css';

const NotifyHatch = () => {
    const [message, setMessage] = useState('');
    const [incubationRecords, setIncubationRecords] = useState([]);
    const [hatchRecords, setHatchRecords] = useState([]);

    const { data: incubationArray, refetch: refetchIncubationRecords } = useFetchIncubationQuery();

    const checkIncubationState = () => {
        const today = new Date();

        const recordsThatReachedHatch = incubationRecords?.filter(record => {
            if (record.incubationState === 'Ongoing') {
                const startDate = new Date(record.startDate);
                const dayDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                return dayDifference >= 21;
            }
            return false;
        });

        if (recordsThatReachedHatch.length > 0) {
            setMessage(`${recordsThatReachedHatch?.length} incubation (s) have reached hatching!`);
            setHatchRecords(recordsThatReachedHatch);
        } else {
            setMessage();
            setHatchRecords([]);
        }

        return recordsThatReachedHatch;
    };

    useEffect(() => {
        if (incubationArray?.data) {
            setIncubationRecords(incubationArray?.data);
        }
    }, [incubationArray, refetchIncubationRecords]);

    useEffect(() => {
        checkIncubationState();
    }, [incubationRecords]);

    return (
        <>
            <Text type='danger' className='blinking' style={{fontSize: '16px', fontWeight: 700}} >{message}</Text>
        </>
    );
};

export default NotifyHatch;
