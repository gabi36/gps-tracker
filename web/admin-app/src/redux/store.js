import {createStore, compose, applyMiddleware} from "redux";
import {reducers} from "./reducer";
import {appMiddleware} from "./middleware/app";
import {coreMiddleware} from "./middleware/core";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers, composeEnhancer(applyMiddleware(...appMiddleware, ...coreMiddleware))
)

export default store;