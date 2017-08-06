/**
 * Created by cqian19 on 8/5/2017.
 */
/**
 * Created by cqian19 on 8/2/2017.
 */
import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';
import { extractEndNumbers } from '../utils';

const DOMAIN_TYPE = DOMAIN_TYPES.USTREAM;
const client_id = '2f98992c40b8edf17423d93bda2e04ab';
/**
 API reference:
 @link https://developers.soundcloud.com/docs/api/reference#tracks
 @link https://developers.soundcloud.com/docs/api/reference#playlists
 */

export class UstreamVideo extends BaseVideo {

    constructor(response, renderType) {
        super(DOMAIN_TYPE);
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

    static _isVideoLink(link){
        return super._isVideoLink(link, DOMAIN_TYPE);
    };

    static _isPlaylistLink(link, domainType){
        return super._isPlaylistLink(link, DOMAIN_TYPE);
    };

    static getVideoFromResponse(response) {
        return new UstreamVideo(response.data.video, RENDER_TYPES.VIDEO);
    }

    static fetchVideo(link) {
        const videoId = extractEndNumbers(link);
        return axios.get(`https://api.ustream.tv/videos/${videoId}.json`);
    }
}