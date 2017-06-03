/**
 * Created by cqian19 on 5/25/2017.
 */

/* Avoids circular importing when declared in constants */

import { DOMAIN_TYPES } from './constants';
import { VimeoPlayer, YoutubePlayer } from '../components/video-players';
import { VimeoAPI, YoutubeAPI } from '../api';

export const APIS = [
    VimeoAPI,
    YoutubeAPI
];

// Maps to appropriate video player
export const DOMAIN_TO_PLAYER = {
    [DOMAIN_TYPES.YOUTUBE]: YoutubePlayer,
    [DOMAIN_TYPES.VIMEO]: VimeoPlayer
};

// Maps to which API to use
export const DOMAIN_TO_API = {
    [DOMAIN_TYPES.YOUTUBE]: YoutubeAPI,
    [DOMAIN_TYPES.VIMEO]: VimeoAPI
};