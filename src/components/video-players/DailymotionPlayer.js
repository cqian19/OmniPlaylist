/**
 * Created by cqian19 on 8/8/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dailymotion from 'react-dailymotion';

import BasePlayer from './BasePlayer';

/**
 * Dailymotion Player API:
 *  @link https://developer.dailymotion.com/player
 */

export class DailymotionPlayer extends BasePlayer {

    render() {
        const { video, onEnded } = this.props;
        return (
            <div id="player-video">
                <Dailymotion
                    video={video.linkId}
                    autoplay={true}
                    height='100%'
                    width='100%'
                    onVideoEnd={onEnded}
                />
            </div>
        );
    }
}

DailymotionPlayer.propTypes = {
    onEnded: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};