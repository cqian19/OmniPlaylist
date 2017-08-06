import axios from 'axios';

import BaseAPI  from './BaseAPI';
import BaseVideo from './BaseVideo';
import Playlist from '../core/classes/Playlist';
import { getUrlParams } from './utils';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

const DOMAIN_TYPE = DOMAIN_TYPES.YOUTUBE;
const key = "AIzaSyBFeCSptMDugs4MIx-GGD3JmwFz1IDyIGI";

/**
 * API reference:
 *  @link https://developers.google.com/youtube/v3/docs/playlistItems
 */

export class YoutubeVideo extends BaseVideo {

    constructor(videoResponse, renderType){
        super(DOMAIN_TYPE);
        this.title = videoResponse.snippet.title;
        this.thumbnail = videoResponse.snippet.thumbnails.default.url;
        // videoResponse.id of playlist items returns the playlist id, not the video id
        this.linkId = (renderType === RENDER_TYPES.VIDEO ?
                        videoResponse.id : videoResponse.snippet.resourceId.videoId);
    }
}

export class YoutubeAPI extends BaseAPI {

    static _isVideoLink(link){
        return super._isVideoLink(link, DOMAIN_TYPE);
    };

    static _isPlaylistLink(link, domainType){
        return super._isPlaylistLink(link, DOMAIN_TYPE);
    };

    static _isValidVideo(response) {
        // Private videos don't have a valid thumbnail
        return response.snippet.thumbnails;
    }

    static getRenderType(link){
        const renderType = this._isVideoLink(link)    ? RENDER_TYPES.VIDEO
                        : (this._isPlaylistLink(link) ? RENDER_TYPES.PLAYLIST
                                                      : RENDER_TYPES.INVALID);
        return renderType;
    };

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
        return axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
                part: 'snippet',
                id: this.getVideoIdFromLink(link),
                key
            }
        });
    };

    static fetchPlaylist(link) {
        // Assumes link is valid, returns a Promise
        /* Response form:
         --data
            --nextPageToken
            --prevPageToken
            --items
                 --[Objects]
                     --snippet
                         --title <-- Video title
                         --resourceId
                             -- videoId <-- videoplayer link id
                         --thumbnails
                         --default
                             --url <-- videoplayer thumbnail url
                    --id <-- playlist id*/
        return axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
                part: 'snippet',
                playlistId: this.getPlaylistIdFromLink(link),
                key,
                maxResults: 50
            }
        });
    }
}