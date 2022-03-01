import {articleMiddleware} from "./articleMiddleware";
import {loginMiddleware} from "./loginMiddleware";

export const appMiddleware = [
    articleMiddleware, loginMiddleware
]