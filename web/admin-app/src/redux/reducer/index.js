import {articleReducer} from "./articleReducer";
import {loginReducer} from "./loginReducer";
import {combineReducers} from "redux";

export const reducers = combineReducers(
    {
        loginContext: loginReducer,
        articleContext: articleReducer
    }
)