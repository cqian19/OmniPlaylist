/**
 * Created by cqian19 on 5/25/2017.
 */

/* Avoids circular importing when declared in constants */

import { DOMAIN_TYPES } from './constants';
import { VimeoPlayer, YoutubePlayer } from '../components/video-players';
import { VimeoAPI, YoutubeAPI } from '../api';

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
        'Player': SoundCloudPlayer,
        'OEmbed': true,
        'OEmbedLinks': [
            /^(?:https?:\/\/)?(?:w{3}\.)?soundcloud.com\/([a-z0-9-_]+\/[a-z0-9-_]+)$/
        ],
        'OEmbedEndpoint': 'https://soundcloud.com/oembed'
    }
};
