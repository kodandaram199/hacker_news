/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_SHOW_STORIES_IDS,
    RECEIVE_SHOW_STORIES_IDS,
    REQUEST_SHOW_STORIES_IDS_FAILED,
    REQUEST_SHOW_STORIES,
    RECEIVE_SHOW_STORIES,
    REQUEST_SHOW_STORIES_FAILED
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getShowStoriesIds = () => {
    const url = `${API_END_POINT}/showstories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestShowStoriesIds());
        callApi(url).then(json =>{
            dispatch(getShowStories(json, 0, 15));
            dispatch(receiveShowStoriesIds(json));
        })
            .catch(error => {
                dispatch(requestShowStoriesFailedIds())
            });
    }
};

export const requestShowStoriesIds = () => {
    return {
        type: REQUEST_SHOW_STORIES_IDS
    };
};

export const receiveShowStoriesIds = (json) => {
    return {
        type: RECEIVE_SHOW_STORIES_IDS,
        payload: {
            json
        }
    };
};

export const requestShowStoriesFailedIds = () => {
    return {
        type: REQUEST_SHOW_STORIES_IDS_FAILED
    };
};

export const getShowStories = (ids, start, end) => {
    if(ids && ids.length>0 ) {
        let required_ids = ids.slice(start, end);
        return function (dispatch) {
            dispatch(requestShowStories());
            for (let i = 0; i < required_ids.length; i++) {
                callApi(createStoryFetchUrl(required_ids[i])).then(json => {
                    dispatch(receiveShowStories(json));
                })
                .catch(error => {
                    dispatch(requestShowStoriesFailed())
                });
            }
        };
    }
};

export const requestShowStories = () => {
    return {
        type: REQUEST_SHOW_STORIES
    };
};

export const receiveShowStories = (json) => {
    return {
        type: RECEIVE_SHOW_STORIES,
        payload: {
            json
        }
    };
};

export const requestShowStoriesFailed = () => {
    return {
        type: REQUEST_SHOW_STORIES_FAILED
    };
};