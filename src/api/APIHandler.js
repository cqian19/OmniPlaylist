/**
 * Created by cqian19 on 5/23/2017.
 */

import { DOMAIN_TO_API } from '../core/domain-map-constants';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';
import { YoutubeAPI } from '.';

const APIS = [
    YoutubeAPI
];

class APIHandler {

    static _getAPIFromDomain(domainType) {
        return DOMAIN_TO_API[domainType];
    }

    static getRenderAndDomainType(link) {
        for (const API of APIS) {
            let [renderType, domainType] = API.getRenderAndDomainType(link);
            if (renderType !== RENDER_TYPES.INVALID) {
                return [renderType, domainType];
            }
        }
        // Link is not a video or playlist in one of the supported APIs.
        return [RENDER_TYPES.INVALID, null];
    }

    static getVideosFromResponse(response, renderType, domainType) {
        const API = this._getAPIFromDomain(domainType);
        switch(renderType) {
            case RENDER_TYPES.VIDEO:
                return API.getVideoFromResponse(response);
            case RENDER_TYPES.PLAYLIST:
                return API.getPlaylistFromResponse(response);
        }
    }

    static getPlaylistIndexFromLink(link, domainType) {
        return this._getAPIFromDomain(domainType).getPlaylistIndexFromLink(link) || 0;
    }

    static fetchVideos(link, renderType, domainType) {
        const API = this._getAPIFromDomain(domainType);
        switch(renderType) {
            case RENDER_TYPES.VIDEO:
                return API.fetchVideo(link);
            case RENDER_TYPES.PLAYLIST:
                return API.fetchPlaylist(link);
        }
    }
}

export default APIHandler;