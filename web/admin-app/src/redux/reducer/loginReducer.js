import {SET_IS_LOGGED_IN, SET_SHOW_EDIT_USER, SET_SHOW_LOGIN, SET_USER} from "../action/loginAction";

const initState = {
    isLoggedIn: true,
    showLogin: false,
    showEditUser: false,
    data: null
}

export function loginReducer(loginContext = initState, action) {
    const {payload, type} = action;

    switch (type){
        case SET_IS_LOGGED_IN:
            return{...loginContext, ...{isLoggedIn: payload.isLoggedIn}}
        case SET_SHOW_LOGIN:
            return{...loginContext,...{showLogin: payload.showLogin}}
        case SET_SHOW_EDIT_USER:
            return {...loginContext,...{showEditUser: payload.showEditUser}}
        case SET_USER:
            return {...loginContext, ...{data: payload.data}}
        default:
            return loginContext;
    }
}