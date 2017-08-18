/**
 * Created by cqian19 on 8/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PlayerContainer from '../containers/PlayerContainer';
import PlaylistContainer from '../containers/PlaylistContainer';
import SidebarPlaylistContainer from "../containers/SidebarPlaylistContainer";

class PlayerLowerPage extends React.Component {

    render() {
        const { playlistCollapsed } = this.props;
        const pageClassNames = classNames({
            'lower-container': true,
            'lower-container-vertical': playlistCollapsed
        });
        return (
            <div className={pageClassNames}>
                <PlayerContainer/>
                <PlaylistContainer />
                <SidebarPlaylistContainer />
            </div>
        )
    }
}

PlayerLowerPage.propTypes = {
    playlistCollapsed:  PropTypes.bool.isRequired
};

export default PlayerLowerPage;