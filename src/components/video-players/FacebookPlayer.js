/**
 * Created by cqian19 on 8/9/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Facebook from 'react-facebook-player';

import { DOMAIN_TYPES, API_URL } from '../../core/constants';
import { DOMAIN_PROPS } from '../../core/domain-map-constants';
import BasePlayer from './BasePlayer';
import { FacebookAPI } from '../../api';


    /**
 * Facebook Player API:
 *  @link https://developers.facebook.com/docs/plugins/embedded-video-player
 *  @link https://github.com/fmedinac/react-facebook-player
 */

let key = ''; // Facebook app ids are public

export class FacebookPlayer extends BasePlayer {

    constructor() {
        super();
        this.state = {
            key
        }
    }

    componentWillMount() {
        if(!key) {
            FacebookAPI.fetchKey().then((response) => {
                key = response.data.key;
                this.setState({key});
            });
        }
    }

    render() {
        const { video, onEnded } = this.props;
        const { key } = this.state;
        return (
            <div id="player-video">
                {key ? (
                    <Facebook
                        appId={key}
                        videoId={video.linkId}
                        onFinishedPlaying={onEnded}
                        autoplay={true}
                        allowfullscreen={true}
                    />
                ) : 'Loading Facebook video...'}
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