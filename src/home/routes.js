/**
 * Created by cqian19 on 7/8/2017.
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import AppContainer from '../containers/AppContainer';
import { PlayerPage, PlaylistPage } from '../pages/index';

const routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={PlayerPage}/>
            <Route path='/playlists' component={PlaylistPage}/>
            <Redirect to="/" />
        </Switch>
    );
};

export default routes;