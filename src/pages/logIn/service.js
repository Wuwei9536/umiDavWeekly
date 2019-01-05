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
//weekly
export async function fetchWeeklyAll(params) {
    return request('/api/support/week/getWeeklys', opts(params));
}

// edit
export async function fetchDetail(params) {
    return request('/api/support/week/getWeeklyDetail', opts(params))
}

export async function fetchOkrs(params) {
    return request('/api/support/week/selectOkrOption', opts(params))
}

export async function fetchLastDetails(params) {
    return request('/api/support/week/getLastWeeklyDetail', opts(params))
}

export async function addWeekly(params) {
    return request('/api/support/week/addWeekly', opts(params))
}

export async function editWeekly(params) {
    return request('/api/support/week/editWeekly', opts(params))
}

//info
export async function fetchComment(params){
    return request('/api/support/week/getComment', opts(params))
}

export async function addComment(params){
    return request('/api/support/week/addComment', opts(params))
}


