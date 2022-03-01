export const ARTICLE = '[ARTICLE]'
export const FETCH_ARTICLE = `${ARTICLE} Fetch article list prom server`
export const SET_ARTICLE = `${ARTICLE} Save article tot the store`
export const FETCH_SAVED_ARTICLE =`${ARTICLE} Fetch saved article form database`
export const SAVE_ARTICLE =`${ARTICLE} Save article in database`
export const SET_ARTICLE_SOURCE =`${ARTICLE} Set article source`
export const DELETE_ARTICLE = `${ARTICLE} Delete article from database`

export const fetchArticle = (data) => ({
    type: FETCH_ARTICLE,
    payload: {data}
})

export const setArticle = (articleList) => ({
    type: SET_ARTICLE,
    payload: {articleList}
})

export const fetchSavedArticle = (id, source="all", startDate="", endDate="")=>({
    type: FETCH_SAVED_ARTICLE,
    payload: {id, source, startDate, endDate}
})

export const saveArticle = (userId, id, urlImage, title, description, source, author, publishDate, urlArticle)=>({
    type: SAVE_ARTICLE,
    payload: {userId, urlImage, title, description, source, author, publishDate, urlArticle}
})

export const deleteArticle = (idUser, articleId)=>({
    type: DELETE_ARTICLE,
    payload:{idUser, articleId}
})
