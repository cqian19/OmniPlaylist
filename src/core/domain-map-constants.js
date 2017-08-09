/**
 * Created by cqian19 on 5/25/2017.
 */


import { DOMAIN_TYPES } from './constants';
import {
    VimeoPlayer,
    YoutubePlayer,
    CustomPlayer,
    UstreamPlayer,
    DailymotionPlayer
} from '../components/video-players';
import {
    VimeoAPI,
    YoutubeAPI,
    SoundCloudAPI,
    UstreamAPI,
    DailymotionAPI
} from '../api';

/**
 * For API and Player identification usage:
 * @namespace DOMAIN_PROPS
 *  @property {object} API              -Which API to connect to
 *  @property {object} Player           -Which video player to connect to
 *  @property {array}  [VideoLinks]      -URL patterns for videos on this domain
 *  @property {array}  [PlaylistLinks]   -URL patterns for playlists on this domain
 */

export const DOMAIN_PROPS = {
    [DOMAIN_TYPES.YOUTUBE]: {
        'API': YoutubeAPI,
        'Player': YoutubePlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/watch\?.*?v=[0-9._\-A-Za-z]+$/
        ],
        'PlaylistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/[0-9.\-A-Za-z]+\?[-a-zA-Z0-9_@:%+.~#?&\/=]*?list=[0-9.\-A-Za-z_]+/
        ]
    },
    [DOMAIN_TYPES.VIMEO]: {
        'API': VimeoAPI,
        'Player': VimeoPlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+\/video\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?player.vimeo\.com\/video\/[0-9]+$/
        ],
        'PlaylistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+$/
        ]
    },
    [DOMAIN_TYPES.SOUNDCLOUD]: {
        'API': SoundCloudAPI,
        'Player': CustomPlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?soundcloud.com\/([a-z0-9-_]+\/[a-z0-9-_]+)$/
        ],
        'PlaylistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?soundcloud.com\/[a-z0-9-_]+\/sets\/[a-z0-9-_]+$/
        ]
    },
    [DOMAIN_TYPES.USTREAM]: {
        'API': UstreamAPI,
        'Player': UstreamPlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?ustream.tv\/recorded\/\d+$/
        ],
    },
    [DOMAIN_TYPES.DAILYMOTION]: {
        'API': DailymotionAPI,
        'Player': DailymotionPlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?dailymotion.com\/video\/[a-z0-9]+$/
        ],
        'PlaylistLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?dailymotion.com\/playlist\/[a-z0-9]+(_.*)?$/
        ]
    }
};
