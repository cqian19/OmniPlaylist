/**
 * Created by cqian19 on 6/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SidebarToggle from './SidebarToggle';
import SidebarContent from './SidebarContent';

class SidebarPlaylist extends React.Component {

    render() {
        const { hideExtra, toggled } = this.props;
        const sidebarClassNames = classNames({
            'sidebar-playlist': true,
            'active': toggled,
            'hidden': hideExtra
        });
        return(
            <div className={sidebarClassNames}>
                <SidebarToggle {...this.props} />
                <SidebarContent {...this.props} />
            </div>
        )
    }
}

SidebarPlaylist.propTypes = {
    hideExtra: PropTypes.bool.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSidebarToggle: PropTypes.func.isRequired,
    toggled: PropTypes.bool.isRequired,
};

export default SidebarPlaylist;