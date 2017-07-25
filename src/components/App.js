import '../assets/stylesheets/base.scss';

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from './Header';
import NavBarContainer from '../containers/NavBarContainer';

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        return(
            <BrowserRouter history={createHistory()}>
                <div className="container-fluid">
                    <NavBarContainer />
                    { this.props.routes() }
                </div>
            </BrowserRouter>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
