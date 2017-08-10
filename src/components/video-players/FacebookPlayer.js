/**
 * Created by cqian19 on 8/9/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Facebook from 'react-facebook-player';

import { DOMAIN_TYPES } from '../../core/constants';
import { DOMAIN_PROPS } from '../../core/domain-map-constants';
import BasePlayer from './BasePlayer';

/**
 * Facebook Player API:
 *  @link https://developers.facebook.com/docs/plugins/embedded-video-player
 *  @link https://github.com/fmedinac/react-facebook-player
 */

export class FacebookPlayer extends BasePlayer {

    _getKey() {
        return DOMAIN_PROPS[DOMAIN_TYPES.FACEBOOK].key;
    }

    render() {
        const { video, onEnded } = this.props;
        const key = this._getKey();
        return (
            <div id="player-video">
                <Facebook
                    appId={key}
                    videoId={video.linkId}
                    onFinishedPlaying={onEnded}
                    autoplay={true}
                    allowfullscreen={true}
                />
            </div>
        );
    }
}

FacebookPlayer.propTypes = {
    onEnded: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};