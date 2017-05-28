/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_USER_PROFILE,
    RECEIVE_USER_PROFILE,
    REQUEST_USER_PROFILE_FAILED,
    RESET_USER_PROFILE
}from './actionTypes';

const INITIAL_STATE = {
    profile_pending: false,
    profile: {},
    profile_failed: false
};

const USER_PROFILE_INITIAL_FLAG_STATE = {
    profile_pending: false,
    profile_failed: false,
};

export default function userProfileReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_USER_PROFILE:
            return Object.assign({}, state, USER_PROFILE_INITIAL_FLAG_STATE, {
                profile_pending: true
            });

        case RECEIVE_USER_PROFILE:
            return Object.assign({}, state, USER_PROFILE_INITIAL_FLAG_STATE, {
                profile: action.payload.json,
            });

        case REQUEST_USER_PROFILE_FAILED:
            return Object.assign({}, state, USER_PROFILE_INITIAL_FLAG_STATE, {
                profile_failed: true,
            });

        case RESET_USER_PROFILE:
            return INITIAL_STATE;

        default:
            return state;
    }
}
