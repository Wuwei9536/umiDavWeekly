import { getOkrDetail, getKrWeeklys } from './service'

export default {
    namespace: 'okr',

    state: {
        okrInfo: {
            "okrId": null,
            "isUser": null,
            "userName": null,
            "year": null,
            "qType": null,
            "startTime": null,
            "noEditTime": null,
            "okrDetails": []
        },
        krWeeklys:[],
        okrShow: false
    },

    effects: {
        *getOkrDetail({ payload }, { call, put }) {
            const res = yield call(getOkrDetail, payload);
            yield put({
                type: 'saveOkrInfo',
                payload: res.data.data.okrInfo
            });
            yield put({
                type: 'changeOkrShow',
                payload: true
            })
        },
        *getKrWeeklys({ payload }, { call, put }) {
            const res = yield call(getKrWeeklys, payload);
            yield put({
                type: 'saveKrWeeklys',
                payload: res.data.data.krWeeklys
            });
        },
    },

    reducers: {
        saveOkrInfo(state, { payload }) {
            return {
                ...state,
                okrInfo: payload
            }
        },
        changeOkrShow(state, { payload }) {
            return {
                ...state,
                okrShow: payload
            }
        },
        saveKrWeeklys(state,{payload}){
            return{
                ...state,
                krWeeklys:payload
            }
        }
    }
}