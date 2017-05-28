/**
 * Created by kodanda_rama on 5/23/17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newStoriesReducer from '../containers/Root/Application/NewStories/reducer';
import topStoriesReducer from '../containers/Root/Application/TopStories/reducer';
import bestStoriesReducer from '../containers/Root/Application/BestStories/reducer';
import askStoriesReducer from '../containers/Root/Application/AskStories/reducer';
import showStoriesReducer from '../containers/Root/Application/ShowStories/reducer';
import jobsReducer from '../containers/Root/Application/Jobs/reducer';
import storyDescriptionReducer from '../containers/Root/Application/StoryDescription/reducer';
import userProfileReducer from '../containers/Root/Application/UserProfile/reducer'

export default combineReducers({
    routing: routerReducer,
    newStories: newStoriesReducer,
    topStories: topStoriesReducer,
    bestStories: bestStoriesReducer,
    askStories: askStoriesReducer,
    showStories: showStoriesReducer,
    jobStories: jobsReducer,
    storyDescription: storyDescriptionReducer,
    userProfile: userProfileReducer
});