import axios from 'axios';
import * as actions from "../api";

const api = ({dispatch, getState}) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action);


    const {url, method, onSuccess, onStart, onError, data} = action.payload;

    if(onStart) dispatch({type: onStart});

    next(action);

    try {
        const response = await axios.request({
            baseURL: "http://localhost:9001/api",
            url,
            method,
            data
        })

        //General Success
        dispatch(actions.apiCallSuccess(response.data));

        //Specific success
        if(onSuccess)
            dispatch({
                type: onSuccess,
                payload: response.data,
            });
    } catch (error) {
        //General Fail
        dispatch(actions.apiCallFailed(error.message));

        //Specific fail
        if(onError)
            dispatch({
                type: onError,
                payload: error.message,
            });
    }

}

export default api;