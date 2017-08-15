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

    constructor() {
        super();
        this.state = {
            collapsed: false
        }
    }
    changeFlexDir = (shouldCollapse) => {
        this.setState({collapsed: shouldCollapse});
    };

    render() {
        const { collapsed } = this.state;
        const pageClassNames = classNames({
            'lower-container': true,
            'lower-container-vertical': collapsed
        });
        return (
            <div className={pageClassNames}>
                <PlayerContainer />
                <PlaylistContainer
                    changeFlexDir={this.changeFlexDir}
                />
                <SidebarPlaylistContainer />
            </div>
        )
    }
}

export default PlayerLowerPage;