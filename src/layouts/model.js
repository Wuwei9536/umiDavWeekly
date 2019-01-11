import { routerRedux } from 'dva/router';
import { logOut } from './service';

export default {
    namespace: 'layOut',

    state: [
        { name: "我的周报", type: "book", to: "/" },
        { name: "我的OKR", type: "calendar", to: "/okr" },
        { name: "我的关注", type: "star", to: "/attention" },
        { name: "人员列表", type: "user", to: "/staff" }
    ],

    effects: {
        *logOut({ payload }, { call, put }) {
            yield call(logOut, payload);
            window.sessionStorage.setItem("weekly-authority", '');
            yield put(routerRedux.push('/login'));
        }
    },

    reducers: {
    }
}