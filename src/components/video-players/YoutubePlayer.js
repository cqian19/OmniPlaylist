/**
 * Created by cqian19 on 5/24/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import YoutubeVideoPlayer from 'youtube-player';

const stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'videoplayer cued'
};

/* API reference: https://github.com/gajus/youtube-player */
export class YoutubePlayer extends React.Component {

    _initializePlayer() {
        const player = YoutubeVideoPlayer(this.iframe);
        player.on('stateChange', (event) => {
            switch (stateNames[event.data]) {
                case 'ended':
                    return this.props.onEnded();
                default:
                    return;
            }
        });
        return player;
    }

    _playVideo(props=this.props) {
        this.player.loadVideoById(props.video.id);
    }

    componentDidMount() {
        this.player = this._initializePlayer();
        this._playVideo();
    }

    componentWillUpdate(nextProps) {
        this._playVideo(nextProps);
    }


    componentWillUnmount() {
        this.player.destroy();
    }

    /* Long note here:
     Apparently the youtube-player.destroy method is not called synchronously and will cause a
     "DOMexception: Failed to execute 'removeChild' ... The node to be removed is not a child of this node"
     when componentWillUnmount is called, since it can't undo the transformation of the div
     into an iframe in time, and that original div won't be found. So the current solution is to wrap
     the player-video div in another div, which will be found.
     */
    render() {
        return (
            <div>
                <div id="player-video" ref={(e) => {
                    this.iframe = e;
                }}/>
            </div>
        );
    }
}