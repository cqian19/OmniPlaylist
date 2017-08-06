/**
 * Created by cqian19 on 5/25/2017.
 */


import { DOMAIN_TYPES } from './constants';
import {
    VimeoPlayer,
    YoutubePlayer,
    CustomPlayer,
    UStreamPlayer
} from '../components/video-players';
import {
    VimeoAPI,
    YoutubeAPI,
    SoundCloudAPI,
    UStreamAPI
} from '../api';

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
        'API': UStreamAPI,
        'Player': UStreamPlayer,
        'VideoLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?ustream.tv\/recorded\/\d+$/
        ],
    }
};
