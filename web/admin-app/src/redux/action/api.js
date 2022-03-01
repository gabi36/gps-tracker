export const GET = 'GET'
export const POST ='POST'
export const PUT ='PUT'
export const DELETE ='DELETE'

export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

export const api = (body, method, url, entity, headers) => ({
    type: `${entity} ${API_REQUEST}`,
    payload: {
        body,
        meta: {method, url, entity, headers},
    }
})

export const apiSuccess = (data, entity) => ({
    type: `${entity} ${API_SUCCESS}`,
    payload: {
        data
    }
})

export const apiError = (error, entity) => ({
    type: `${entity} ${API_ERROR}`,
    payload: {
        error
    }
})