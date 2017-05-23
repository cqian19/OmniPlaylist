/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import YoutubePlayer from 'youtube-player';


class Player extends React.Component {

    _initializePlayer() {
        return YoutubePlayer(this.iframe);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.videos !== []) {
            this.player = this.player || this._initializePlayer();
            this.player.loadVideoById(nextProps.videos[0].id);
        }
    }

    render() {
        return (
            <div height="400" width="600" className="player" ref={(e)=> { this.iframe = e; }}>
            </div>
        )
    }
}

export default Player;
