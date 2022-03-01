export const LOGIN = '[LOGIN]'
export const SET_IS_LOGGED_IN = `${LOGIN} set is logged in`
export const SET_USER = `${LOGIN} set user id`
export const SET_SHOW_LOGIN = `${LOGIN} Set show Login`
export const SET_SHOW_EDIT_USER = `${LOGIN} Set show edit user`
export const PERFORM_LOGIN = `${LOGIN} PERFORM LOGIN`
export const UPDATE_USER = `${LOGIN} UPDATE USER`

export const setIsLoggedIn = (isLoggedIn) => ({
    type: SET_IS_LOGGED_IN,
    payload: {
        isLoggedIn
    }
})

export const setShowLogin = (showLogin) => ({
    type: SET_SHOW_LOGIN,
    payload: {
        showLogin
    }
})

export const setShowEditUser = (showEditUser) => ({
    type: SET_SHOW_EDIT_USER,
    payload: {
        showEditUser
    }
})

export const performLogin = (email, password) => ({
    type: PERFORM_LOGIN,
    payload: {email, password}
})

export const setUser = (data) =>({
    type: SET_USER,
    payload:{data}
})

export const updateUser = (id, password)=>({
    type: UPDATE_USER,
    payload:{id, password}
})

export const updateUserImage = (id, image)=>({
    type: UPDATE_USER,
    payload:{id, image}
})