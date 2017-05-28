/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_NEW_STORIES_IDS,
    RECEIVE_NEW_STORIES_IDS,
    REQUEST_NEW_STORIES_IDS_FAILED,
    REQUEST_NEW_STORIES,
    RECEIVE_NEW_STORIES,
    REQUEST_NEW_STORIES_FAILED
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getNewStoriesIds = () => {
    const url = `${API_END_POINT}/newstories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestNewStoriesIds());
        callApi(url).then(json =>{
            dispatch(receiveNewStoriesIds(json));
        })
            .catch(error => {
                dispatch(requestNewStoriesFailedIds())
            });
    }
};

export const requestNewStoriesIds = () => {
    return {
        type: REQUEST_NEW_STORIES_IDS
    };
};

export const receiveNewStoriesIds = (json) => {
    return {
        type: RECEIVE_NEW_STORIES_IDS,
        payload: {
            json
        }
    };
};

export const requestNewStoriesFailedIds = () => {
    return {
        type: REQUEST_NEW_STORIES_IDS_FAILED
    };
};

export const getNewStories = (ids) => {
    return function (dispatch) {
        if(ids && ids.length>0 ){
            dispatch(requestNewStories());
            for(let i=0; i< ids.length; i++){
                callApi(createStoryFetchUrl(ids[i])).then(json =>{
                    dispatch(receiveNewStories(json));
                })
                    .catch(error => {
                        dispatch(requestNewStoriesFailed())
                    });
            }
        }
    };
};

export const requestNewStories = () => {
    return {
        type: REQUEST_NEW_STORIES
    };
};

export const receiveNewStories = (json) => {
    return {
        type: RECEIVE_NEW_STORIES,
        payload: {
            json
        }
    };
};

export const requestNewStoriesFailed = () => {
    return {
        type: REQUEST_NEW_STORIES_FAILED
    };
};