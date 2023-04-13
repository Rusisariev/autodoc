import {GET_DASHBOARD_FAILURE, GET_DASHBOARD_LIST_SUCCESS, GET_DASHBOARD_LOADING} from "./index";
import axiosSSR from "../../axios";


const getDashboardSuccess = (payload) => ({type: GET_DASHBOARD_LIST_SUCCESS, payload})
const getDashboardFailure = (payload) => ({type: GET_DASHBOARD_FAILURE, payload})
const getDashboardLoading = () => ({type: GET_DASHBOARD_LOADING})

export const getDashboardList = () => async (dispatch) => {
  dispatch(getDashboardLoading())
  await axiosSSR.get("/api/inner_traids_dashboard/").then(res => {
    if (res.data) {
      dispatch(getDashboardSuccess(res.data))
    } else {
      dispatch(getDashboardFailure(res.data))
    }
  }).catch(e => {
    dispatch(getDashboardFailure(e))
  })
}