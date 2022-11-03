import {combineReducers} from "redux";
import {userReducer} from "./users/reducer";


export const reducers = combineReducers({
    user: userReducer
})