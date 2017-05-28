/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_USER_PROFILE,
    RECEIVE_USER_PROFILE,
    REQUEST_USER_PROFILE_FAILED,
    RESET_USER_PROFILE
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

export const getUserProfile = (userName) => {
    const url = `${API_END_POINT}/user/${userName}.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestUserProfile());
        callApi(url).then(json =>{
            dispatch(receiveUserProfile(json));
        })
            .catch(error => {
                dispatch(requestUserProfileFailed())
            });
    }
};


export const requestUserProfile = () => {
    return {
        type: REQUEST_USER_PROFILE
    };
};

export const receiveUserProfile = (json) => {
    return {
        type: RECEIVE_USER_PROFILE,
        payload: {
            json
        }
    };
};

export const requestUserProfileFailed = () => {
    return {
        type: REQUEST_USER_PROFILE_FAILED
    };
};

export const requestUserProfileReset = () => {
    return {
        type: RESET_USER_PROFILE
    };
};