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
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getJobsIds = () => {
    const url = `${API_END_POINT}/jobstories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestJobsIds());
        callApi(url).then(json =>{
            dispatch(getJobs(json, 0, 15));
            dispatch(receiveJobsIds(json));
        })
        .catch(error => {
            dispatch(requestJobsFailedIds())
        });
    }
};

export const requestJobsIds = () => {
    return {
        type: REQUEST_JOBS_IDS
    };
};

export const receiveJobsIds = (json) => {
    return {
        type: RECEIVE_JOBS_IDS,
        payload: {
            json
        }
    };
};

export const requestJobsFailedIds = () => {
    return {
        type: REQUEST_JOBS_IDS_FAILED
    };
};

export const getJobs = (ids, start, end) => {
    if(ids && ids.length >0) {
        let required_ids = ids.slice(start, end);
        return function (dispatch) {
            dispatch(requestJobs());
            for (let i = 0; i < required_ids.length; i++) {
                callApi(createStoryFetchUrl(required_ids[i])).then(json => {
                    dispatch(receiveJobs(json));
                })
                    .catch(error => {
                        dispatch(requestJobsFailed())
                    });
            }
        };
    }
};

export const requestJobs = () => {
    return {
        type: REQUEST_JOBS
    };
};

export const receiveJobs = (json) => {
    return {
        type: RECEIVE_JOBS,
        payload: {
            json
        }
    };
};

export const requestJobsFailed = () => {
    return {
        type: REQUEST_JOBS_FAILED
    };
};