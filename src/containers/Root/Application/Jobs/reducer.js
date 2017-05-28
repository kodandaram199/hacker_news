/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_JOBS_IDS,
    RECEIVE_JOBS_IDS,
    REQUEST_JOBS_IDS_FAILED,
    REQUEST_JOBS,
    RECEIVE_JOBS,
    REQUEST_JOBS_FAILED
}from './actionTypes';

const INITIAL_STATE = {
    jobs_ids_pending: false,
    jobs_ids: [],
    jobs_ids_failed: false,
    jobs_pending: false,
    jobs: [],
    jobs_failed: false,
};

const JOBS_IDS_INITIAL_FLAG_STATE = {
    jobs_ids_pending: false,
    jobs_ids_failed: false,
};

const JOBS_INITIAL_FLAG_STATE = {
    jobs_pending: false,
    jobs_failed: false,
};

export default function jobsReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_JOBS_IDS:
            return Object.assign({}, state, JOBS_IDS_INITIAL_FLAG_STATE, {
                jobs_ids_pending: true,
            });

        case RECEIVE_JOBS_IDS:
            return Object.assign({}, state, JOBS_IDS_INITIAL_FLAG_STATE, {
                jobs_ids: action.payload.json,
            });

        case REQUEST_JOBS_IDS_FAILED:
            return Object.assign({}, state, JOBS_IDS_INITIAL_FLAG_STATE, {
                jobs_ids_failed: true,
            });

        case REQUEST_JOBS:
            return Object.assign({}, state, JOBS_INITIAL_FLAG_STATE, {
                jobs_pending: true
            });

        case RECEIVE_JOBS:
            return Object.assign({}, state, JOBS_INITIAL_FLAG_STATE, {
                jobs: [...state.jobs, action.payload.json],
            });

        case REQUEST_JOBS_FAILED:
            return Object.assign({}, state, JOBS_INITIAL_FLAG_STATE, {
                jobs_failed: true,
            });

        default:
            return state;
    }
}
