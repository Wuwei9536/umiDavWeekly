import { fetchDetail, fetchComment, addComment } from './service';

export default {
    namespace: 'info',

    state: {
        infoWeekResults: [{}],
        infoNextWeekPlans: [{}],
        infoWeekQas: [{}],
        infoShow: false,
        comments: [{}],
        infoWeeklyVo: {}
    },

    effects: {
        *fetchDetail({ payload }, { call, put }) {
            const res = yield call(fetchDetail, payload);
            yield put({
                type: 'saveInfoWeekResults',
                payload: res.data.data.weeklyDetailInfo.weekResults
            });
            yield put({
                type: 'saveInfoNextWeekPlans',
                payload: res.data.data.weeklyDetailInfo.nextWeekPlans
            });
            yield put({
                type: 'saveInfoWeekQas',
                payload: res.data.data.weeklyDetailInfo.weekQas
            });
            yield put({
                type: 'saveInfoWeeklyVo',
                payload: res.data.data.weeklyDetailInfo.weeklyVo
            });
            yield put({
                type: 'changeInfoShow',
                payload: true
            })
        },
        *fetchComment({ payload }, { call, put }) {
            const res = yield call(fetchComment, payload);
            yield put({
                type: 'saveComments',
                payload: res.data.data.comments
            })
        },
        *addComment({ payload }, { call, put }) {
            yield call(addComment, payload);
            const res = yield call(fetchComment, payload);
            yield put({
                type: 'saveComments',
                payload: res.data.data.comments
            })
        }
    },

    reducers: {
        saveInfoWeekResults(state, { payload }) {
            return {
                ...state,
                infoWeekResults: payload
            }
        },
        saveInfoNextWeekPlans(state, { payload }) {
            return {
                ...state,
                infoNextWeekPlans: payload
            }
        },
        saveInfoWeekQas(state, { payload }) {
            return {
                ...state,
                infoWeekQas: payload
            }
        },
        saveInfoWeeklyVo(state, { payload }) {
            return {
                ...state,
                infoWeeklyVo: payload
            }
        },
        saveComments(state, { payload }) {
            return {
                ...state,
                comments: payload
            }
        },
        changeInfoShow(state, { payload }) {
            return {
                ...state,
                infoShow: payload
            }
        }
    }
}