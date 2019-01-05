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

// edit
export async function fetchDetail(params) {
    return request('/api/support/week/getWeeklyDetail', opts(params))
}

//info
export async function fetchComment(params){
    return request('/api/support/week/getComment', opts(params))
}

export async function addComment(params){
    return request('/api/support/week/addComment', opts(params))
}


