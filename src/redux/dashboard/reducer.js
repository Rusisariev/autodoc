import {GET_DASHBOARD_FAILURE, GET_DASHBOARD_LIST_SUCCESS, GET_DASHBOARD_LOADING} from "./index";

const initialState = {
  dashboards: [],
  loading: false,
  error: null
}

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_LOADING:
      return {...state, loading: true}
    case GET_DASHBOARD_LIST_SUCCESS:
      return {...state, loading: false, dashboards: action.payload}
    case GET_DASHBOARD_FAILURE:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}