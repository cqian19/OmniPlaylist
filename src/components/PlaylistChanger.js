/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';

import VideoSearcherContainer from '../containers/VideoSearcherContainer';
import PlaylistDisplayContainer from '../containers/PlaylistDisplayContainer';

class PlaylistChanger extends React.Component {

    render() {
        return (
            <div id="playlist-changer">
                <VideoSearcherContainer />
                <PlaylistDisplayContainer />
            </div>
        );
    }
}

export default PlaylistChanger;