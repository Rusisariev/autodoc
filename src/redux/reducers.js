import {combineReducers} from "redux";
import {userReducer} from "./users/reducer";
import {dashboardReducer} from "./dashboard/reducer";


export const reducers = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer
})