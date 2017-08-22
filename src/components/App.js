import '../assets/stylesheets/base.scss';

import React from 'react';
import createHistory from 'history/createBrowserHistory'
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';

import Header from './Header';
import TitleBar from './TitleBar';
import NavBarContainer from '../containers/NavBarContainer';

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        const isElectron = process.versions.electron;
        return(
            <BrowserRouter history={createHistory()}>
                <div>
                    { isElectron ?
                        (<TitleBar />) : null
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
