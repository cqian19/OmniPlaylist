/**
 * Created by cqian19 on 5/23/2017.
 */

import { DOMAIN_PROPS } from '../core/domain-map-constants';
import { RENDER_TYPES, DOMAIN_TYPES } from '../core/constants';
import { OEmbedAPI } from './OEmbedAPI';

class APIHandler {

    static _getAPIFromDomain(domainType) {
        return DOMAIN_PROPS[domainType].API || OEmbedAPI;
    }

    static getRenderAndDomainType(link) {
        for (const domainType in DOMAIN_PROPS) {
            const API = this._getAPIFromDomain(domainType);
            const renderType = API.getRenderType(link, domainType);
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
                return API.getVideoFromResponse(response, domainType);
            case RENDER_TYPES.PLAYLIST:
                return API.getPlaylistFromResponse(response, domainType);
        }
    }

    static getPlaylistIndexFromLink(link, domainType) {
        return this._getAPIFromDomain(domainType).getPlaylistIndexFromLink(link) || 0;
    }

    static fetchVideos(link, renderType, domainType) {
        const API = this._getAPIFromDomain(domainType);
        switch(renderType) {
            case RENDER_TYPES.VIDEO:
                return API.fetchVideo(link, domainType);
            case RENDER_TYPES.PLAYLIST:
                return API.fetchPlaylist(link, domainType);
        }
    }
}

export default APIHandler;