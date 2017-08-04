/**
 * Created by cqian19 on 5/25/2017.
 */


import { DOMAIN_TYPES } from './constants';
import {
    VimeoPlayer,
    YoutubePlayer,
    SoundCloudPlayer
} from '../components/video-players';
import {
    VimeoAPI,
    YoutubeAPI,
    SoundCloudAPI
} from '../api';

export const DOMAIN_PROPS = {
    [DOMAIN_TYPES.YOUTUBE]: {
        'API': YoutubeAPI,
        'Player': YoutubePlayer,
        'OEmbed': false
    },
    [DOMAIN_TYPES.VIMEO]: {
        'API': VimeoAPI,
        'Player': VimeoPlayer,
        'OEmbed': true,
        'OEmbedLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+\/video\/[0-9]+$/,
            /^(?:https?:\/\/)?(?:w{3}\.)?player.vimeo\.com\/video\/[0-9]+$/
        ],
        'OEmbedEndpoint': 'https://vimeo.com/api/oembed.json'
    },
    [DOMAIN_TYPES.SOUNDCLOUD]: {
        'API': SoundCloudAPI,
        'Player': SoundCloudPlayer,
        'OEmbed': false
    }
};
