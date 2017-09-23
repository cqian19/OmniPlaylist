/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import SidebarItemContainer from '../containers/SidebarItemContainer';

class SidebarContent extends React.Component {

    render() {
        const { playlists } = this.props;
        return(
            <div className="sidebar-playlist__content">
                {playlists.map((playlist, index) => (
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