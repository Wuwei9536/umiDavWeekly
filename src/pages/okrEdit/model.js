import { addOkr, getKrWeeklys } from './service'

export default {
    namespace: 'okrEdit',

    state: {
 
    },

    effects: {
        *addOkr({ payload }, { call, put }) {
            const res = yield call(addOkr, payload);
        },
    },

    reducers: {
        saveOkrInfo(state, { payload }) {
            return {
                ...state,
                okrInfo: payload
            }
        },
    }
}