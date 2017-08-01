/**
 * Created by cqian19 on 6/1/2017.
 */
import axios from 'axios';

import BaseAPI from './BaseAPI';
import BaseVideo from '../core/classes/BaseVideo';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

/* API reference:
 * https://developer.vimeo.com/apis/oembed/,
 * https://developer.vimeo.com/api/endpoints/albums */

const DOMAIN_TYPE = DOMAIN_TYPES.VIMEO;

export class VimeoVideo extends BaseVideo {

    constructor(videoResponse, renderType) {
        super();
        this.domainType = DOMAIN_TYPE;
        if (renderType === RENDER_TYPES.VIDEO) {
            this.title = videoResponse.title;
            this.linkId = videoResponse.video_id;
            this.thumbnail = decodeURIComponent(videoResponse.thumbnail_url);
            this.duration = videoResponse.duration;
        }
    }
}

export class VimeoAPI extends BaseAPI {

    static urlVideoPattern = /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/[0-9]+$/;

    static _isVideoLink(link){
        return this.urlVideoPattern.test(link);
    };
    static _isPlaylistLink(link){
        return false;
    };

    static getRenderAndDomainType(link){
        const renderType = this._isVideoLink(link) ? RENDER_TYPES.VIDEO
            : (this._isPlaylistLink(link) ? RENDER_TYPES.PLAYLIST : RENDER_TYPES.INVALID);
        return [renderType, DOMAIN_TYPE];
    };

    static getVideoFromResponse(response){
        return new VimeoVideo(response.data, RENDER_TYPES.VIDEO);
    };

    static getPlaylistFromResponse(response){};

    static fetchPlaylist(link){};
    static fetchVideo(link){
        return axios.get("https://vimeo.com/api/oembed.json", {
            params: {
                url: link
            }
        })
    };
}