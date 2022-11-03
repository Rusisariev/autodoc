import {GET_USER_ERROR, GET_USER_LOADING, GET_USER_SUCCESS} from "./index";

const initialState = {
    userDetail: {},
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LOADING:
            return {...state, loading: true}
        case GET_USER_SUCCESS:
            return {...state, loading: false, userDetail: action.payload}
        case GET_USER_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}