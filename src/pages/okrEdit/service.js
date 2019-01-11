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
//okrEdit
export async function addOkr(params) {
    return request('/api/support/week/addOkr', opts(params));
}

