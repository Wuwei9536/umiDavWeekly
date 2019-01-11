import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "dva";
import { Form, Card, Spin, Input, Button, Table } from 'antd';
import SelectItemForm from '../../components/select'
import style from './index.less';
import moment from 'moment';

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


const columns = (onfocus) => [{
    key: 'userName',
    title: '姓名',
    dataIndex: 'userName',
    align: 'center',
}, {
    key: 'ldapName',
    title: '账号',
    dataIndex: 'ldapName',
    align: 'center',
}, {
    key: 'deptName',
    title: '所属部门',
    dataIndex: 'deptName',
    align: 'center',
},
{
    key: 'operation',
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    render: (text, record) => {
        let textArray = slash(text);
        return (
            textArray.map((item, index) => {
                return <Button onClick={(e) => onfocus(e, record, index)} key={index} className={style.operation} ghost>{item}</Button>
            })
        )
    }
    //<a href="javascript:;">{text}</a>,
}];

class StaffList extends React.Component {
    constructor() {
        super();
        this.attentionType = -1;
        this.page = 1;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'staff/getUser',
        });
        dispatch({
            type: 'staff/selectDeptOption',
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'staff/changeStaffShow',
            payload: false
        })
    }

    depChange = (changedFields) => {
        const { getFieldValue } = this.props.form;
        let name = getFieldValue('name');
        const { dispatch } = this.props;
        dispatch({
            type: 'staff/selectUser',
            payload: { deptId: changedFields.select.value, name, attentionType: this.attentionType, pageIndex: this.page, pageSize: 10 }
        })
    }

    attentionChange = (changedFields) => {
        const { getFieldValue } = this.props.form;
        let name = getFieldValue('name');
        const { dispatch, defaultDeptId } = this.props;
        this.attentionType = changedFields.select.value
        dispatch({
            type: 'staff/selectUser',
            payload: { deptId: defaultDeptId, name, attentionType: this.attentionType, pageIndex: this.page, pageSize: 10 }
        })
    }

    search = () => {
        const { dispatch, defaultDeptId } = this.props;
        const { getFieldValue } = this.props.form;
        let name = getFieldValue('name');
        dispatch({
            type: 'staff/selectUser',
            payload: { deptId: defaultDeptId, name, attentionType: this.attentionType, pageIndex: this.page, pageSize: 10 }
        })
    }

    paginationChange = (page, pageSize) => {
        const { dispatch, defaultDeptId } = this.props;
        const { getFieldValue } = this.props.form;
        let name = getFieldValue('name');
        this.page = page;
        dispatch({
            type: 'staff/selectUser',
            payload: { deptId: defaultDeptId, name, attentionType: this.attentionType, pageIndex: page, pageSize: 10 }
        })
    }

    onfocus = (e, record, index) => {
        const { dispatch, defaultDeptId, history } = this.props;
        if (index === 2) {
            let paramFocus = { attentionUserId: record.userId }
            let paramSelect = { deptId: defaultDeptId, name: record.searchName, attentionType: this.attentionType, pageIndex: this.page, pageSize: 10 }
            if (record.focusType === 0) {
                dispatch({
                    type: 'staff/focusOnUser',
                    payload: { paramFocus, paramSelect }
                });
            } else {
                dispatch({
                    type: 'staff/removeFocus',
                    payload: { paramFocus, paramSelect }
                });
            }
        } else if (index === 1) {
            window.open('http://localhost:8000/okr')
        } else {
            // let path = {
            //     pathname: '/',
            //     search: JSON.stringify({ year: moment().year(), qtype: moment().quarter(), userId: record.userId })
            // };
            // history.push(path)
            let search = JSON.stringify({ year: moment().year(), qtype: moment().quarter(), userId: record.userId })
            window.open('http://localhost:8000/?'+encodeURI(search))
        }
    }

    showTotal(total) {
        return `总共 ${total} 条数据`;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { department, isloading, tableData, user, staffShow, totoalCount } = this.props;
        return (
            <>
                {staffShow
                    ? (<Card>
                        <Form layout='inline' className={style.formBottom}>
                            <SelectItemForm data={department} defaultValue={user.deptId} onChange={this.depChange}></SelectItemForm>
                            <SelectItemForm
                                data={[{ deptName: '关注状态', deptId: -1 }, { deptName: '已关注', deptId: 1 }, { deptName: '未关注', deptId: 0 }]} defaultValue={-1}
                                onChange={this.attentionChange}
                            ></SelectItemForm>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Username is required!' }],
                                })(<Input placeholder='输入人员姓名搜索' />)}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="search" onClick={this.search}>查询</Button>
                            </Form.Item>
                        </Form>
                        <Table
                            columns={columns(this.onfocus)}
                            dataSource={tableData}
                            bordered
                            size='middle'
                            pagination={{ size: "small", total: totoalCount, showTotal: this.showTotal, onChange: this.paginationChange }}
                        />
                    </Card>) : <Spin />
                }
            </>
        )
    }
}
const StaffListForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.dispatch({
            type: 'staff/saveName',
            payload: changedFields.name.value
        });
    }
})(StaffList)
export default connect(({ staff, loading }) => ({
    department: staff.department,
    tableData: staff.tableData,
    isloading: loading.effects['staff/selectDeptOption'],
    user: staff.userDetails,
    staffShow: staff.staffShow,
    defaultDeptId: staff.defaultDeptId,
    totoalCount: staff.totoalCount
}))(StaffListForm);