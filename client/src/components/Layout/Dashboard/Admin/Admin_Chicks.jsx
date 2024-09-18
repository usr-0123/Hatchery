import React, { useEffect, useState } from 'react'
import { Card, Col, Modal, Row, Statistic } from 'antd';

const Admin_Chicks = ({ batch, recieved, hatched, incubation }) => {
    const [totalChicks, setTotalChicks] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (hatched.length > 0) {
            setTotalChicks(hatched.length)
        } else {
            setTotalChicks(0);
        };

    }, [hatched]);

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} >
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total number of Chicks."
                            value={hatched?.length}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Chicks recieved."
                            value={totalChicks}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Chicks Incubated."
                            value={totalChicks}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Chicks unhatched."
                            value={totalChicks}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
            </div>
            <Modal
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                onClose={() => setIsModalOpen(false)}
                width={700}

            >
                Modal Component
            </Modal>
        </>
    )
}

export default Admin_Chicks;