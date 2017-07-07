/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SidebarToggle extends React.Component {


    render() {
        const sidebarNames = classNames({
            'glyphicon': true,
            'glyphicon-menu-right': this.props.toggled,
            'glyphicon-menu-left': !this.props.toggled
        });

        return (
            <div className="sidebar-playlist-toggle" onClick={this.props.onSidebarToggle}>
                <i className={sidebarNames}/>
            </div>
        )
    }
}

SidebarToggle.propTypes = {
    onSidebarToggle: PropTypes.func.isRequired,
    toggled: PropTypes.bool.isRequired
};

export default SidebarToggle;