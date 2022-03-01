import {
    DELETE_ARTICLE,
    FETCH_ARTICLE,
    FETCH_SAVED_ARTICLE, fetchSavedArticle,
    SAVE_ARTICLE,
    setArticle,
} from "../../action/articleAction";
import {api, API_ERROR, API_SUCCESS, DELETE, GET, POST} from "../../action/api";
import {API} from "../../../constant";


export const articleMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ARTICLE:
            dispatch(api(null, GET, API.ARTICLE_SERVICE_URL, FETCH_ARTICLE))
            break;
        case `${FETCH_ARTICLE} ${API_SUCCESS}`:
            dispatch(setArticle(action.payload.data))
            break;
        case `${FETCH_ARTICLE} ${API_ERROR}`:
            console.log("ERROR")
            break;
        case FETCH_SAVED_ARTICLE:
            const {id, source, startDate, endDate} = action.payload
            console.log(id, source, startDate, endDate)
            dispatch(api(null, GET, API.DB_FILTERED_ARTICLE_SERVICE_URL(id, source, startDate, endDate), FETCH_ARTICLE))
            break;
        case `${FETCH_SAVED_ARTICLE} ${API_SUCCESS}`:
            console.log(action.payload.data)
            dispatch(setArticle(action.payload.data))
            break;
        case SAVE_ARTICLE:
            let {userId} = action.payload
            console.log(userId)
            dispatch(api(action.payload, POST, API.SAVE_ARTICLE_SERVICE_URL(userId), SAVE_ARTICLE, {'Content-Type': 'application/json'}))
            break;
        case `${SAVE_ARTICLE} ${API_SUCCESS}`:
            console.log(action.payload.data)
            break;
        case DELETE_ARTICLE:
            let {idUser, articleId} = action.payload
            dispatch(api(null, DELETE, API.DELETE_ARTICLE_FROM_USER_SERVICE_URL(idUser, articleId), DELETE_ARTICLE ))
            break;
        case `${DELETE_ARTICLE} ${API_SUCCESS}`:
            console.log(action.payload.data)
            dispatch(fetchSavedArticle(action.payload.data))
            break;
        default:
            return null;
    }
}