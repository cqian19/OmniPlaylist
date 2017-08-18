/**
 * Created by cqian19 on 5/25/2017.
 */


import { DOMAIN_TYPES } from './constants';
import { keys } from '../config';
import {
    VimeoPlayer,
    YoutubePlayer,
    SoundCloudPlayer,
    UstreamPlayer,
    DailymotionPlayer,
    FacebookPlayer,
    TwitchPlayer,
} from '../components/video-players';
import {
    VimeoAPI,
    YoutubeAPI,
    SoundCloudAPI,
    UstreamAPI,
    DailymotionAPI,
    FacebookAPI,
    TwitchAPI
} from '../api';

/**
 * For API and Player identification usage:
 * @namespace DOMAIN_PROPS
 *  @property {object} API              -Which API to connect to
 *  @property {object} player           -Which video player to connect to
 *  @property {array}  [videoLinks]     -URL patterns for videos on this domain
 *  @property {array}  [playlistLinks]  -URL patterns for playlists on this domain
 *  @property {array}  [streamLinks]    -URL patterns for livestream on this domain
 */

export const DOMAIN_PROPS = {
    [DOMAIN_TYPES.YOUTUBE]: {
        'API': YoutubeAPI,
        'player': YoutubePlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/watch\?.*?v=[0-9._\-A-Za-z]+$/
        ],
        'playlistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/[0-9.\-A-Za-z]+\?[-a-zA-Z0-9_@:%+.~#?&\/=]*?list=[0-9.\-A-Za-z_]+/
        ]
    },
    [DOMAIN_TYPES.VIMEO]: {
        'API': VimeoAPI,
        'player': VimeoPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+\/video\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?player.vimeo\.com\/video\/[0-9]+$/
        ],
        'playlistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+$/
        ]
    },
    [DOMAIN_TYPES.SOUNDCLOUD]: {
        'API': SoundCloudAPI,
        'player': SoundCloudPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?soundcloud.com\/([a-z0-9-_]+\/[a-z0-9-_]+)$/
        ],
        'playlistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?soundcloud.com\/[a-z0-9-_]+\/sets\/[a-z0-9-_]+$/
        ]
    },
    [DOMAIN_TYPES.USTREAM]: {
        'API': UstreamAPI,
        'player': UstreamPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?ustream.tv\/recorded\/\d+$/
        ],
    },
    [DOMAIN_TYPES.DAILYMOTION]: {
        'API': DailymotionAPI,
        'player': DailymotionPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?dailymotion.com\/video\/[a-z0-9]+$/
        ],
        'playlistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?dailymotion.com\/playlist\/[a-z0-9]+(_.*)?$/
        ]
    },
    [DOMAIN_TYPES.FACEBOOK]: {
        'API': FacebookAPI,
        'player': FacebookPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?facebook.com\/[^\/]+\/videos\/v.+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?facebook.com\/[^\/]+\/videos\/\d+\/?$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?facebook.com\/[^\/]+\/video.php\?v=.+$/,
        ]
    },
    [DOMAIN_TYPES.TWITCH]: {
        'API': TwitchAPI,
        'player': TwitchPlayer,
        'videoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?twitch.tv\/videos\/\d+$/
        ],
        'streamLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?twitch.tv\/[a-zA-Z0-9_]{4,25}$/
        ]
    }
};
