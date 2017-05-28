/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_TOP_STORIES_IDS,
    RECEIVE_TOP_STORIES_IDS,
    REQUEST_TOP_STORIES_IDS_FAILED,
    REQUEST_TOP_STORIES,
    RECEIVE_TOP_STORIES,
    REQUEST_TOP_STORIES_FAILED
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getTopStoriesIds = () => {
    const url = `${API_END_POINT}/topstories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestTopStoriesIds());
        callApi(url).then(json =>{
            dispatch(receiveTopStoriesIds(json));
        })
            .catch(error => {
                dispatch(requestTopStoriesFailedIds())
            });
    }
};

export const requestTopStoriesIds = () => {
    return {
        type: REQUEST_TOP_STORIES_IDS
    };
};

export const receiveTopStoriesIds = (json) => {
    return {
        type: RECEIVE_TOP_STORIES_IDS,
        payload: {
            json
        }
    };
};

export const requestTopStoriesFailedIds = () => {
    return {
        type: REQUEST_TOP_STORIES_IDS_FAILED
    };
};

export const getTopStories = (ids) => {
    return function (dispatch) {
        if(ids && ids.length>0 ){
            dispatch(requestTopStories());
            for(let i=0; i< ids.length; i++){
                callApi(createStoryFetchUrl(ids[i])).then(json =>{
                    dispatch(receiveTopStories(json));
                })
                    .catch(error => {
                        dispatch(requestTopStoriesFailed())
                    });
            }
        }
    };
};

export const requestTopStories = () => {
    return {
        type: REQUEST_TOP_STORIES
    };
};

export const receiveTopStories = (json) => {
    return {
        type: RECEIVE_TOP_STORIES,
        payload: {
            json
        }
    };
};

export const requestTopStoriesFailed = () => {
    return {
        type: REQUEST_TOP_STORIES_FAILED
    };
};