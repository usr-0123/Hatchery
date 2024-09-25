import React, { useState } from 'react'
import { Card, Col, Modal, Row, Statistic } from 'antd';

const Admin_Eggs = ({ batch, recieved, incubation }) => {
    const [totalEggs, setTotalEggs] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} >
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total number of Eggs."
                            value={batch?.length}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Eggs recieved."
                            value={recieved?.length}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Eggs Incubated."
                            value={incubation?.length}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col style={{ margin: '20px 0 0 0' }} >
                    <Card hoverable onClick={() => setIsModalOpen(true)}>
                        <Statistic
                            title="Total Eggs unhatched."
                            value={totalEggs}
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

export default Admin_Eggs;