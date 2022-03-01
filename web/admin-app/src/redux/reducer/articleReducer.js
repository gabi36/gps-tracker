import {SET_ARTICLE} from "../action/articleAction";

const initState = {
    articleList:[],
}

export function articleReducer(articleContext=initState, action){
    const {payload, type} = action;
    switch (type){
        case SET_ARTICLE:
            return {...articleContext, ...{articleList:payload.articleList}}
        default:
            return articleContext;
    }
}