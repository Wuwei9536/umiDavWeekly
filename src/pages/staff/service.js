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
//staff
export async function selectDeptOption(params) {
    return request('/api/support/week/selectDeptOption', opts(params));
}

export async function selectUser(params) {
    return request('/api/support/week/selectUser', opts(params));
}

export async function focusOnUser(params) {
    return request('/api/support/week/focusOnUser', opts(params));
}

export async function removeFocus(params) {
    return request('/api/support/week/removeFocus', opts(params));
}

//userDetails
export async function getUser(params) {
    return request('/api/support/week/getUser', opts(params));
}

