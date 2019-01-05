import React from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import { Tag, Row, Form, Card, Button, Spin, Modal } from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import style from './index.less';
import WriteView from '../../components/weekly-write-view/index';

const confirm = Modal.confirm;

const placeholder = { // 占位符
    titleProgress: "进展，限制40字",
    titlePlan: "计划，限制40字",
    titleProblem: "问题，限制40字，选填",
    okr: "请选择关联的okr",
    content: "请输入内容"
};

class Edit extends React.Component {
    static defaultProps = {
        weeklyVoEdit: {}, // 用户信息，时间
        weekResults: [{}],
        nextWeekPlans: [{}],
        weekQas: [{}],
        okrs: [{}],
        editShow: false
    }

    static propTypes = {
        weekResults: PropTypes.arrayOf(PropTypes.shape({})), // 进展数据
        nextWeekPlans: PropTypes.arrayOf(PropTypes.shape({})), // 计划
        weekQas: PropTypes.arrayOf(PropTypes.shape({})), // 问题
        okrs: PropTypes.arrayOf(PropTypes.shape({})), // OKR
        weeklyVoEdit: PropTypes.shape({}),
        editShow: PropTypes.bool
    }

    componentDidMount() {
        // eslint-disable-next-line
        const { state } = this.props.location
        const { dispatch } = this.props;
        if (state) { // state 传参 放入sessionStorage
            window.sessionStorage.setItem('editParam', JSON.stringify(state));
        }
        this.editParam = JSON.parse(window.sessionStorage.getItem('editParam')); // 取用sessionStorage参数
        this.edtiMonth = this.editParam.month;
        this.editWeek = this.editParam.week + 1;
        this.editWeekTime = this.editParam.weekTime;
        if (this.editParam.from) { // from值 用于判断是从详情页跳转至此，还是新建跳转。 1，新建跳转 2，详情编辑跳转
            dispatch({
                type: 'edit/fetchLastDetails',
                payload: this.editParam
            });
            dispatch({
                type: 'edit/fetchOkrs',
            });
        } else {
            dispatch({
                type: 'edit/fetchDetail',
                payload: this.editParam
            });
            dispatch({
                type: 'edit/fetchOkrs',
            });
        }
    }

    componentWillUnmount() { // 离开清数据
        const { dispatch } = this.props;
        dispatch({
            type: 'edit/saveWeekResults',
            payload: [{}]
        });
        dispatch({
            type: 'edit/saveNextWeekPlans',
            payload: [{}]
        });
        dispatch({
            type: 'edit/saveWeekQas',
            payload: [{}]
        });
        dispatch({
            type: 'edit/saveWeeklyVo',
            payload: {}
        });
        dispatch({
            type: 'edit/changeEditShow',
            payload: false
        })
    }


    添加按钮
    addItem = (id) => {
        this.form.validateFields((errors, value) => { // 校验表单
            if (!errors) {
                const { weekResults, nextWeekPlans, weekQas, dispatch } = this.props;
                let addData = [];
                switch (id) {
                    case 1:
                        addData = weekResults.concat([{}]);
                        dispatch({
                            type: 'edit/saveWeekResults',
                            payload: addData
                        })
                        break;
                    case 2:
                        addData = nextWeekPlans.concat([{}]);
                        dispatch({
                            type: 'edit/saveNextWeekPlans',
                            payload: addData
                        })
                        break;
                    case 3:
                        addData = weekQas.concat([{}]);
                        dispatch({
                            type: 'edit/saveWeekQas',
                            payload: addData
                        })
                        break;
                    default:
                        break;
                }
            }
        });
    }


    // 当表单数据改变，输入时就会触发
    onChangeField = (weeklyType, index, changedFields, allValues) => {
        const { weekResults, nextWeekPlans, weekQas } = this.props;
        switch (weeklyType) {
            case 1:
                Object.assign(weekResults[index], {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                });
                // dataProgress[index] = {
                //     summary: allValues.summary.value,
                //     krId: allValues.krId.value,
                //     details: allValues.details.value,
                //     weeklyType
                // };
                break;
            case 2:
                Object.assign(nextWeekPlans[index], {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                });
                break;
            case 3:
                Object.assign(weekQas[index], {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                });
                break;
            default:
                break;
        }
    }

    // 保存
    save = (e, from) => {
        this.form.validateFields((errors, value) => {
            if (!errors) {
                const { weekResults, nextWeekPlans, weekQas, dispatch, history } = this.props;
                // eslint-disable-next-line
                const { year, qtype, month, week, weekTime } = this.editParam;
                let WeeklyVo;
                let type;
                let path;
                if (from) {
                    WeeklyVo = {
                        newWeeklyVo: {
                            year,
                            qtype,
                            month: 11,
                            week: 1,
                            weekTime: "11月5日-11月11日",
                            weekResults: weekResults,
                            nextWeekPlans: nextWeekPlans,
                            weekQas: weekQas
                        }
                    };
                    type = 'edit/addWeekly';
                    path = '/';
                } else {
                    WeeklyVo = {
                        commitWeeklyVo: {
                            weeklyId: this.editParam.weeklyId,
                            weekResults: weekResults,
                            nextWeekPlans: nextWeekPlans,
                            weekQas: weekQas
                        }
                    };
                    type = 'edit/editWeekly';
                    path = '/info';
                }
                dispatch({
                    type,
                    payload: WeeklyVo
                })
                history.push(path);
            }
        });
    }

    // 取消
    showConfirm = () => {
        const { history } = this.props;
        confirm({
            title: '点击取消将不会保存已编辑的内容?',
            content: '你确定要取消吗？',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                history.push('/');
            },
            onCancel() { }
        });
    }


    // X图标点击删除
    delete = (e, index, weeklyType, summary) => {
        const { weekResults, nextWeekPlans, weekQas, dispatch } = this.props;
        let restData = [];
        let spliceData = this.spliceData;
        if (summary) {
            confirm({
                title: '删除条目将同时删除已输入的内容',
                content: '你确定要删除吗？',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                    spliceData(weeklyType, weekResults, nextWeekPlans, weekQas, restData, index, dispatch);
                },
                onCancel() { }
            });
        } else {
            spliceData(weeklyType, weekResults, nextWeekPlans, weekQas, restData, index, dispatch);
        }
    }

    // 删除数据
    spliceData = (weeklyType, weekResults, nextWeekPlans, weekQas, restData, index, dispatch) => {
        switch (weeklyType) {
            case 1:
                weekResults.splice(index, 1);
                restData = [...weekResults];
                dispatch({
                    type: 'edit/saveWeekResults',
                    payload: restData
                })
                break;
            case 2:
                nextWeekPlans.splice(index, 1);
                restData = [...nextWeekPlans];
                dispatch({
                    type: 'edit/saveNextWeekPlans',
                    payload: restData
                })
                break;
            case 3:
                weekQas.splice(index, 1);
                restData = [...weekQas];
                dispatch({
                    type: 'edit/saveWeekQas',
                    payload: restData
                })
                break;
            default:
                break;
        }
    }

    // 拿 子组件校验方法
    takeValidateFields = (ref) => {
        this.form = ref.props.form;
    }

    render() {
        const { weekResults, nextWeekPlans, weekQas, okrs, weeklyVoEdit, editShow } = this.props;
        if (weeklyVoEdit.month) {
            this.edtiMonth = weeklyVoEdit.month;
            this.editWeek = weeklyVoEdit.week;
            this.editWeekTime = weeklyVoEdit.weekTime;
        }
        return (
            <>
                {editShow
                    ? (
                        <>
                            <div className={style.marginBottom100}>
                                <Card>
                                    {weeklyVoEdit
                                        ? <>
                                            <span className={style.weekTime}>
                                                {"Week " + this.edtiMonth + "-" + this.editWeek}
                                            </span>
                                            <span>{this.editWeekTime}</span>
                                        </>
                                        : null}
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTag}>本周进展</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={weekResults}
                                                        okrs={okrs}
                                                        title={placeholder.titleProgress}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={1}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                    <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(1, e); }}>添加进展</Button>
                                                </Form>
                                            </div>
                                        </Row>
                                    </Card>
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTagPlan}>下周计划</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={nextWeekPlans}
                                                        okrs={okrs}
                                                        title={placeholder.titlePlan}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={2}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                </Form>
                                                <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(2, e); }}>添加计划</Button>
                                            </div>
                                        </Row>
                                    </Card>
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTagProblem}>遗留问题</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={weekQas}
                                                        okrs={okrs}
                                                        title={placeholder.titleProblem}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={3}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                </Form>
                                                <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(3, e); }}>添加问题</Button>
                                            </div>
                                        </Row>
                                    </Card>
                                </Card>
                            </div>
                            <FooterToolbar>
                                <Button type="primary" onClick={(e) => { this.save(e, this.editParam.from); }}>保存</Button>
                                <Button onClick={this.showConfirm}>取消</Button>
                            </FooterToolbar>
                        </>
                    ) : <Spin tip="Loading" className={style.loading} />}
            </>
        );
    }
}


const mapStateToProps = ({ edit }) => ({
    weekResults: edit.weekResults,
    nextWeekPlans: edit.nextWeekPlans,
    weekQas: edit.weekQas,
    okrs: edit.okrs,
    weeklyVoEdit: edit.weeklyVo,
    editShow: edit.editShow
});

export default connect(mapStateToProps)(Edit);
