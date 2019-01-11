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
//okr
export async function getOkrDetail(params) {
    return request('/api/support/week/getOkrDetail', opts(params));
}

export async function getKrWeeklys(params) {
    return request('/api/support/week/getKrWeeklys', opts(params));
}


