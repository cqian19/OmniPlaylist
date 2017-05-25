/**
 * Created by cqian19 on 5/24/2017.
 */

import React from 'react';

import YoutubeVideoPlayer from 'youtube-player';

const stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'video cued'
};

export class YoutubePlayer extends React.Component {

    _initializePlayer() {
        const player = YoutubeVideoPlayer(this.iframe);
        const _this = this;
        player.on('stateChange', function (event) {
            switch (stateNames[event.data]) {
                case 'ended':
                    return _this.props.onEnded(_this.props.index);
                default:
                    return;
            }
        });
        return player;
    }

    _playVideo(props=this.props) {
        this.player.loadVideoById(props.videos[props.index].id);
    }

    componentDidMount() {
        this.player = this.player || this._initializePlayer();
        this._playVideo();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.videos !== [] &&
            (nextProps.index !== this.props.index ||
                nextProps.videos !== this.props.videos
            );
    }

    componentWillUpdate(nextProps) {
        this._playVideo(nextProps);
    }

    render() {
        return (
            <div className="player__inner">
                <div className="player__main">
                    <div height="400" width="600" className="player" ref={(e) => {
                        this.iframe = e;
                    }}>
                    </div>
                </div>
                <div className="player__footer">
                    {/* Previous Video Button */}
                    <button onClick={this.props.onPrev}>
                        <i className="glyphicon glyphicon-fast-backward"/>
                    </button>
                    {/* Skip Video Button */}
                    <button onClick={this.props.onSkip}>
                        <i className="glyphicon glyphicon-fast-forward"/>
                    </button>
                </div>
            </div>
        );
    }
}