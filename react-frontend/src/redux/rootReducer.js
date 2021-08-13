import {combineReducers} from "redux";
import {postsReducer} from "./postsReducer";
import {userReducer} from "./userReducer"
import {reducer as formReducer} from 'redux-form'
export const rootReducer = combineReducers({
    posts: postsReducer,
    users:userReducer,
    form:formReducer
})