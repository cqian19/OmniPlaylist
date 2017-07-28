/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import SidebarItemContainer from '../containers/SidebarItemContainer';

class SidebarContent extends React.Component {

    render() {
        return(
            <div className="sidebar-playlist-content">
                {this.props.playlists.map((playlist, index) => (
                    <SidebarItemContainer
                        index={index}
                        key={playlist.uniqueId}
                        playlist={playlist}
                        playlistIndex={index}
                    />
                ))}
            </div>
        )
    }
}

SidebarContent.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object)
};

export default SidebarContent;