import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Button } from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import style from './index.less';
import SelectView from '../../components/select-view';
import InitTimeShow, { Monday } from '../../utils/weekTime';
import OkrList from '../../components/okrList';
import EditOkrList from '../../components/okr-edit/index'


const monday = Monday(moment(), moment().day()); //当前周一日期
const mondayYear = monday.year();  // 当前周一所属年份
const mondayMonth = monday.month() + 1; // 当前周一月份
const mondayDate = monday.date(); // 当前周一日份
const mondayQuarter = monday.quarter() // 当前周一季度

class OkrEdit extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        // this.yearChoose = mondayYear;
        // this.monthChoose = mondayMonth;
        // this.dateChoose = mondayDate;
        // this.quarterChoose = mondayQuarter;
        this.quarterDisabled = mondayQuarter;
        this.grandChildData = [];
    }

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { search } = location;
        this.param = JSON.parse(decodeURI(search.slice(1)));
        // dispatch({
        //     type: 'okr/getOkrDetail',
        //     payload: { year: 2018, qtype: 4, krId: null, userId: null }
        // })
    }

    onGetOkrDetail = (e, kr) => {
        const { dispatch } = this.props
        // dispatch({
        //     type: 'okr/getKrWeeklys',
        //     payload: { krId: kr.krId }
        // })
    }

    saveOkr = (e,param) => {
        console.log('%cparam: ', 'font-size:15px;background-color: rgb(135, 208, 104);', param);
        const { dispatch } = this.props;
        let childData = Object.values(this.child.props.form.getFieldsValue()); //子组件数据
        childData.unshift('其他默认添加');
        const lastGrandChildData = Object.values(this.grandChild.props.form.getFieldsValue())
        this.grandChildData.push(lastGrandChildData) //孙组件数据
        this.grandChildData.map((item) => { return item.unshift('其他默认添加') });
        this.grandChildData.unshift(['其他默认添加'])
        let newOkrVo = {
            year: param.year,
            qtype: param.qtype,
            okrDetails: childData.map((item, index) => {
                return {
                    odetail: item,
                    otype: index,
                    krs: this.grandChildData[index].map((item, index) => {
                        return {
                            krDetail: item,
                            krType: index
                        }
                    })
                }
            })
        }
        dispatch({
            type: 'okrEdit/addOkr',
            payload: {newOkrVo:newOkrVo}
        })
    }

    takeChild = (child, grandChild) => {
        this.child = child;
        this.grandChild = grandChild;
    }

    takeGrandChildData = (grandChildData) => {
        this.grandChildData.push(grandChildData);
    }

    render() {
        const { okrInfo, okrShow, krWeeklys } = this.props;
        return (
            <>
                <Card style={{ marginBottom: 150 }}>
                    <Form layout="inline">
                        <SelectView
                            data={[(mondayYear - 1).toString(), mondayYear.toString(), (mondayYear + 1).toString(), (mondayYear + 2).toString()]}
                            defaultValue={mondayYear.toString()}
                        // onChange={this.selectYear}
                        />
                        <SelectView
                            onChange={this.quarter}
                            data={["Q1", "Q2", "Q3", "Q4"]}
                            defaultValue={"Q" + mondayQuarter}
                            quarter={this.quarterDisabled}
                            // quarter={this.quarterDisabled}
                        />
                    </Form>
                    <EditOkrList takeChild={this.takeChild} takeGrandChildData={this.takeGrandChildData} />
                </Card >
                <FooterToolbar>
                    <Button type="primary" onClick={(e) => { this.saveOkr(e, this.param); }}>保存</Button>
                    <Button onClick={this.showConfirm}>取消</Button>
                </FooterToolbar>
            </>
        )
    }
}

export default connect(({ okr }) => ({

}))(OkrEdit)