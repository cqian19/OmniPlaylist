import axios from 'axios';

import BaseAPI  from './BaseAPI';
import BaseVideo from './BaseVideo';
import Playlist from '../core/classes/Playlist';
import { getUrlParams } from './utils';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

const DOMAIN_TYPE = DOMAIN_TYPES.YOUTUBE;

/**
 * API reference:
 *  @link https://developers.google.com/youtube/v3/docs/playlistItems
 */

export class YoutubeVideo extends BaseVideo {

    constructor(videoResponse, renderType){
        super(DOMAIN_TYPE, renderType);
        this.title = videoResponse.snippet.title;
        this.thumbnail = videoResponse.snippet.thumbnails.default.url;
        // videoResponse.id of playlist items returns the playlist id, not the video id
        this.linkId = (renderType === RENDER_TYPES.VIDEO ?
                        videoResponse.id : videoResponse.snippet.resourceId.videoId);
    }
}

export class YoutubeAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static _isValidVideo(response) {
        // Private videos don't have a valid thumbnail
        return response.snippet.thumbnails;
    }

    static getVideoIdFromLink(link) {
        return getUrlParams(link)['v'];
    }

    static getPlaylistIdFromLink(link) {
        return getUrlParams(link)['list'];
    };

    static getPlaylistIndexFromLink(link) {
        // Playlist index for Youtube starts at 1
        return getUrlParams(link)['index'] - 1 || 0;
    };

    static getVideoFromResponse(response){
        return new YoutubeVideo(response.data.items[0], RENDER_TYPES.VIDEO);
    };

    static getPlaylistFromResponse(response) {
        const videos = response.data.items.filter(this._isValidVideo).map(
            (videoResponse) => new YoutubeVideo(videoResponse, RENDER_TYPES.PLAYLIST)
        );
        return new Playlist(videos);
    }

    static fetchVideo(link){
        const endpoint = this.getBackendAPIURL(RENDER_TYPES.VIDEO);
        return axios.get(endpoint, {
            params: {
                id: this.getVideoIdFromLink(link)
            }
        });
    };

    static fetchPlaylist(link) {
        const key = this._getDomainProps(DOMAIN_TYPE).key;
        const endpoint = this.getBackendAPIURL(RENDER_TYPES.PLAYLIST);
        return axios.get(endpoint, {
            params: {
                playlistId: this.getPlaylistIdFromLink(link)
            }
        });
    }

}