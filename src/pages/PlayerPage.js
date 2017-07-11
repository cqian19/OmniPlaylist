/**
 * Created by cqian19 on 7/8/2017.
 */

import React from 'react';

import NavBarContainer from '../containers/NavBarContainer';
import ImportBarContainer from '../containers/ImportBarContainer';
import PlayerContainer from '../containers/PlayerContainer';
import PlaylistContainer from '../containers/PlaylistContainer';
import SidebarPlaylistContainer from "../containers/SidebarPlaylistContainer";

export class PlayerPage extends React.Component {

    render() {
        return (
            <div>
                <ImportBarContainer />
                <div className="lower-container">
                    <PlayerContainer />
                    <PlaylistContainer />
                    <SidebarPlaylistContainer />
                </div>
            </div>
        );
    }
}