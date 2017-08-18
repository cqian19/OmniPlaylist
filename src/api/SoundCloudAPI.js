/**
 * Created by cqian19 on 8/2/2017.
 */
import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES, API_URL } from '../core/constants';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';

const DOMAIN_TYPE = DOMAIN_TYPES.SOUNDCLOUD;
/**
 API reference:
    @link https://developers.soundcloud.com/docs/api/reference#tracks
    @link https://developers.soundcloud.com/docs/api/reference#playlists
 */

export class SoundCloudVideo extends BaseVideo {

    constructor(response, renderType) {
        super(DOMAIN_TYPE, renderType);
        this.title = response.title;
        this.thumbnail = response.artwork_url;
        this.duration = response.duration;
        this.linkId = response.stream_url;
    }

    _prepareURL(url) {
        SoundCloudAPI.fetchKey().then((response) => {
            const client_id = response.data.key;
            this.linkId = `${url}?client_id=${client_id}`;
        });
    }
}

export class SoundCloudAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(response) {
        return new SoundCloudVideo(response.data, RENDER_TYPES.VIDEO);
    }

    static getPlaylistFromResponse(response){
        const videos = response.data.tracks.map((trackResponse) =>
            new SoundCloudVideo(trackResponse, RENDER_TYPES.PLAYLIST)
        );
        const playlistName = response.data.title;
        return new Playlist(videos, 0, playlistName);
    };

    static fetchVideo(link) {
        const endpoint = this.getBackendAPIURL(RENDER_TYPES.VIDEO);
        return axios.get(endpoint, {
            params: {
                url: link,
            }
        });
    }

    // Soundcloud resolves what is being retrieved, endpoint is the same
    static fetchPlaylist = SoundCloudAPI.fetchVideo;

}