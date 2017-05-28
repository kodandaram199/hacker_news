/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_BEST_STORIES_IDS,
    RECEIVE_BEST_STORIES_IDS,
    REQUEST_BEST_STORIES_IDS_FAILED,
    REQUEST_BEST_STORIES,
    RECEIVE_BEST_STORIES,
    REQUEST_BEST_STORIES_FAILED
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getBestStoriesIds = () => {
    const url = `${API_END_POINT}/beststories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestBestStoriesIds());
        callApi(url).then(json =>{
            dispatch(receiveBestStoriesIds(json));
        })
            .catch(error => {
                dispatch(requestBestStoriesFailedIds())
            });
    }
};

export const requestBestStoriesIds = () => {
    return {
        type: REQUEST_BEST_STORIES_IDS
    };
};

export const receiveBestStoriesIds = (json) => {
    return {
        type: RECEIVE_BEST_STORIES_IDS,
        payload: {
            json
        }
    };
};

export const requestBestStoriesFailedIds = () => {
    return {
        type: REQUEST_BEST_STORIES_IDS_FAILED
    };
};

export const getBestStories = (ids) => {
    return function (dispatch) {
        if(ids && ids.length>0 ){
            dispatch(requestBestStories());
            for(let i=0; i< ids.length; i++){
                callApi(createStoryFetchUrl(ids[i])).then(json =>{
                    dispatch(receiveBestStories(json));
                })
                    .catch(error => {
                        dispatch(requestBestStoriesFailed())
                    });
            }
        }
    };
};

export const requestBestStories = () => {
    return {
        type: REQUEST_BEST_STORIES
    };
};

export const receiveBestStories = (json) => {
    return {
        type: RECEIVE_BEST_STORIES,
        payload: {
            json
        }
    };
};

export const requestBestStoriesFailed = () => {
    return {
        type: REQUEST_BEST_STORIES_FAILED
    };
};