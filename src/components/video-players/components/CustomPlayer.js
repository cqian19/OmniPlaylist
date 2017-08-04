/**
 * Created by cqian19 on 8/3/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import BasePlayer from '../BasePlayer';
import Progress from './Progress';
import Buttons from './Buttons';
import { formatMilliseconds } from './utils';

// Sound object play statuses
const SOUNDS = {
    STOPPED: Sound.status.STOPPED,
    PAUSED: Sound.status.PAUSED,
    PLAYING: Sound.status.PLAYING
};

class CustomPlayer extends BasePlayer {

    state = {
        playStatus: SOUNDS.PLAYING,
        timeElapsed: 0, // Audio time elapsed in milliseconds
        elapsed: '00:00', // Audio time elapsed formatted
        total: '00:00', // Audio length
        position: 0, // Progress bar
        playFromPosition: 0 // Point in audio to continue from, set to time_elapsed
    };

    shouldComponentUpdate(props, state) {
        return state !== this.state || super.shouldComponentUpdate(props, state);
    }

    togglePlay = () => {
        if (this.state.playStatus === SOUNDS.PLAYING) {
            // Pause if playing
            this.setState({playStatus: SOUNDS.PAUSED})
        } else {
            // Resume if paused
            this.setState({playStatus: SOUNDS.PLAYING, playFromPosition: this.state.timeElapsed})
        }
    };

    stop = () => {
        this.setState({playStatus: SOUNDS.STOPPED, elapsed: '00:00', playFromPosition: 0, timeElapsed: 0})
    };

    handleSongPlaying = (audio) => {
        this.setState({
            timeElapsed: audio.position,
            elapsed: formatMilliseconds(audio.position),
            total: formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        })
    };

    onProgressClick = (newState) => {
        this.setState(newState);
    };

    render() {
        const { video, onEnded } = this.props;
        const { playStatus, playFromPosition } = this.state;
        return (
            <div id="player-video" className="custom-player">
                <img className="player-img" src={video.thumbnail}/>
                <Sound
                    url={video.linkId}
                    playStatus={playStatus}
                    onPlaying={this.handleSongPlaying}
                    playFromPosition={playFromPosition} // Video start time
                    onFinishedPlaying={onEnded}
                />
                <Buttons
                    playStatus={playStatus}
                    togglePlay={this.togglePlay}
                    stop={this.stop}
                />
                <h4> {video.title} </h4>
                <Progress
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                    position={this.state.position}
                    onProgressClick={this.onProgressClick}
                    video={video}
                />
            </div>
        );
    }
}

CustomPlayer.propTypes = {
    onEnded: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default CustomPlayer;