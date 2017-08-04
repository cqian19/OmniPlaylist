/**
 * Created by cqian19 on 8/2/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import BasePlayer from './BasePlayer';
import CustomPlayer from './Components/CustomPlayer';

export class SoundCloudPlayer extends CustomPlayer {

}

SoundCloudPlayer.propTypes = {
    index:  PropTypes.number.isRequired,
    onEnded: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};
