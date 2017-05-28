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

const INITIAL_STATE = {
    new_stories_ids_pending: false,
    new_stories_ids: [],
    new_stories_ids_failed: false,
    new_stories_pending: false,
    new_stories: [],
    new_stories_failed: false,
};

const NEW_STORIES_IDS_INITIAL_FLAG_STATE = {
    new_stories_ids_pending: false,
    new_stories_ids_failed: false,
};

const NEW_STORIES_INITIAL_FLAG_STATE = {
    new_stories_pending: false,
    new_stories_failed: false,
};

export default function newStoriesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_NEW_STORIES_IDS:
            return Object.assign({}, state, NEW_STORIES_IDS_INITIAL_FLAG_STATE, {
                new_stories_ids_pending: true,
            });

        case RECEIVE_NEW_STORIES_IDS:
            return Object.assign({}, state, NEW_STORIES_IDS_INITIAL_FLAG_STATE, {
                new_stories_ids: action.payload.json,
            });

        case REQUEST_NEW_STORIES_IDS_FAILED:
            return Object.assign({}, state, NEW_STORIES_IDS_INITIAL_FLAG_STATE, {
                new_stories_ids_failed: true,
            });

        case REQUEST_NEW_STORIES:
            return Object.assign({}, state, NEW_STORIES_INITIAL_FLAG_STATE, {
                new_stories_pending: true
            });

        case RECEIVE_NEW_STORIES:
            return Object.assign({}, state, NEW_STORIES_INITIAL_FLAG_STATE, {
                new_stories: [...state.new_stories, action.payload.json],
            });

        case REQUEST_NEW_STORIES_FAILED:
            return Object.assign({}, state, NEW_STORIES_INITIAL_FLAG_STATE, {
                new_stories_failed: true,
            });

        default:
            return state;
    }
}
