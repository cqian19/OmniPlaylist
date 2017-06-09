/**
 * Created by cqian19 on 6/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import SidebarToggle from './SidebarToggle';
import SidebarContent from './SidebarContent';

class SidebarPlaylist extends React.Component {

    render() {
        return(
            <div className={"sidebar-playlist " + (this.props.toggled ? "active" : "")}>
                <SidebarToggle {...this.props} />
                <SidebarContent {...this.props} />
            </div>
        )
    }
}

SidebarPlaylist.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSidebarToggle: PropTypes.func.isRequired,
    toggled: PropTypes.bool.isRequired,
};

export default SidebarPlaylist;