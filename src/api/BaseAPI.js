/**
 * Created by cqian19 on 5/23/2017.
 */

import { RENDER_TYPES } from '../core/constants';

/* An abstract class for APIs */
class BaseAPI {

    static RENDER_TYPES = RENDER_TYPES;

    static _isVideoLink(link){};
    static _isPlaylistLink(link){};
    static getRenderAndDomainType(link){};
    static getVideoFromResponse(response){};
    static getPlaylistFromResponse(response){};
    static getPlaylistIndexFromLink(link) {
        return 0;
    };
    static fetchPlaylist(link){};
    static fetchVideo(link){};

}

export default BaseAPI;