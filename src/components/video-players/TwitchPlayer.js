/**
 * Created by cqian19 on 8/10/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';

import { RENDER_TYPES } from '../../core/constants';
import BasePlayer from './BasePlayer';

const SDK_URL = 'http://player.twitch.tv/js/embed/v1.js';
const SDK_GLOBAL = 'Twitch';
/**
 * Twitch Player API:
 *  @link https://dev.twitch.tv/docs/v5/guides/embed/#embedding-video-and-clips
 */

export class TwitchPlayer extends BasePlayer {

    _getSDK () {
        if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
            return Promise.resolve(window[SDK_GLOBAL])
        }
        return new Promise((resolve, reject) => {
            loadScript(SDK_URL, err => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    _initializePlayer = () => {
        const { video } = this.props;
        if (this.player) { return this.player; }
        this._getSDK().then(() => {
            const Twitch = window[SDK_GLOBAL];
            const isVideo = video.renderType === RENDER_TYPES.VIDEO;
            const isStream = video.renderType === RENDER_TYPES.STREAM;
            const options = {
                autoplay: true,
                ...isStream && { channel: video.linkId },
                ...isVideo && { video: video.linkId },
                height: '100%',
                width: '100%'
            };
            this.player = new Twitch.Player("player-video", options);
            this.player.addEventListener(Twitch.Player.ENDED, this.handleEnded);
        });
    };

    handleEnded = () => {
        const { video, onEnded } = this.props;
        // Streams call ended immediately, even if they're live
        // Avoid skipping streams by only proceeding if a video ended
        if (video.renderType === RENDER_TYPES.VIDEO) {
            onEnded();
        }
    };

    componentDidMount() {
        this._initializePlayer();
    }

    componentWillUpdate(props) {
        const { video } = props;
        if (video.renderType === RENDER_TYPES.VIDEO) {
            this.player.setVideo(video.linkId);
        } else if (video.renderType === RENDER_TYPES.STREAM) {
            this.player.setChannel(video.linkId);
        }
    }


    render() {
        const { video } = this.props;
        return (
            <div id="player-video" />
        );
    }
}

TwitchPlayer.propTypes = {
    onEnded: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};