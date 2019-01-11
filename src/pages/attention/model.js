import { selectWeekly, selectDeptOption, getUser } from './service';

export default {
    namespace: 'attention',

    state: {
        department: [],
        attentionData: [],
        attentionShow: false,
        userDetails: {},
        totalCount: null,
        defaultDeptId: null
    },

    effects: {
        *selectWeekly({ payload }, { call, put }) {
            const res = yield call(selectWeekly, payload);
            yield put({
                type: 'saveAttentionData',
                payload: res.data.data
            });
            yield put({
                type: 'initialDeptId',
                payload: payload.deptId
            })
            yield put({
                type: 'changeAttentionShow',
                payload: true
            })
        },
        *selectDeptOption({ payload }, { call, put }) {
            const res = yield call(selectDeptOption, payload);
            yield put({
                type: 'saveDepartment',
                payload: res.data.data.depts
            })
        },
        *getUser({ payload }, { call, put }) {
            const res = yield call(getUser, payload);
            yield put({
                type: 'saveUserDetails',
                payload: res.data.data
            })
            yield put({
                type: 'selectWeekly',
                payload: { year: 2019, month: 1, week: 1, qtype: 1, deptId: -1, weekType: -1, pageIndex: 1, pageSize: 10 }
            })
        },
    },

    reducers: {
        saveAttentionData(state, { payload }) {
            let data = payload.userWeeklyList;
            let copyData = [...data];
            for (let i in copyData) {
                copyData[i].operation = "详情/全部周报/OKR";
                copyData[i].key = copyData[i].userId;
            }
            return {
                ...state,
                attentionData: copyData,
                totalCount: payload.totalCount
            }
        },
        saveDepartment(state, { payload }) {
            return {
                ...state,
                department: [{ deptId: -1, deptName: "全部部门" }, ...payload]
            }
        },
        changeAttentionShow(state, { payload }) {
            return {
                ...state,
                attentionShow: payload
            }
        },
        saveUserDetails(state, { payload }) {
            return {
                ...state,
                userDetails: payload
            }
        },
        initialDeptId(state, { payload }) {
            return {
                ...state,
                defaultDeptId: payload
            }
        },
    }
}