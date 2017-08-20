/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SidebarToggle extends React.Component {


    render() {
        const { onSidebarToggle, toggled } = this.props;
        const sidebarNames = classNames({
            'glyphicon': true,
            'glyphicon-chevron-down': toggled,
            'glyphicon-chevron-up': !toggled
        });
        return (
            <div className="sidebar-playlist__toggle" onClick={onSidebarToggle}>
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