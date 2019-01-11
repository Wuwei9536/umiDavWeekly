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

