import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Spin } from 'antd';
import style from './index.less';
import ListView from '../../components/weekly-list-view';
import SelectView from '../../components/select-view';
import InitTimeShow, { Monday } from '../../utils/weekTime';

const FormItem = Form.Item;
// const yearNow = moment().year(); // 当前年份
// const quarterNow = moment().quarter(); // 当前季度
// const monthNow = moment().month() + 1; // 当前月份
// const dateNow = moment().date(); // 当前日期

const monday = Monday(moment(), moment().day()); //当前周一日期
const mondayYear = monday.year();  // 当前周一所属年份
const mondayMonth = monday.month() + 1; // 当前周一月份
const mondayDate = monday.date(); // 当前周一日份
const mondayQuarter = monday.quarter() // 当前周一季度

class WeeklyList extends React.Component {
  constructor() {
    super();
    this.state = {
      timeShow: [], // weekTime展示列表
    };
    this.yearChoose = mondayYear;
    this.monthChoose = mondayMonth;
    this.dateChoose = mondayDate;
    this.quarterChoose = mondayQuarter;
    this.quarterDisabled = mondayQuarter;
    this.userId=''
  }

  static propTypes = {
    weeklyListData: PropTypes.shape({}).isRequired, // 周报详细数据，最后将嵌入timeShow列表
  }

  static defaultProps = {
  }

  componentDidMount() {
    const { dispatch,location } = this.props;
    console.log('%cthis.props: ', 'font-size:15px;background-color: rgb(135, 208, 104);', this.props);
    const { search } = location;
    let fetchWeeklyAllParam;
    if (search){
      fetchWeeklyAllParam = decodeURI(search.slice(1));
      this.userId = JSON.parse(fetchWeeklyAllParam).userId;
    }else{
      fetchWeeklyAllParam = { "qtype": mondayQuarter, "userId": this.userId, "year": mondayYear }
    }
    dispatch({
      type: 'weeklyList/fetchWeeklyAll',
      payload: fetchWeeklyAllParam
    });
    let timeShow = InitTimeShow(mondayYear, mondayMonth, mondayDate, mondayQuarter); // InitTimeShow存放在utils里面，计算weekTime
    this.setState({ timeShow });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'weeklyList/changeShow',
      payload: false
    })
  }

  // 选择年份之后
  selectYear = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'weeklyList/changeShow',
      payload: false
    })
    this.yearChoose = Number(e);
    if (e < mondayYear) {
      this.monthChoose = 12;
      this.dateChoose = 31;
      this.quarterDisabled = 4;
    } else {
      this.monthChoose = mondayMonth;
      this.dateChoose = mondayDate;
      this.quarterDisabled = mondayQuarter;
    }
    let timeShow = InitTimeShow(this.yearChoose, this.monthChoose, this.dateChoose, this.quarterChoose);
    dispatch({
      type: 'weeklyList/fetchWeeklyAll',
      payload: { "qtype": this.quarterChoose, "userId": this.userId, "year": this.yearChoose }
    });
    this.setState({ timeShow });
  }

  // 选择季度之后
  quarter = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'weeklyList/changeShow',
      payload: false
    })
    let timeShow = [];
    switch (e) {
      case "Q1":
        this.quarterChoose = 1;
        timeShow = InitTimeShow(this.yearChoose, this.monthChoose, this.dateChoose, this.quarterChoose);
        break;
      case "Q2":
        this.quarterChoose = 2;
        timeShow = InitTimeShow(this.yearChoose, this.monthChoose, this.dateChoose, this.quarterChoose);
        break;
      case "Q3":
        this.quarterChoose = 3;
        timeShow = InitTimeShow(this.yearChoose, this.monthChoose, this.dateChoose, this.quarterChoose);
        break;
      case "Q4":
        this.quarterChoose = 4;
        timeShow = InitTimeShow(this.yearChoose, this.monthChoose, this.dateChoose, this.quarterChoose);
        break;
      default:
        break;
    }
    dispatch({
      type: 'weeklyList/fetchWeeklyAll',
      payload: { "qtype": this.quarterChoose, "userId": this.userId, "year": this.yearChoose }
    });
    this.setState({ timeShow });
  }

  // 新建按钮点击
  onButtonClick = (e, month, week, weekTime, year, quarter) => {
    const { history } = this.props
    let data = {
      year,
      month,
      qtype: quarter,
      week: week - 1,
      weekTime,
      from: 1
    };
    let path = {
      pathname: '/edit',
      state: data
    };
    history.push(path);
  }

  // 点击进入详情页
  DetailsClick = (e, id) => {
    const { history } = this.props
    let path = {
      pathname: '/info',
      state: { weeklyId: id }
    };
    history.push(path);
  }


  render() {
    const { weeklyListData, show} = this.props;
    const { timeShow } = this.state;
    return (
      <Card>
        <Form layout="inline">
          <SelectView
            data={[(mondayYear - 1).toString(), mondayYear.toString(), (mondayYear + 1).toString(), (mondayYear + 2).toString()]}
            defaultValue={mondayYear.toString()}
            onChange={this.selectYear}
          />
          <SelectView
            onChange={this.quarter}
            data={["Q1", "Q2", "Q3", "Q4"]}
            defaultValue={"Q" + mondayQuarter}
            quarter={this.quarterDisabled}
          />
          <FormItem>
            {/* eslint-disable */}
            <span>{weeklyListData.userName}的周报</span>
          </FormItem>
        </Form>
        {/* <div>此季周报还没有开始</div> */}
        {
          show
            ? (
              <ListView
                onDetailsClick={this.DetailsClick}
                data={timeShow}
                qweeks={weeklyListData.qweeks}
                onButtonClick={this.onButtonClick}
                userSelf = {this.userId===''}
              />) : <Spin className={style.loading} />
        }
      </Card>
    );
  }
}
const mapStateToProps = ({ weeklyList }) => ({
  weeklyListData: weeklyList.weeklyInfo,
  show: weeklyList.show,
});

export default connect(mapStateToProps)(WeeklyList);
