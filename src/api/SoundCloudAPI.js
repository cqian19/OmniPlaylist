/**
 * Created by cqian19 on 8/2/2017.
 */
import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

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
        super(DOMAIN_TYPE);
        this.title = response.title;
        this.thumbnail = response.artwork_url;
        this.linkId = this._prepareUrl(response.stream_url);
        this.duration = response.duration;
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
        const client_id = this._getDomainProps(DOMAIN_TYPE).key;
        return axios.get("http://api.soundcloud.com/resolve", {
            params: {
                url: link,
                client_id
            }
        });
    }

    static fetchPlaylist(link) {
        const client_id = this._getDomainProps(DOMAIN_TYPE).key;
        return axios.get("http://api.soundcloud.com/resolve", {
            params: {
                url: link,
                client_id
            }
        });
    }

}