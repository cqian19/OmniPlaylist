
import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';

import { extractEndAlnum } from '../utils';

const DOMAIN_TYPE = DOMAIN_TYPES.DAILYMOTION;

/**
 API reference:
     @link https://developer.dailymotion.com/api
     @link https://developer.dailymotion.com/api#fields-selection
 */
export class DailymotionVideo extends BaseVideo {

    constructor(response, renderType) {
        super(DOMAIN_TYPE);
        this.title = response.title;
        this.thumbnail = response.thumbnail_url;
        this.linkId = response.id;
        this.duration = response.duration * 1000;
    }

}

export class DailymotionAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(response) {
        return new DailymotionVideo(response.data, RENDER_TYPES.VIDEO);
    }

    static getPlaylistFromResponse(response){
        const videos = response.data.list.map((data) => {
            return new DailymotionVideo(data, RENDER_TYPES.PLAYLIST)
        });
        return new Playlist(videos);
    };

    static fetchVideo(link) {
        const id = extractEndAlnum(link);
        return axios.get(`https://api.dailymotion.com/video/${id}?fields=id,title,thumbnail_url,duration`);
    }

    static fetchPlaylist(link) {
        const idFinder = /\/playlist\/([0-9a-z]+)/;
        const id = idFinder.exec(link)[1];
        return axios.get(`https://api.dailymotion.com/playlist/${id}/videos?fields=id,title,thumbnail_url,duration`);
    }

}