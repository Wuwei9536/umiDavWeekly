import { getUser } from '../services/api';

export default {
    namespace:'userDetails',

    state:{
        userDetails:{}
    },

    effects:{
        *getUser({payload},{call,put}){
            const res = yield call(getUser,payload);
            yield put({
                type:'saveUserDetails',
                payload:res.data.data
            })
        }
    },

    reducers:{
        saveUserDetails(state,{payload}){
            return {
                ...state,
                userDetails:payload
            }
        }
    }
}