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

const INITIAL_STATE = {
    ask_stories_ids_pending: false,
    ask_stories_ids: [],
    ask_stories_ids_failed: false,
    ask_stories_pending: false,
    ask_stories: [],
    ask_stories_failed: false,
};

const ASK_STORIES_IDS_INITIAL_FLAG_STATE = {
    ask_stories_ids_pending: false,
    ask_stories_ids_failed: false,
};

const ASK_STORIES_INITIAL_FLAG_STATE = {
    ask_stories_pending: false,
    ask_stories_failed: false,
};

export default function askStoriesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_ASK_STORIES_IDS:
            return Object.assign({}, state, ASK_STORIES_IDS_INITIAL_FLAG_STATE, {
                ask_stories_ids_pending: true,
            });

        case RECEIVE_ASK_STORIES_IDS:
            return Object.assign({}, state, ASK_STORIES_IDS_INITIAL_FLAG_STATE, {
                ask_stories_ids: action.payload.json,
            });

        case REQUEST_ASK_STORIES_IDS_FAILED:
            return Object.assign({}, state, ASK_STORIES_IDS_INITIAL_FLAG_STATE, {
                ask_stories_ids_failed: true,
            });

        case REQUEST_ASK_STORIES:
            return Object.assign({}, state, ASK_STORIES_INITIAL_FLAG_STATE, {
                ask_stories_pending: true
            });

        case RECEIVE_ASK_STORIES:
            return Object.assign({}, state, ASK_STORIES_INITIAL_FLAG_STATE, {
                ask_stories: [...state.ask_stories, action.payload.json],
            });

        case REQUEST_ASK_STORIES_FAILED:
            return Object.assign({}, state, ASK_STORIES_INITIAL_FLAG_STATE, {
                ask_stories_failed: true,
            });

        default:
            return state;
    }
}
