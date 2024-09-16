import React from 'react'
import { getTotalEggsAllTime, getTotalEggsForCurrentMonth } from '../../../../helpers/eggsCount.js';
import { Card, Col, Row, Statistic } from 'antd';

const Farmer_General = ({ productPrices, batches }) => {

    const eggs = getTotalEggsForCurrentMonth(batches);

    const totalEggsRecords = getTotalEggsAllTime(batches);

    const eggPriceObj = productPrices?.find(object => object.product_name === "Eggs");

    const monthpay = eggs && eggPriceObj ? eggs * eggPriceObj.price : 0;

    return (
        <>
            <h1>General info</h1>
            <Row gutter={16} >
                <Col span={8} style={{ margin: '20px 0 0 0' }}>
                    <Card>
                        <Statistic
                            title="Total Eggs Delivered at all time."
                            value={totalEggsRecords}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={8} style={{ margin: '20px 0 0 0' }}>
                    <Card>
                        <Statistic
                            title="Total Eggs Delivered in the current month"
                            value={eggs}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={8} style={{ margin: '20px 0 0 0' }}>
                    <Card>
                        <Statistic
                            title="Current Eggs Buying Price"
                            value={eggPriceObj.price}
                            precision={2}
                            prefix="Ksh"
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col span={8} style={{ margin: '20px 0 0 0' }}>
                    <Card>
                        <Statistic
                            title="Total Price for the delivered eggs in the current month."
                            value={monthpay}
                            precision={2}
                            prefix="Ksh"
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Farmer_General;