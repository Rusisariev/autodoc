import {GET_USER_SUCCESS} from "./index";
import axiosSSR from "../../axios";

const getUserSuccess = (payload) => ({type: GET_USER_SUCCESS, payload})
const getUserError = (payload) => ({type: GET_USER_SUCCESS, payload})
const getUserLoading = () => ({type: GET_USER_SUCCESS})

export const getUser = () => async (dispatch) => {
    dispatch(getUserLoading())
    await axiosSSR.get("/api/users/profile/").then(res => {
        if(res.error){
            dispatch(getUserError(res.error))
        }
        dispatch(getUserSuccess(res.data))
    })
}