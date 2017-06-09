/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';

import SidebarItemContainer from '../containers/SidebarItemContainer';

class SidebarContent extends React.Component {

    render() {
        return(
            <div className="sidebar-playlist-content">
                {this.props.playlists.map((playlist, index) => (
                    <SidebarItemContainer
                        playlist={playlist}
                        index={index}
                    />
                ))}
            </div>
        )
    }
}

export default SidebarContent;