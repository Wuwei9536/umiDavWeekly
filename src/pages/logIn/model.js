import { login } from './service';
import { reloadAuthorized } from '../../utils/Authorized';
import { routerRedux } from 'dva/router';
import { yellow } from 'ansi-colors';


export default {
    namespace: 'login',

    state: {
        notice: ''
    },

    effects: {
        *login({ payload }, { call, put }) {
            const res = yield call(login, payload);
            if (res.data.code !== 0) {
                yield put({
                    type: 'notice',
                    payload: res.data.msg
                })
            } else {
                yield put({
                    type: 'notice',
                    payload: ''
                })
                window.sessionStorage.setItem("weekly-authority", 'wien');
                reloadAuthorized();
            }
            yield put(routerRedux.push('/'));
        }
    },

    reducers: {
        notice(state, { payload }) {
            return {
                ...state,
                notice: payload
            }
        }
    }
}