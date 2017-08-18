/**
 * Created by cqian19 on 8/10/2017.
 */

import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';
import { extractEndNumbers, extractEndAlnum } from '../utils';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';

const DOMAIN_TYPE = DOMAIN_TYPES.TWITCH;

/**
 * API reference:
 *  @link https://dev.twitch.tv/docs/v5/reference/video/
 *  @link https://dev.twitch.tv/docs/v5/reference/streams/
 *  @link https://dev.twitch.tv/docs/v5/reference/channels/
 */

export class TwitchVideo extends BaseVideo {

    constructor(response, renderType) {
        super(DOMAIN_TYPE, renderType);
        if (renderType === RENDER_TYPES.VIDEO) {
            this.title = response.title;
            this.thumbnail = response.thumbnails[0].url;
            this.linkId = response._id;
        } else if (renderType === RENDER_TYPES.STREAM) {
            this.linkId = response.name;
            this.title = `${response.name}'s Twitch Stream`;
            this.thumbnail = response.logo;
        }
    }

}

export class TwitchAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(response) {
        return new TwitchVideo(response.data, RENDER_TYPES.VIDEO);
    }

    static getStreamFromResponse(response) {
        return new TwitchVideo(response.data, RENDER_TYPES.STREAM);
    }

    static fetchVideo(link) {
        const id = extractEndNumbers(link);
        const endpoint = this.getBackendAPIURL(RENDER_TYPES.VIDEO);
        return axios.get(endpoint, {
            params: {
                id
            }
        });
    }

    static fetchStream(link) {
        const username = extractEndAlnum(link);
        const endpoint = this.getBackendAPIURL(RENDER_TYPES.STREAM);
        return axios.get(endpoint,{
            params: {
                username
            }
        });
    }

}