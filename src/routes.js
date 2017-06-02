/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './containers/Root/Application';
import NewStories from './containers/Root/Application/NewStories';
import TopStories from './containers/Root/Application/TopStories';
import BestStories from './containers/Root/Application/BestStories';
import AskStories from './containers/Root/Application/AskStories';
import ShowStories from './containers/Root/Application/ShowStories';
import Jobs from './containers/Root/Application/Jobs';
import StoryDescription from './containers/Root/Application/StoryDescription';
import UserProfile from './containers/Root/Application/UserProfile';

const routes = (
    <Route path={`${process.env.PUBLIC_URL}/`} component={App}>
        <IndexRoute component={NewStories}/>
        <Route path={'/top'} component={TopStories}/>
        <Route path={'/best'} component={BestStories}/>
        <Route path={'/ask'} component={AskStories}/>
        <Route path={'/show'} component={ShowStories}/>
        <Route path={'/jobs'} component={Jobs}/>
        <Route path={'/story-description/:id'} component={StoryDescription}/>
        <Route path={'/:user'} component={UserProfile}/>
        <Redirect path="*" to={`${process.env.PUBLIC_URL}/`} />
    </Route>
);

export default routes;