import '../assets/stylesheets/main.scss';

import React from 'react';
import createHistory from 'history/createBrowserHistory'
import HTML5Backend from 'react-dnd-html5-backend';
import isElectron from 'is-electron';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';

import Header from './Header';
import TitleBarContainer from '../containers/TitleBarContainer';
import NavBarContainer from '../containers/NavBarContainer';

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        return(
            <BrowserRouter history={createHistory()}>
                <div>
                    { isElectron() ?
                        (<TitleBarContainer />) : null
                    }
                    <div className="container-fluid">
                        <NavBarContainer />
                        { this.props.routes() }
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
