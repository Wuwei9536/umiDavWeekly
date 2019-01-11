import { fetchWeeklyAll } from './service'

export default {
    namespace: 'weeklyList',

    state: {
        weeklyInfo: {
            userName: '',
            qweeks: []
        },
        show: false
    },

    effects: {
        *fetchWeeklyAll({ payload }, { call, put }) {
            const res = yield call(fetchWeeklyAll, payload);
            yield put({
                type: 'saveWeeklyAll',
                payload: res.data.data
            });
            yield put({
                type: 'changeShow',
                payload: true
            })
        }
    },

    reducers: {
        saveWeeklyAll(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        changeShow(state, { payload }) {
            return {
                ...state,
                show: payload
            }
        }
    }
}