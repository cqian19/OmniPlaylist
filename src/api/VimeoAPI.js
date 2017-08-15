/**
 * Created by cqian19 on 6/1/2017.
 */
import axios from 'axios';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';
import { extractEndNumbers } from '../utils';

/** API reference:
 * @link https://developer.vimeo.com/apis/oembed/
 * @link https://developer.vimeo.com/api/endpoints/albums
*/

const DOMAIN_TYPE = DOMAIN_TYPES.VIMEO;

export class VimeoVideo extends BaseVideo {

    constructor(videoResponse, renderType) {
        super(DOMAIN_TYPE, renderType);
        this.duration = videoResponse.duration * 1000;
        if (renderType === RENDER_TYPES.VIDEO) { // Response from album get
            this.title = videoResponse.title;
            this.linkId = videoResponse.video_id;
            // Replace with placeholder thumbnail
            this.thumbnail = videoResponse.thumbnail_url ? decodeURIComponent(videoResponse.thumbnail_url) : ""
        } else {
            this.title = videoResponse.name;
            this.linkId = extractEndNumbers(videoResponse.link);
            this.thumbnail = videoResponse.pictures.sizes[0].link;
        }
    }
}

export class VimeoAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(response){
        return new VimeoVideo(response.data, RENDER_TYPES.VIDEO);
    };

    static getPlaylistFromResponse(response){
        const videos =  response.data.map((videoResponse) =>
            new VimeoVideo(videoResponse, RENDER_TYPES.PLAYLIST)
        );
        return new Playlist(videos);
    };

    static fetchVideo(link) {
        return axios.get("https://vimeo.com/api/oembed.json", {
            params: {
                url: link
            }
        })
    }

    static fetchPlaylist(link) {
        // Untested
        const key = this._getDomainProps(DOMAIN_TYPE).key;
        const albumId = extractEndNumbers(link);
        return axios.get(`https://api.vimeo.com/albums/${albumId}/videos`, {
            params: {
                access_token: key
            }
        });
    }
}