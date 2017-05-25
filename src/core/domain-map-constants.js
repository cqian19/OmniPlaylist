/**
 * Created by cqian19 on 5/25/2017.
 */

/* Avoids circular importing when declared in constants */

import { DOMAIN_TYPES } from './constants';
import { YoutubePlayer } from '../components/video-players';
import { YoutubeAPI } from '../api';

// Maps to appropriate video player
export const DOMAIN_TO_PLAYER = {
    [DOMAIN_TYPES.YOUTUBE]: YoutubePlayer
};

// Maps to which API to use
export const DOMAIN_TO_API = {
    [DOMAIN_TYPES.YOUTUBE]: YoutubeAPI
};