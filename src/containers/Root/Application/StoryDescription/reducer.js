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

const INITIAL_STATE = {
    story_pending: false,
    story: {},
    story_failed: false,
    comments_pending: false,
    comments: [],
    comments_failed: false,
};

const COMMENTS_INITIAL_FLAG_STATE = {
    comments_pending: false,
    comments_failed: false,
};

const STORY_INITIAL_FLAG_STATE = {
    story_pending: false,
    story_failed: false,
};

export default function storyDescriptionReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_COMMENTS:
            return Object.assign({}, state, COMMENTS_INITIAL_FLAG_STATE, {
                comments_pending: true
            });

        case RECEIVE_COMMENTS:
            return Object.assign({}, state, COMMENTS_INITIAL_FLAG_STATE, {
                comments: [...state.comments, action.payload.json],
            });

        case REQUEST_COMMENTS_FAILED:
            return Object.assign({}, state, COMMENTS_INITIAL_FLAG_STATE, {
                comments_failed: true,
            });

        case REQUEST_STORY:
            return Object.assign({}, state, STORY_INITIAL_FLAG_STATE, {
                story_pending: true
            });

        case RECEIVE_STORY:
            return Object.assign({}, state, STORY_INITIAL_FLAG_STATE, {
                story: action.payload.json,
            });

        case REQUEST_STORY_FAILED:
            return Object.assign({}, state, STORY_INITIAL_FLAG_STATE, {
                story_failed: true,
            });

        case RESET_STORY_DESCRIPTION:
            return INITIAL_STATE;

        default:
            return state;
    }
}
