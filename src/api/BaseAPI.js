/**
 * Created by cqian19 on 5/23/2017.
 */

import { RENDER_TYPES } from '../core/constants';

/* An abstract class for APIs */
class BaseAPI {

    static RENDER_TYPES = RENDER_TYPES;

    static _isVideoLink(link){};
    static _isPlaylistLink(link){};
    static getRenderType(link, domainType){
        return this._isVideoLink(link, domainType)    ? RENDER_TYPES.VIDEO
            : (this._isPlaylistLink(link, domainType) ? RENDER_TYPES.PLAYLIST
                                                      : RENDER_TYPES.INVALID);
    };
    static getVideoFromResponse(response){};
    static getPlaylistFromResponse(response){};
    static getPlaylistIndexFromLink(link) {
        return 0;
    };
    static fetchPlaylist(link){};
    static fetchVideo(link){};

}

export default BaseAPI;