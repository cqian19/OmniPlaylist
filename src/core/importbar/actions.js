/**
 * Created by cqian19 on 5/21/2017.
 */

import {
    RENDER_TYPES,
    LINK_FAILED,
    ADD_PLAYLIST_SUCCESS,
    ADD_VIDEO_SUCCESS,
    IMPORT_SUCCESS,
    IMPORT_FAILED,
    RESET_IMPORT_FORM
} from '../constants';
import { getPlaylists,  onPlaylistMake, onVideoAdd } from '../playlist';
import Playlist from '../classes/Playlist';
import  APIHandler from '../../api/APIHandler';

export function resetForm() {
    return {
        type: RESET_IMPORT_FORM
    }
}

function importSuccess(){
    return {
        type: IMPORT_SUCCESS,
    }
}

function importError(){
    /* Request for video/playlist failed */
    return {
        type: IMPORT_FAILED
    }
}

function linkFailed() {
    /* Link fails to match the format of links to a video or playlist of all the supported APIs */
    return {
        type: LINK_FAILED
    }
}

export function doImport(link) {
    let [ renderType, domainType ] = APIHandler.getRenderAndDomainType(link);
    if (renderType === RENDER_TYPES.INVALID) {
        return linkFailed();
    } else {
        return importVideos(link, renderType, domainType);
    }
}

function importVideos(link, renderType, domainType) {
    return function(dispatch) {
        return APIHandler.fetchVideos(link, renderType, domainType).then(
            (response) => {
                dispatch(importSuccess());
                switch(renderType) {
                    case RENDER_TYPES.VIDEO:
                        dispatch(addVideo(link, response, domainType));
                        break;
                    case RENDER_TYPES.PLAYLIST:
                        dispatch(addPlaylist(link, response, domainType));
                        break;
                }
            },
            error => dispatch(importError(error))
        )
    }
}

function addPlaylist(link, response, domainType) {
    const playlist = APIHandler.getVideosFromResponse(response, RENDER_TYPES.PLAYLIST, domainType);
    const index = APIHandler.getPlaylistIndexFromLink(link, domainType);
    return {
        type: ADD_PLAYLIST_SUCCESS,
        index,
        playlist,
        videos: playlist.videos
    }
}

function addVideo(link, response, domainType) {
    const video = APIHandler.getVideosFromResponse(response, RENDER_TYPES.VIDEO, domainType);
    return {
        type: ADD_VIDEO_SUCCESS,
        video
    }
}
