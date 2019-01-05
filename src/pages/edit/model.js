import { fetchDetail, fetchOkrs, fetchLastDetails, addWeekly, editWeekly } from './service';

export default {
    namespace: 'edit',

    state: {
        weeklyVo: {},
        weekResults: [{}],
        nextWeekPlans: [{}],
        weekQas: [{}],
        okrs: [],
        editShow: false
    },

    effects: {
        *fetchLastDetails({ payload }, { call, put }) {
            const res = yield call(fetchLastDetails, payload);
            yield put({
                type: 'saveWeekResults',
                payload: res.data.data.lastWeekPlans
            });
            yield put({
                type: 'changeEditShow',
                payload: true
            })
        },
        *fetchDetail({ payload }, { call, put }) {
            const res = yield call(fetchDetail, payload);
            yield put({
                type: 'saveWeekResults',
                payload: res.data.data.weeklyDetailInfo.weekResults
            });
            yield put({
                type: 'saveNextWeekPlans',
                payload: res.data.data.weeklyDetailInfo.nextWeekPlans
            });
            yield put({
                type: 'saveWeekQas',
                payload: res.data.data.weeklyDetailInfo.weekQas
            });
            yield put({
                type: 'saveWeeklyVo',
                payload: res.data.data.weeklyDetailInfo.weeklyVo
            });
            yield put({
                type: 'changeEditShow',
                payload: true
            })
        },
        *fetchOkrs({ payload }, { call, put }) {
            const res = yield call(fetchOkrs, payload);
            yield put({
                type: 'saveOkrs',
                payload: res.data.data.okrs
            })
        },
        *addWeekly({ payload }, { call, put }) {
            yield call(addWeekly, payload);
        },
        *editWeekly({ payload }, { call, put }) {
            yield call(editWeekly, payload);
        }
    },

    reducers: {
        saveOkrs(state, { payload }) {
            return {
                ...state,
                okrs: payload
            }
        },
        saveWeekResults(state, { payload }) {
            return {
                ...state,
                weekResults: payload
            }
        },
        saveNextWeekPlans(state, { payload }) {
            return {
                ...state,
                nextWeekPlans: payload
            }
        },
        saveWeekQas(state, { payload }) {
            return {
                ...state,
                weekQas: payload
            }
        },
        saveWeeklyVo(state, { payload }) {
            return {
                ...state,
                weeklyVo: payload
            }
        },
        changeEditShow(state, { payload }) {
            return {
                ...state,
                editShow: payload
            }
        }
    }
}