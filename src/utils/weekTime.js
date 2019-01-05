import moment from 'moment';

const endDate = { // 每月最后一天日期
    Jan: '01-31',
    FebNormal: '02-28',
    FebMore: '02-29',
    Mar: '03-31',
    Apr: '04-30',
    May: '05-31',
    June: '06-30',
    July: '07-31',
    Aug: '08-31',
    Sept: '09-30',
    Oct: '10-31',
    Nov: '11-30',
    Dec: '12-31',
    thirtyOne: 31,
    thirty: 30,
    twentyNine: 29,
    twentyEight: 28
};

export const Monday = (dateAll, day) => {
    if (day === 0) { // moment库的星期天返回的是0
        day = 7;
    }
    let subtractdays = day - 1;
    let monday = dateAll.subtract(subtractdays, 'days');
    return monday
}

// 取一个月的weekTime
const judgeMouthWeek = (year, quarter, month, date, day, maxdate) => { // 月份 日期 星期 该月最大天数
    if (day === 0) { // moment库的星期天返回的是0
        day = 7;
    }
    if ((date - day + 7) < 7) { // 日期小于7 返回空 属于上月周
        return [];
    }
    let week = 1 + Math.floor((date - day) / 7);
    let weekTime = month + "月" + (date - day + 1) + "日-" + month + "月" + (date - day + 7) + "日";
    let lastDate = year + '-' + month + '-' + (date - day + 7);
    if (date - day + 7 > maxdate) {
        let monthAddOne = month + 1;
        let yearAddOne;
        if (month === 12) {
            monthAddOne = 1;
            yearAddOne = year + 1;
        }
        weekTime = month + "月" + (date - day + 1) + "日-" + monthAddOne + "月" + (date - day + 7 - maxdate) + "日";
        lastDate = yearAddOne + '-' + monthAddOne + '-' + (date - day + 7 - maxdate);
    }
    let curtimeShow = [{ year, quarter, month, week, weekTime, lastDate }];
    date -= 7;
    let subTimeShow = judgeMouthWeek(year, quarter, month, date, day, 100);
    let timeShow = curtimeShow.concat(subTimeShow);
    return timeShow;
};

// 取指定季度的weekTime
const initTimeShow = (year, month, date, quarter) => { // month为moment().month()+1 // 年 月 日 季度
    const { Jan, FebNormal, FebMore, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec,
        thirtyOne, thirty, twentyEight, twentyNine } = endDate;
    let day = moment(year + "-" + month + "-" + date, "YYYY-MM-DD").day(); // 星期
    let endMonth = quarter * 3; // 季度最后月
    let startMonth = endMonth - 2; // 季度开始月
    let dayNumber = []; // 包括季度各个月的天数
    let lastDay = []; // 季度各个月的最后一天日期
    let specMonth = []; // 季度具体月份
    if (quarter === 1) {
        if (!moment([year]).isLeapYear()) {
            specMonth = [1, 2, 3];
            lastDay = [year + '-' + Jan, year + '-' + FebNormal, year + '-' + Mar];
            dayNumber = [thirtyOne, twentyEight, thirtyOne];
        } else {
            specMonth = [1, 2, 3];
            lastDay = [year + '-' + Jan, year + '-' + FebMore, year + '-' + Mar];
            dayNumber = [thirtyOne, twentyNine, thirtyOne];
        }
    } else if (quarter === 2) {
        specMonth = [4, 5, 6];
        lastDay = [year + '-' + Apr, year + '-' + May, year + '-' + June];
        dayNumber = [thirty, thirtyOne, thirty];
    } else if (quarter === 3) {
        specMonth = [7, 8, 9];
        lastDay = [year + '-' + July, year + '-' + Aug, year + '-' + Sept];
        dayNumber = [thirtyOne, thirtyOne, thirty];
    } else if (quarter === 4) {
        specMonth = [10, 11, 12];
        lastDay = [year + '-' + Oct, year + '-' + Nov, year + '-' + Dec];
        dayNumber = [thirtyOne, thirty, thirtyOne];
    }
    if (month > endMonth) {
        let timeShowThree = judgeMouthWeek(year, quarter, specMonth[2], dayNumber[2], moment(lastDay[2], "YYYY-MM-DD").day(), dayNumber[2]);
        let timeShowTwo = judgeMouthWeek(year, quarter, specMonth[1], dayNumber[1], moment(lastDay[1], "YYYY-MM-DD").day(), dayNumber[1]);
        let timeShowOne = judgeMouthWeek(year, quarter, specMonth[0], dayNumber[0], moment(lastDay[0], "YYYY-MM-DD").day(), dayNumber[0]);
        let result = timeShowThree.concat(timeShowTwo, timeShowOne);
        return result;
    } else if (month < startMonth) {
        let result = [{ month: "当前日期还未到达您设定的季度", week: "当前日期还未到达您设定的季度", weekTime: "当前日期还未到达您设定的季度" }];
        return result;
    } else if (month % 3 === 0) {
        let timeShowThree = judgeMouthWeek(year, quarter, specMonth[2], date, day, dayNumber[2]);
        let timeShowTwo = judgeMouthWeek(year, quarter, specMonth[1], dayNumber[1], moment(lastDay[1], "YYYY-MM-DD").day(), dayNumber[1]);
        let timeShowOne = judgeMouthWeek(year, quarter, specMonth[0], dayNumber[0], moment(lastDay[0], "YYYY-MM-DD").day(), dayNumber[0]);
        let result = timeShowThree.concat(timeShowTwo, timeShowOne);
        return result;
    } else if (month % 3 === 2) {
        let timeShowTwo = judgeMouthWeek(year, quarter, specMonth[1], date, day, dayNumber[1]);
        let timeShowOne = judgeMouthWeek(year, quarter, specMonth[0], dayNumber[0], moment(lastDay[0], "YYYY-MM-DD").day(), dayNumber[0]);
        let result = timeShowTwo.concat(timeShowOne);
        return result;
    } else if (month % 3 === 1) {
        let timeShowOne = judgeMouthWeek(year, quarter, specMonth[0], date, day, dayNumber[0]);
        let result = timeShowOne;
        return result;
    }
};
// 参数 === 年 月 日  季度
export default initTimeShow;

