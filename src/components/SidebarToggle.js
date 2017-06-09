/**
 * Created by cqian19 on 6/5/2017.
 */

import React from 'react';

class SidebarToggle extends React.Component {

    render() {
        return (
            <div className="sidebar-playlist-toggle" onClick={this.props.onSidebarToggle}>
                <i className={"glyphicon glyphicon-menu-" + (this.props.toggled ? "right" : "left")}/>
            </div>
        )
    }
}

export default SidebarToggle;