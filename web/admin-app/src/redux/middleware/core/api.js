import {API_REQUEST, apiError, apiSuccess, DELETE, GET, POST, PUT} from "../../action/api";

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);

    if (action.type.indexOf(API_REQUEST) >= 0) {
        const {method, url, entity, headers} = action.payload.meta;
        let {body} = action.payload;
        switch (method) {
            case GET:
                window.fetch(url, {method, headers})
                    .then(resp => {
                        if (resp.ok) {
                            resp.json().then(data => {
                                console.log('response OK, JSON parsing OK', data);
                                dispatch(apiSuccess(data, entity))
                            });
                        } else {
                            resp.json().then(error => {
                                console.log('response failed, JSON parsing OK', error);
                                dispatch(apiError(error, entity))
                            })
                        }
                    })
                    .catch(err => {
                        console.log(`Api call ERROR: ${err} - ${action.type}`)
                        dispatch(apiError(err.toString(), entity))
                    })
                break;
            case POST:
                body = JSON.stringify(body);
                window.fetch(url, {method, headers, body})
                    .then(resp => {
                        if (resp.ok) {
                            resp.json().then(data => {
                                console.log('response OK, JSON parsing OK', data);
                                dispatch(apiSuccess(data, entity))
                            });
                        } else {
                            resp.json().then(error => {
                                console.log('response failed, JSON parsing OK', error);
                                dispatch(apiError(error, entity))
                            })
                        }
                    })
                    .catch(err => {
                        console.log(`Api call ERROR: ${err} - ${action.type}`)
                        dispatch(apiError(err.toString(), entity))
                    })
                break;
            case PUT:
                body = JSON.stringify(body);
                console.log(body, method, url)
                window.fetch(url, {method, headers, body})
                    .then(resp => {
                        if (resp.ok) {
                            resp.json().then(data => {
                                console.log('response OK, JSON parsing OK', data);
                                dispatch(apiSuccess(data, entity))
                            });
                        } else {
                            resp.json().then(error => {
                                console.log('response failed, JSON parsing OK', error);
                                dispatch(apiError(error, entity))
                            })
                        }
                    })
                    .catch(err => {
                        console.log(`Api call ERROR: ${err} - ${action.type}`)
                        dispatch(apiError(err.toString(), entity))
                    })
                break;
            case DELETE:
                body = JSON.stringify(body);
                console.log(body, method, url)
                window.fetch(url, {method, headers, body})
                    .then(resp => {
                        if (resp.ok) {
                            resp.json().then(data => {
                                console.log('response OK, JSON parsing OK', data);
                                dispatch(apiSuccess(data, entity))
                            });
                        } else {
                            resp.json().then(error => {
                                console.log('response failed, JSON parsing OK', error);
                                dispatch(apiError(error, entity))
                            })
                        }
                    })
                    .catch(err => {
                        console.log(`Api call ERROR: ${err} - ${action.type}`)
                        dispatch(apiError(err.toString(), entity))
                    })
                break;
            default:
                return null;
        }
    }
}