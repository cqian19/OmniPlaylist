/**
 * Created by cqian19 on 8/9/2017.
 */

import axios from 'axios';

import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';

import Playlist from '../core/classes/Playlist';
import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';
import defaultThumbnail from '../assets/images/facebook_icon.png';

const DOMAIN_TYPE = DOMAIN_TYPES.FACEBOOK;


export class FacebookVideo extends BaseVideo {

    constructor(link, renderType) {
        super(DOMAIN_TYPE);
        this.linkId = /\/\d+\//.exec(link)[0];
        this.title = "Facebook Video";
        this.thumbnail = defaultThumbnail;
    }

}

export class FacebookAPI extends BaseAPI {

    static DOMAIN_TYPE = DOMAIN_TYPE;

    static getVideoFromResponse(link) {
        return new FacebookVideo(link, RENDER_TYPES.VIDEO);
    }

    static fetchVideo(link) {
        return new Promise((resolve) => {
            resolve(link);
        });
    }

}