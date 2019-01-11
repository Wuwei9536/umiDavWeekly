import React from "react";
import PropTypes from 'prop-types';
import { Form, Card, Spin, Button, Collapse, Row, Col, List, Tag } from 'antd';
import style from './index.less'

const panelStyle = {
    background: 'white',
    borderRadius: 4,
    marginTop: 12,
    border: 0,
    overflow: 'hidden',
};
const Panel = Collapse.Panel;

export default class OkrList extends React.Component {
    static defaultProps = {

    }

    static propTypes = {
        okrDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        onGetOkrDetail: PropTypes.func.isRequired,
        krWeeklys: PropTypes.arrayOf(PropTypes.any).isRequired
    }

    render() {
        const { okrDetails, onGetOkrDetail, krWeeklys } = this.props;
        return (
            <>
                {okrDetails.map((oItem, oIndex) => {
                    return (
                        <Card className={style.cardGround}
                            title={oIndex + 1 + '.' + oItem.odetail}
                            size="small"
                            key={oItem.oid}
                            headStyle={{ paddingTop: 0, paddingBottom: 0 }}
                            bodyStyle={{ paddingTop: 10, paddingBottom: 10 }}
                        // headStyle={{background:#e8e8e8}}
                        >
                            {oItem.krs.map((kItem, kIndex) => {
                                return (
                                    <Card
                                        key={kItem.krId}
                                        className={style.inCard}
                                        title={kIndex + 1 + '.' + kItem.krDetail}
                                        bordered={false}
                                        headStyle={{ marginLeft:200 }}
                                        bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
                                        <Collapse bordered={false}  className={style.collapse} onChange={(e) => { onGetOkrDetail(e, kItem); }}>
                                            <Panel header={kItem.weeklyCount+"条周报"} key={kItem.krId} style={panelStyle}>
                                                {krWeeklys.map((krItem, index) => {
                                                    return (
                                                        <Row key={krItem.weeklyId} style={{marginTop:15}}>
                                                            <Col span={4}>
                                                                <div>{krItem.week}</div>
                                                            </Col>
                                                            <Col span={20}>
                                                                <List
                                                                    itemLayout="horizontal"
                                                                    dataSource={krItem.weeklys}
                                                                    renderItem={weeklyitem => (
                                                                        <>
                                                                            {weeklyitem.weeklyType === 1 ?
                                                                                (<List.Item key={weeklyitem.weeklyId}>
                                                                                    <List.Item.Meta
                                                                                        avatar={<Tag color="#87d068">进展</Tag>}
                                                                                        description={weeklyitem.details}
                                                                                    />
                                                                                </List.Item>) : null}
                                                                                {weeklyitem.weeklyType === 2 ?
                                                                                (<List.Item key={weeklyitem.weeklyId}>
                                                                                    <List.Item.Meta
                                                                                        avatar={<Tag color='rgb(16, 142, 233)'>计划</Tag>}
                                                                                        description={weeklyitem.details}
                                                                                    />
                                                                                </List.Item>) : null}
                                                                                {weeklyitem.weeklyType === 3 ?
                                                                                (<List.Item key={weeklyitem.weeklyId}>
                                                                                    <List.Item.Meta
                                                                                        avatar={<Tag color='rgb(255, 85, 0)'>问题</Tag>}
                                                                                        description={weeklyitem.details}
                                                                                    />
                                                                                </List.Item>) : null}
                                                                        </>
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>)
                                                })}
                                            </Panel>
                                        </Collapse>
                                    </Card>
                                )
                            })}
                        </Card>
                    )
                })};
            </>
        )
    }
}
