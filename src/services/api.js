import request from '../utils/request';

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
//userDetails
export async function getUser(params) {
    return request('/api/support/week/getUser', opts(params));
}

