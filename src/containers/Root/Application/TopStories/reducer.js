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

const INITIAL_STATE = {
    top_stories_ids_pending: false,
    top_stories_ids: [],
    top_stories_ids_failed: false,
    top_stories_pending: false,
    top_stories: [],
    top_stories_failed: false,
};

const TOP_STORIES_IDS_INITIAL_FLAG_STATE = {
    top_stories_ids_pending: false,
    top_stories_ids_failed: false,
};

const TOP_STORIES_INITIAL_FLAG_STATE = {
    top_stories_pending: false,
    top_stories_failed: false,
};

export default function topStoriesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_TOP_STORIES_IDS:
            return Object.assign({}, state, TOP_STORIES_IDS_INITIAL_FLAG_STATE, {
                top_stories_ids_pending: true,
            });

        case RECEIVE_TOP_STORIES_IDS:
            return Object.assign({}, state, TOP_STORIES_IDS_INITIAL_FLAG_STATE, {
                top_stories_ids: action.payload.json,
            });

        case REQUEST_TOP_STORIES_IDS_FAILED:
            return Object.assign({}, state, TOP_STORIES_IDS_INITIAL_FLAG_STATE, {
                top_stories_ids_failed: true,
            });

        case REQUEST_TOP_STORIES:
            return Object.assign({}, state, TOP_STORIES_INITIAL_FLAG_STATE, {
                top_stories_pending: true
            });

        case RECEIVE_TOP_STORIES:
            return Object.assign({}, state, TOP_STORIES_INITIAL_FLAG_STATE, {
                top_stories: [...state.top_stories, action.payload.json],
            });

        case REQUEST_TOP_STORIES_FAILED:
            return Object.assign({}, state, TOP_STORIES_INITIAL_FLAG_STATE, {
                top_stories_failed: true,
            });

        default:
            return state;
    }
}
