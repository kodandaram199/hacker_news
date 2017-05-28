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

export const getComments = (ids) => {
    return function (dispatch) {
        if(ids && ids.length>0 ){
            dispatch(requestComments());
            for(let i=0; i< ids.length; i++){
                callApi(createStoryFetchUrl(ids[i])).then(json =>{
                    dispatch(receiveComments(ids[i], json));
                })
                .catch(error => {
                    dispatch(requestCommentsFailed())
                });
            }
        }
    };
};

export const requestComments = () => {
    return {
        type: REQUEST_COMMENTS
    };
};

export const receiveComments = (id, json) => {
    return {
        type: RECEIVE_COMMENTS,
        payload: {
            json
        },
        meta: {
            id
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