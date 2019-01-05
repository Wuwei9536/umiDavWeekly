import React from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import { Tag, Row, Card, Spin, Button } from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import style from './index.less';
import InfoView from '../../components/info-view';
import WeeklyComments from '../../components/comments/index';

Quill.register('modules/imageDrop', ImageDrop);

class Info extends React.Component {
    static defaultProps = {
        infoWeekResults: [{}],
        infoNextWeekPlans: [{}],
        infoWeekQas: [{}],
        comments: [{}],
        infoWeeklyVo: {}
    }

    static propTypes = {
        infoWeekResults: PropTypes.arrayOf(PropTypes.shape({})), // 进展数据
        infoNextWeekPlans: PropTypes.arrayOf(PropTypes.shape({})), // 下周计划
        infoWeekQas: PropTypes.arrayOf(PropTypes.shape({})), // 问题
        comments: PropTypes.arrayOf(PropTypes.shape({})), // 评论
        infoWeeklyVo: PropTypes.shape({}) // 用户，时间等信息
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // eslint-disable-next-line
        const { state } = this.props.location //通过state传参，放入sessionStorage
        if (state) { // 再次进入该页，判断有无传参，如若有，修改loaclstorage
            window.sessionStorage.setItem('infoParam', JSON.stringify(state));
        }
        this.infoParam = window.sessionStorage.getItem('infoParam'); // 取用参数
        dispatch({
            type: 'info/fetchDetail',
            payload: this.infoParam
        });
        dispatch({
            type: 'info/fetchComment',
            payload: this.infoParam
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'info/changeInfoShow',
            payload: false
        })
    }

    // 跳转编辑
    toEditor = () => {
        const { history } = this.props;
        let path = {
            pathname: '/edit',
            state: JSON.parse(this.infoParam)
        };
        history.push(path);
    }

    quillChange = (value) => {
        this.commentParam = {
            content: value,
            weeklyId: JSON.parse(this.infoParam).weeklyId
        }
    }

    // 发表评论
    commentPublish = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'info/addComment',
            payload: this.commentParam
        })
    }

    // 返回我的周报
    backWeekly = () => {
        const { history } = this.props;
        history.push('/');
    }


    render() {
        const { infoWeekResults, infoNextWeekPlans, infoWeekQas, comments, infoWeeklyVo, infoShow } = this.props;
        let noEditTime = new Date(infoWeeklyVo.noEditTime).toLocaleString();
        // eslint-disable-next-line
        return (
            <>
                {infoShow
                    ? <>
                        <div className={style.marginBottom100}>
                            <Card>
                                <span className={style.weekTime}>
                                    {"Week " + infoWeeklyVo.month + "-" + infoWeeklyVo.week}
                                </span>
                                <span>{infoWeeklyVo.weekTime}</span>
                                <div>{"创建于 " + noEditTime}</div>
                                <Card className={style.cardBackground}>
                                    <Row type="flex" justify="space-around">
                                        <div className={style.paddingBottom10}>
                                            <Tag className={style.leftTag}>本周进展</Tag>
                                        </div>
                                        <div className={style.widthFlex}>
                                            <InfoView
                                                data={infoWeekResults}
                                            />
                                        </div>
                                    </Row>
                                </Card>
                                <Card className={style.cardBackground}>
                                    <Row type="flex" justify="space-around">
                                        <div className={style.paddingBottom10}>
                                            <Tag className={style.leftTagPlan}>下周计划</Tag>
                                        </div>
                                        <div className={style.widthFlex}>
                                            <InfoView
                                                data={infoNextWeekPlans}
                                            />
                                        </div>
                                    </Row>
                                </Card>
                                {infoWeekQas.length === 0 ? null
                                    : (
                                        <Card className={style.cardBackground}>
                                            <Row type="flex" justify="space-around">
                                                <div className={style.paddingBottom10}>
                                                    <Tag className={style.leftTagProblem}>遗留问题</Tag>
                                                </div>
                                                <div className={style.widthFlex}>
                                                    <InfoView
                                                        data={infoWeekQas}
                                                    />
                                                </div>
                                            </Row>
                                        </Card>)}
                                <div className={style.comment}>
                                    <ReactQuill
                                        theme="snow"
                                        className={style.commentText}
                                        onChange={this.quillChange}
                                    />
                                </div>
                                <div className={style.commentCommit}>
                                    <Button type="primary" onClick={this.commentPublish}>发表评论</Button>
                                </div>
                                <div className={style.commentResult}>
                                    <Card>
                                        <WeeklyComments
                                            data={comments}
                                            onChangeComment={this.onChangeComment}
                                        />
                                    </Card>
                                </div>
                            </Card>
                        </div>
                        <FooterToolbar>
                            <Button type="primary" onClick={this.backWeekly}>返回我的周报</Button>
                            <Button onClick={this.toEditor}>编辑</Button>
                        </FooterToolbar>
                    </> : <Spin tip='Loading' className={style.loading} />}
            </>
        );
    }
}


const mapStateToProps = ({ info }) => ({
    infoWeekResults: info.infoWeekResults,
    infoNextWeekPlans: info.infoNextWeekPlans,
    infoWeekQas: info.infoWeekQas,
    comments: info.comments,
    infoWeeklyVo: info.infoWeeklyVo,
    infoShow: info.infoShow
});

export default connect(mapStateToProps)(Info);
