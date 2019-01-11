import request from '../../utils/request';

const opts = (params) => {
    if (!params) {
        params = {}
    }
    return {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}
//attention
export async function selectWeekly(params) {
    return request('/api/support/week/selectWeekly', opts(params));
}

export async function selectDeptOption(params) {
    return request('/api/support/week/selectDeptOption', opts(params));
}

//userDetails
export async function getUser(params) {
    return request('/api/support/week/getUser', opts(params));
}
