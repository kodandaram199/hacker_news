/**
 * Created by kodanda_rama on 5/26/17.
 */
import {
    REQUEST_STORY,
    RECEIVE_STORY,
    REQUEST_STORY_FAILED,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS_FAILED,
    RESET_STORY_DESCRIPTION
}from './actionTypes';
import callApi from '../../../../api';
import { API_END_POINT } from '../../../../config/config'

const createStoryFetchUrl = (id) => `${API_END_POINT}/item/${id}.json?print=pretty`;

export const getComments = (ids, start, end) => {
    if(ids && ids.length>0 ) {
        let required_ids = ids.slice(start, end);
        return function (dispatch) {
            dispatch(requestComments());
            for (let i = 0; i < required_ids.length; i++) {
                callApi(createStoryFetchUrl(required_ids[i])).then(json => {
                    dispatch(receiveComments(json));
                })
                .catch(error => {
                    dispatch(requestCommentsFailed())
                });
            }
        };
    }
};

export const requestComments = () => {
    return {
        type: REQUEST_COMMENTS
    };
};

export const receiveComments = (json) => {
    return {
        type: RECEIVE_COMMENTS,
        payload: {
            json
        }
    };
};

export const requestCommentsFailed = () => {
    return {
        type: REQUEST_COMMENTS_FAILED
    };
};

export const getStory = (id) => {
    return function (dispatch) {
        dispatch(requestStory());
        callApi(createStoryFetchUrl(id)).then(json =>{
            dispatch(receiveStory(json));
        })
        .catch(error => {
            dispatch(requestStoryFailed())
        });
    }
};

export const requestStory = () => {
    return {
        type: REQUEST_STORY
    };
};

export const receiveStory = (json) => {
    return {
        type: RECEIVE_STORY,
        payload: {
            json
        }
    };
};

export const requestStoryFailed = () => {
    return {
        type: REQUEST_STORY_FAILED
    };
};

export const resetStoryDescription = () => {
    return {
        type: RESET_STORY_DESCRIPTION
    };
};