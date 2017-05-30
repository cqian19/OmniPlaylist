import '../assets/stylesheets/base.scss';
import React from 'react';
import Header from './Header';
import NavBarContainer from '../containers/NavBarContainer';
import ImportBarContainer from '../containers/ImportBarContainer';
import PlayerContainer from '../containers/PlayerContainer';
import PlaylistContainer from '../containers/PlaylistContainer';

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
                <div className="video-container">
                    <PlayerContainer />
                    <PlaylistContainer/>
                </div>
            </div>
        )
    }
}

export default App;
