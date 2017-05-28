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

const INITIAL_STATE = {
    best_stories_ids_pending: false,
    best_stories_ids: [],
    best_stories_ids_failed: false,
    best_stories_pending: false,
    best_stories: [],
    best_stories_failed: false,
};

const BEST_STORIES_IDS_INITIAL_FLAG_STATE = {
    best_stories_ids_pending: false,
    best_stories_ids_failed: false,
};

const BEST_STORIES_INITIAL_FLAG_STATE = {
    best_stories_pending: false,
    best_stories_failed: false,
};

export default function bestStoriesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_BEST_STORIES_IDS:
            return Object.assign({}, state, BEST_STORIES_IDS_INITIAL_FLAG_STATE, {
                best_stories_ids_pending: true,
            });

        case RECEIVE_BEST_STORIES_IDS:
            return Object.assign({}, state, BEST_STORIES_IDS_INITIAL_FLAG_STATE, {
                best_stories_ids: action.payload.json,
            });

        case REQUEST_BEST_STORIES_IDS_FAILED:
            return Object.assign({}, state, BEST_STORIES_IDS_INITIAL_FLAG_STATE, {
                best_stories_ids_failed: true,
            });

        case REQUEST_BEST_STORIES:
            return Object.assign({}, state, BEST_STORIES_INITIAL_FLAG_STATE, {
                best_stories_pending: true
            });

        case RECEIVE_BEST_STORIES:
            return Object.assign({}, state, BEST_STORIES_INITIAL_FLAG_STATE, {
                best_stories: [...state.best_stories, action.payload.json],
            });

        case REQUEST_BEST_STORIES_FAILED:
            return Object.assign({}, state, BEST_STORIES_INITIAL_FLAG_STATE, {
                best_stories_failed: true,
            });

        default:
            return state;
    }
}
