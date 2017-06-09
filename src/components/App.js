import '../assets/stylesheets/base.scss';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Header from './Header';
import NavBarContainer from '../containers/NavBarContainer';
import ImportBarContainer from '../containers/ImportBarContainer';
import PlayerContainer from '../containers/PlayerContainer';
import PlaylistContainer from '../containers/PlaylistContainer';
import SidebarPlaylistContainer from "../containers/SidebarPlaylistContainer";

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        return(
            <div className="container-fluid">
                <Header />
                <NavBarContainer />
                <ImportBarContainer />
                <div className="lower-container">
                    <PlayerContainer />
                    <PlaylistContainer />
                    <SidebarPlaylistContainer />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
