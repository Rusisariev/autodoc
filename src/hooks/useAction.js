import {useDispatch} from "react-redux";

export const useAction = (action) => {
    const dispatch = useDispatch()
    return dispatch(action)
}