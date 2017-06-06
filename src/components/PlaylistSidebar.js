/**
 * Created by cqian19 on 6/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import SidebarToggle from './SidebarToggle';
import SidebarContent from './SidebarContent';

class PlaylistSidebar extends React.Component {

    render() {
        return(
            <div className="playlist-sidebar">
                <SidebarToggle {...this.props} />
                <SidebarContent {...this.props} />
            </div>
        )
    }
}

PlaylistSidebar.propTypes = {
    onSidebarToggle: PropTypes.func,
    toggled: PropTypes.bool,
};

export default PlaylistSidebar;