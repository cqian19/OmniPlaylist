/**
 * Created by cqian19 on 8/5/2017.
 */
import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';
import { extractEndNumbers } from '../utils';

const DOMAIN_TYPE = DOMAIN_TYPES.USTREAM;
/**
 API reference:
 @link https://developers.soundcloud.com/docs/api/reference#tracks
 @link https://developers.soundcloud.com/docs/api/reference#playlists
 */

export class UstreamVideo extends BaseVideo {

    constructor(response, renderType) {
        super(DOMAIN_TYPE, renderType);
        this.title = response.title;
        this.thumbnail = response.thumbnail.default;
        this.linkId = this._createLink(response.url);
    }

    _createLink(url) {
        const id = extractEndNumbers(url);
        return `http://www.ustream.tv/embed/recorded/${id}`;
    }
}

export class UstreamAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(response) {
        return new UstreamVideo(response.data.video, RENDER_TYPES.VIDEO);
    }

    static fetchVideo(link) {
        const videoId = extractEndNumbers(link);
        return axios.get(`https://api.ustream.tv/videos/${videoId}.json`);
    }
}