import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "dva";
import { Form, Card, Spin, DatePicker, Button, Table, Input } from 'antd';
import SelectItemForm from '../../components/select'
import style from './index.less';

const InputGroup = Input.Group;

const slash = (txt) => {
    let txtChildren = [];
    let part;
    let rest;
    let restPart;
    const reg = /\//g;
    const res = reg.exec(txt);
    if (res !== null) {
        part = txt.slice(0, res.index);
        txtChildren.push(part)
        rest = txt.slice(res.index + 1);
        restPart = slash(rest);
        return txtChildren.concat(restPart);
    }
    else {
        return [txt];
    }
}


const columns = [{
    key: 'userName',
    title: '姓名',
    dataIndex: 'userName',
    align: 'center',
}, {
    key: 'deptName',
    title: '所属部门',
    dataIndex: 'deptName',
    align: 'center',
},
{
    key: 'weeklyDetail',
    title: '周报详情',
    dataIndex: 'weeklyDetail',
    align: 'center',
},
{
    key: 'operation',
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    render: (text, record, index) => {
        let textArray = slash(text);
        return (
            textArray.map((item, index) => {
                return <Button key={index} className={style.operation} ghost>{item}</Button>
            })
        )
    }
    //<a href="javascript:;">{text}</a>,
}];

class StaffList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'attention/getUser',
        });
        dispatch({
            type: 'attention/selectDeptOption',
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'attention/changeaAttentionShow',
            payload: false
        })
    }

    depChange = (changedFields) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'attention/selectWeekly',
            payload: { year: 2019, month: 1, week: 1, qtype: 1, deptId: changedFields.select.value, weekType: -1, pageIndex: 1, pageSize: 10 }

        })
    }

    writeStateChange = (changedFields) => {
        const { dispatch, defaultDeptId } = this.props;
        dispatch({
            type: 'attention/selectWeekly',
            payload: { year: 2019, month: 1, week: 1, qtype: 1, deptId: defaultDeptId, weekType: changedFields.select.value, pageIndex: 1, pageSize: 10 }
        })
    }

    // paginationChange = (page, pageSize) => {
    //     const { dispatch, defaultDeptId } = this.props;
    //     const { getFieldValue } = this.props.form;
    //     let name = getFieldValue('name');
    //     dispatch({
    //         type: 'staff/selectUser',
    //         payload: { deptId: defaultDeptId, name, attentionType: this.attentionType, pageIndex: page, pageSize: 10 }
    //     })
    // }

    showTotal(total) {
        return `总共 ${total} 条数据`;
    }

    render() {
        const { department, isloading, attentionData, user, attentionShow, totalCount } = this.props;
        console.log('%cattentionData: ', 'font-size:15px;background-color: rgb(135, 208, 104);', this.props);
        return (
            <>
                {attentionShow
                    ? (<Card>
                        <Form layout='inline' className={style.formBottom}>
                            <Form.Item>
                                <InputGroup compact>
                                    <Input style={{ width: '50%' }} defaultValue="input content" />
                                    <DatePicker />
                                </InputGroup>
                            </Form.Item>
                            <SelectItemForm data={department} defaultValue={-1} onChange={this.depChange}></SelectItemForm>
                            <SelectItemForm
                                data={[{ deptName: '全部状态', deptId: -1 }, { deptName: '已填写', deptId: 1 }, { deptName: '未填写', deptId: 0 }]} defaultValue={-1}
                                onChange={this.writeStateChange}
                            ></SelectItemForm>
                        </Form>
                        <Table
                            columns={columns}
                            dataSource={attentionData}
                            bordered
                            size='middle'
                            pagination={{ size: "small", total: totalCount, showTotal: this.showTotal, onChange: this.paginationChange }}
                        />
                    </Card>) : <Spin />
                }
            </>
        )
    }
}
const StaffListForm = Form.create({
})(StaffList)
export default connect(({ attention, loading }) => ({
    attentionData: attention.attentionData,
    totalCount: attention.totalCount,
    attentionShow: attention.attentionShow,
    user: attention.userDetails,
    department: attention.department,
    defaultDeptId: attention.defaultDeptId,
}))(StaffListForm);