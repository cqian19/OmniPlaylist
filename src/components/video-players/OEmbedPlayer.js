/**
 * Created by cqian19 on 8/2/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import BasePlayer from './BasePlayer';

export class OEmbedPlayer extends BasePlayer {

    _renderHtml = () => {
        const { video } = this.props;
        return {__html: video.html};
    };

    render() {
        return (
            <div id="player-video" dangerouslySetInnerHTML={this._renderHtml()}/>
        )
    }
}

OEmbedPlayer.propTypes = {
    index:  PropTypes.number.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};