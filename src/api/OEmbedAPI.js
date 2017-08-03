/**
 * Created by cqian19 on 8/2/2017.
 */

import axios from 'axios';

import BaseAPI from './BaseAPI';
import BaseVideo from './BaseVideo';
import { DOMAIN_PROPS } from '../core/domain-map-constants';

export class OEmbedVideo extends BaseVideo {

    constructor(videoResponse, domainType) {
        super();
        this.title = videoResponse.title;
        this.domainType = domainType;
        this.linkId = videoResponse.video_id;
        // Replace with placeholder thumbnail
        this.thumbnail = videoResponse.thumbnail_url ? decodeURIComponent(videoResponse.thumbnail_url) : "";
        this.html = videoResponse.html;
    }
}

export class OEmbedAPI extends BaseAPI {

    static _getDomainProps(domainType) {
        return DOMAIN_PROPS[domainType];
    }

    static _isVideoLink(link, domainType){
        const props = this._getDomainProps(domainType);
        for (let linkRegex of props.OEmbedLinks) {
            if (linkRegex.test(link)) {
                return true;
            }
        }
        return false;
    };

    static getVideoFromResponse(response, domainType) {
        return new OEmbedVideo(response, domainType);
    }

    static getRenderType(link, domainType){
        if (this._isVideoLink(link, domainType)) {
            return this.RENDER_TYPES.VIDEO;
        } else {
            return this.RENDER_TYPES.INVALID;
        }
    };

    static fetchVideo(link, domainType) {
        const props = this._getDomainProps(domainType);
        const endpoint = props.OEmbedEndpoint;
        return axios.get(endpoint, {
            params: {
                url: encodeURI(link),
                format: 'json',
                autoplay: true,
                auto_play: true
            }
        })
    }

}