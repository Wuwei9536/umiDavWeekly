import { selectDeptOption, selectUser, getUser, focusOnUser, removeFocus } from './service';

export default {
    namespace: 'staff',

    state: {
        department: [],
        tableData: [],
        userDetails: {},
        staffShow: false,
        defaultDeptId: null,
        totoalCount: null,
        name: null
    },

    effects: {
        *selectDeptOption({ payload }, { call, put }) {
            const res = yield call(selectDeptOption, payload);
            yield put({
                type: 'saveDepartment',
                payload: res.data.data.depts
            })
        },
        *selectUser({ payload }, { call, put }) {
            const res = yield call(selectUser, payload);
            yield put({
                type: 'addTableData',
                payload: { data: res.data.data }
            });
            yield put({
                type: 'changeStaffShow',
                payload: true
            })
            yield put({
                type: 'initialDeptId',
                payload: payload.deptId
            })
        },
        *getUser({ payload }, { call, put }) {
            const res = yield call(getUser, payload);
            yield put({
                type: 'saveUserDetails',
                payload: res.data.data
            })
            yield put({
                type: 'selectUser',
                payload: { deptId: res.data.data.deptId, name: null, attentionType: "-1", pageIndex: 1, pageSize: 10 }
            })
        },
        *focusOnUser({ payload }, { call, put }) {
            const res = yield call(focusOnUser, payload.paramFocus);
            yield put({
                type: 'selectUser',
                payload: payload.paramSelect
            })
        },
        *removeFocus({ payload }, { call, put }) {
            const res = yield call(removeFocus, payload.paramFocus);
            yield put({
                type: 'selectUser',
                payload: payload.paramSelect
            })
        }
    },

    reducers: {
        saveDepartment(state, { payload }) {
            return {
                ...state,
                department: [{ deptId: -1, deptName: "全部部门" }, ...payload]
            }
        },
        addTableData(state, { payload }) {
            let data = payload.data.userVoList;
            let copyData = [...data];
            let focusState;
            for (let i in copyData) {
                if (copyData[i].focusType === 0) {
                    focusState = "查看周报/查看OKR/关注";
                } else {
                    focusState = "查看周报/查看OKR/取消关注";
                }
                copyData[i].operation = focusState;
                copyData[i].searchName = state.name;
                copyData[i].key = copyData[i].userId;
            }
            return {
                ...state,
                tableData: copyData,
                totoalCount: payload.data.totoalCount
            }
        },
        saveUserDetails(state, { payload }) {
            return {
                ...state,
                userDetails: payload
            }
        },
        changeStaffShow(state, { payload }) {
            return {
                ...state,
                staffShow: payload
            }
        },
        initialDeptId(state, { payload }) {
            return {
                ...state,
                defaultDeptId: payload
            }
        },
        saveName(state, { payload }) {
            return {
                ...state,
                name: payload
            }
        },
    }
}