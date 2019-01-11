import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Spin, Button, Collapse, Row, Col, List, Tag } from 'antd';
import style from './index.less';
import SelectView from '../../components/select-view';
import InitTimeShow, { Monday } from '../../utils/weekTime';
import OkrList from '../../components/okrList'

const monday = Monday(moment(), moment().day()); //当前周一日期
const mondayYear = monday.year();  // 当前周一所属年份
const mondayMonth = monday.month() + 1; // 当前周一月份
const mondayDate = monday.date(); // 当前周一日份
const mondayQuarter = monday.quarter() // 当前周一季度

class Okr extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        this.yearChoose = mondayYear;
        this.monthChoose = mondayMonth;
        this.dateChoose = mondayDate;
        this.quarterChoose = mondayQuarter;
        this.quarterDisabled = mondayQuarter;
        // this.userId=''
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'okr/getOkrDetail',
            payload: { year: this.yearChoose, qtype: this.quarterChoose, krId: null, userId: null }
        })
    }

    onGetOkrDetail = (e, kr) => {
        const { dispatch } = this.props
        dispatch({
            type: 'okr/getKrWeeklys',
            payload: { krId: kr.krId }
        });
    }

    okrSelectYear = (e) => {
        const { dispatch } = this.props;
        this.yearChoose = Number(e);
        dispatch({
            type: 'okr/changeOkrShow',
            payload: false
        })
        dispatch({
            type: 'okr/getOkrDetail',
            payload: { year: this.yearChoose, qtype: this.quarterChoose, krId: null, userId: null }
        })
        if (e < mondayYear) {
            this.quarterDisabled = 4;
        }
    }

    okrQuarter = (e) => {
        let value = e.slice(1);
        const { dispatch } = this.props;
        this.quarterChoose = Number(value);
        dispatch({
            type: 'okr/changeOkrShow',
            payload: false
        })
        dispatch({
            type: 'okr/getOkrDetail',
            payload: { year: this.yearChoose, qtype: this.quarterChoose, krId: null, userId: null }
        })
    }

    // 新建按钮点击
    newButtonClick = () => {
        const { history } = this.props
        let data = {
            year: this.yearChoose,
            qtype: this.quarterChoose,
        };
        let path = {
            pathname: '/okrEdit',
            search: JSON.stringify(data)
        };
        history.push(path);
    }

    render() {
        const { okrInfo, okrShow, krWeeklys } = this.props;
        return (
            <>

                <Card>
                    <Form layout="inline" style={{ marginBottom: 35 }}>
                        <SelectView
                            data={[(mondayYear - 1).toString(), mondayYear.toString(), (mondayYear + 1).toString(), (mondayYear + 2).toString()]}
                            defaultValue={mondayYear.toString()}
                            onChange={this.okrSelectYear}
                        />
                        <SelectView
                            onChange={this.okrQuarter}
                            data={["Q1", "Q2", "Q3", "Q4"]}
                            defaultValue={"Q" + mondayQuarter}
                            quarter={this.quarterDisabled}
                        />
                    </Form>
                    {okrShow ? (
                        <>
                            {(!okrInfo.okrDetails) ? (
                                <Card bordered={false} className={style.textCenter}>
                                    <p>你还未设定本Q的OKR，是否新建?</p>
                                    <Button type="primary" onClick={this.newButtonClick}>新建OKR</Button>
                                </Card>
                            ) : null}
                            <OkrList
                                okrDetails={okrInfo.okrDetails || []}
                                onGetOkrDetail={this.onGetOkrDetail}
                                krWeeklys={krWeeklys}
                            ></OkrList>
                        </>
                    ) : <Spin></Spin>}
                </Card>
            </>
        )
    }
}

export default connect(({ okr }) => ({
    okrInfo: okr.okrInfo,
    okrShow: okr.okrShow,
    krWeeklys: okr.krWeeklys
}))(Okr)