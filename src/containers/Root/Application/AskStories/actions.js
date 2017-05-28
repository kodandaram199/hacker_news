/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_ASK_STORIES_IDS,
    RECEIVE_ASK_STORIES_IDS,
    REQUEST_ASK_STORIES_IDS_FAILED,
    REQUEST_ASK_STORIES,
    RECEIVE_ASK_STORIES,
    REQUEST_ASK_STORIES_FAILED
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config';

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getAskStoriesIds = () => {
    const url = `${API_END_POINT}/askstories.json?print=pretty`;
    return function (dispatch) {
        dispatch(requestAskStoriesIds());
        callApi(url).then(json =>{
            dispatch(receiveAskStoriesIds(json));
        })
        .catch(error => {
            dispatch(requestAskStoriesFailedIds())
        });
    }
};

export const requestAskStoriesIds = () => {
    return {
        type: REQUEST_ASK_STORIES_IDS
    };
};

export const receiveAskStoriesIds = (json) => {
    return {
        type: RECEIVE_ASK_STORIES_IDS,
        payload: {
            json
        }
    };
};

export const requestAskStoriesFailedIds = () => {
    return {
        type: REQUEST_ASK_STORIES_IDS_FAILED
    };
};

export const getAskStories = (ids) => {
    return function (dispatch) {
        if(ids && ids.length>0 ){
            dispatch(requestAskStories());
            for(let i=0; i< ids.length; i++){
                callApi(createStoryFetchUrl(ids[i])).then(json =>{
                    dispatch(receiveAskStories(json));
                })
                    .catch(error => {
                        dispatch(requestAskStoriesFailed())
                    });
            }
        }
    };
};

export const requestAskStories = () => {
    return {
        type: REQUEST_ASK_STORIES
    };
};

export const receiveAskStories = (json) => {
    return {
        type: RECEIVE_ASK_STORIES,
        payload: {
            json
        }
    };
};

export const requestAskStoriesFailed = () => {
    return {
        type: REQUEST_ASK_STORIES_FAILED
    };
};