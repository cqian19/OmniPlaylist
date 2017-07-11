/**
 * Created by cqian19 on 7/8/2017.
 */

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import AppContainer from './containers/AppContainer';
import { PlayerPage, PlaylistPage } from './pages';

const routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={PlayerPage}/>
            <Route path='/playlists' component={PlaylistPage}/>
        </Switch>
    );
};

export default routes;