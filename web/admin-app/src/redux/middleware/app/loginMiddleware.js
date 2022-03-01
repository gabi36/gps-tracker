import {PERFORM_LOGIN, setIsLoggedIn, setShowLogin, setUser, UPDATE_USER} from "../../action/loginAction";
import {api, API_ERROR, API_SUCCESS, POST, PUT} from "../../action/api";
import {API} from "../../../constant";

export const loginMiddleware = ({dispatch}) => (next) => (action) =>{
    next(action);

    switch (action.type){
        case PERFORM_LOGIN:
            dispatch(api(action.payload, POST, API.LOGIN_USER_SERVICE_URL, PERFORM_LOGIN, {'Content-Type': 'application/json'}))
            break;
        case `${PERFORM_LOGIN} ${API_SUCCESS}`:
            dispatch(setIsLoggedIn(true))
            dispatch(setShowLogin(false))
            dispatch(setUser(action.payload.data))
            break;
        case `${PERFORM_LOGIN} ${API_ERROR}`:
            alert("Wrong credentials!")
            break;
        case UPDATE_USER:
            const {id} = action.payload
            dispatch(api(action.payload, PUT, API.UPDATE_USER_SERVICE_URL(id), UPDATE_USER, {'Content-Type': 'application/json'}))
            break;
        case `${UPDATE_USER} ${API_SUCCESS}`:
            dispatch(setUser(action.payload.data))
            break;
        default:
            return null;
    }
}