/**
 * Created by cqian19 on 8/5/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import UstreamEmbed from './ustream-embedapi/ustream-embedapi.min';

import BasePlayer from './BasePlayer';
import { extractEndNumbers } from '../../utils';

/**
 * Ustream Player API:
 *  @link http://developers.ustream.tv/player-api/player.html
 */

export class UstreamPlayer extends BasePlayer {

    _initializePlayer() {
        const player = UstreamEmbed('UstreamIframe');
        player.addListener('finished', this.props.onEnded);
        return player;
    }

    componentDidMount() {
        this.player = this._initializePlayer();
        this.player.callMethod('play');
    }

    componentWillUpdate(nextProps) {
        const { video } = nextProps;
        this.player.callMethod('load', 'video', extractEndNumbers(video.linkId));
    }

    componentDidUpdate() {
        // Because the player doesn't support an onload event
        setTimeout(() => {
            this.player.callMethod('play');
        }, 3000)
    }

    render() {
        const { video } = this.props;
        return (
            <div id="player-video">
                <iframe
                    id="UstreamIframe"
                    src={video.linkId}
                />
            </div>
        );
    }
}

UstreamPlayer.propTypes = {
    onEnded: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};