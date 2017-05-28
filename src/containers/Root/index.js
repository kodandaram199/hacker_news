/**
 * Created by kodanda_rama on 5/23/17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import routes from '../../routes';
import { Router } from 'react-router';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes}/>
        </div>
    </Provider>
);

export default Root;