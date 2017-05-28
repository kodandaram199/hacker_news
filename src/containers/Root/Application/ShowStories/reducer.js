/**
 * Created by kodanda_rama on 5/23/17.
 */
import {
    REQUEST_SHOW_STORIES_IDS,
    RECEIVE_SHOW_STORIES_IDS,
    REQUEST_SHOW_STORIES_IDS_FAILED,
    REQUEST_SHOW_STORIES,
    RECEIVE_SHOW_STORIES,
    REQUEST_SHOW_STORIES_FAILED
}from './actionTypes';

const INITIAL_STATE = {
    show_stories_ids_pending: false,
    show_stories_ids: [],
    show_stories_ids_failed: false,
    show_stories_pending: false,
    show_stories: [],
    show_stories_failed: false,
};

const SHOW_STORIES_IDS_INITIAL_FLAG_STATE = {
    show_stories_ids_pending: false,
    show_stories_ids_failed: false,
};

const SHOW_STORIES_INITIAL_FLAG_STATE = {
    show_stories_pending: false,
    show_stories_failed: false,
};

export default function showStoriesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_SHOW_STORIES_IDS:
            return Object.assign({}, state, SHOW_STORIES_IDS_INITIAL_FLAG_STATE, {
                show_stories_ids_pending: true,
            });

        case RECEIVE_SHOW_STORIES_IDS:
            return Object.assign({}, state, SHOW_STORIES_IDS_INITIAL_FLAG_STATE, {
                show_stories_ids: action.payload.json,
            });

        case REQUEST_SHOW_STORIES_IDS_FAILED:
            return Object.assign({}, state, SHOW_STORIES_IDS_INITIAL_FLAG_STATE, {
                show_stories_ids_failed: true,
            });

        case REQUEST_SHOW_STORIES:
            return Object.assign({}, state, SHOW_STORIES_INITIAL_FLAG_STATE, {
                show_stories_pending: true
            });

        case RECEIVE_SHOW_STORIES:
            return Object.assign({}, state, SHOW_STORIES_INITIAL_FLAG_STATE, {
                show_stories: [...state.show_stories, action.payload.json],
            });

        case REQUEST_SHOW_STORIES_FAILED:
            return Object.assign({}, state, SHOW_STORIES_INITIAL_FLAG_STATE, {
                show_stories_failed: true,
            });

        default:
            return state;
    }
}
