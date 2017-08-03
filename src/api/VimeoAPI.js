/**
 * Created by cqian19 on 6/1/2017.
 */
import axios from 'axios';

import { OEmbedAPI, OEmbedVideo } from './OEmbedAPI';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';
import { extractEndNumbers } from './utils';

/** API reference:
 * @link https://developer.vimeo.com/apis/oembed/
 * @link https://developer.vimeo.com/api/endpoints/albums
*/

const DOMAIN_TYPE = DOMAIN_TYPES.VIMEO;
const key = "";

export class VimeoVideo extends OEmbedVideo {

    constructor(videoResponse, renderType) {
        super(videoResponse, renderType);
        this.domainType = DOMAIN_TYPE;
        if (renderType === RENDER_TYPES.PLAYLIST) { // Response from album get
            this.title = videoResponse.name;
            this.linkId = extractEndNumbers(videoResponse.link);
            this.thumbnail = videoResponse.pictures.sizes[0].link;
        }
    }
}

export class VimeoAPI extends OEmbedAPI {

    static urlPlaylistPattern = /^(?:https?:\/\/)?(?:w{3}\.)?vimeo\.com\/album\/[0-9]+$/;

    static _isPlaylistLink(link){
        return this.urlPlaylistPattern.test(link);
    };

    static getRenderType(link, domainType){
        const renderType = this._isVideoLink(link, domainType)    ? RENDER_TYPES.VIDEO
                        : (this._isPlaylistLink(link, domainType) ? RENDER_TYPES.PLAYLIST
                                                                  : RENDER_TYPES.INVALID);
        return renderType;
    };

    static getVideoFromResponse(response){
        return new VimeoVideo(response.data, RENDER_TYPES.VIDEO);
    };

    static getPlaylistFromResponse(response){
        return response.data.map((videoResponse) =>
            new VimeoVideo(videoResponse, RENDER_TYPES.PLAYLIST)
        )
    };

    static fetchPlaylist(link) {
        // Untested
        const albumId = extractEndNumbers(link);
        return axios.get(`https://api.vimeo.com/albums/${albumId}/videos`, {
            params: {
                access_token: key
            }
        });
    }
}