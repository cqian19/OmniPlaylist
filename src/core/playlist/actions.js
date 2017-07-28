/**
 * Created by cqian19 on 5/23/2017.
 */

import {
    ON_VIDEO_ADD,
    ON_VIDEO_MOVE,
    ON_VIDEO_REMOVE,
    ON_VIDEO_END,
    ON_VIDEO_PREV,
    ON_VIDEO_SKIP,
    ON_VIDEO_SWITCH,
    ON_VIDEO_ACTION_FAILED,
    ON_PLAYER_RELOAD,
    ON_PLAYLIST_MAKE,
    ON_PLAYLIST_MOVE,
    ON_PLAYLIST_REMOVE,
    ON_PLAYLIST_CHANGE,
    ON_PLAYLIST_NAME_CHANGE
} from '../constants';
import { getIndex, getVideos, getPlaylists } from '.';
import { onPlaylistSelectedChange } from '../playlistselector';

function _onVideoActionFail() {
    return {
        type: ON_VIDEO_ACTION_FAILED
    }
}

export function onVideoAdd(video, addIndex, playlistIndex) {
    return {
        type: ON_VIDEO_ADD,
        video: video.clone(),
        addIndex,
        playlistIndex
    }
}

export function onVideoMove(startIndex, endIndex, playlistIndex) {
    return {
        type: ON_VIDEO_MOVE,
        startIndex,
        endIndex,
        playlistIndex
    }
}

export function onVideoRemove(index, playlistIndex) {
    return {
        type: ON_VIDEO_REMOVE,
        index,
        playlistIndex
    }
}


export function onVideoClick(index) {
    return (dispatch, getState) => {
        // Video clicked in playlist is not currently playing
        if (getIndex(getState()) !== index) {
            dispatch(onVideoSwitch(index));
        }
    }
}

export function onVideoSwitch(index) {
    /* Play the video the user clicked */
    return {
        type: ON_VIDEO_SWITCH,
        index
    }
}

export function onVideoUpClick(startIndex, playlistIndex) {
    /* Up button on video is clicked, move this video before the previous one on the playlist */
    if (startIndex !== 0) {
        return onVideoMove(startIndex, startIndex - 1, playlistIndex);
    } else {
        return _onVideoActionFail();
    }
}

export function onVideoDownClick(startIndex, playlistIndex) {
    /* Down button on video is clicked, move this video after the next video */
    return (dispatch, getState) => {
        const playlistLength = getVideos(getState()).length;
        // Video is not last on the playlist, can be shifted down
        if (startIndex !== playlistLength - 1) {
            dispatch(onVideoMove(startIndex, startIndex + 1, playlistIndex));
        } else {
            dispatch(_onVideoActionFail());
        }
    };
}

export function onVideoSkip() {
    return {
        type: ON_VIDEO_SKIP,
    }
}

export function onVideoPrev() {
    return {
        type: ON_VIDEO_PREV,
    }
}

export function onVideoEnd() {
    return {
        type: ON_VIDEO_END,
    }
}

export function onPlaylistSwitch(index){
    return {
        type: ON_PLAYLIST_CHANGE,
        playlistIndex: index
    }
}

export function onPlaylistNameChange(playlistName, playlistIndex) {
    return {
        type: ON_PLAYLIST_NAME_CHANGE,
        playlistIndex,
        playlistName
    }
}

export function onPlaylistMake(swapPlay, select) {
    return (dispatch, getState) => {
        dispatch({type: ON_PLAYLIST_MAKE});
        const newPlaylistIndex = getPlaylists(getState()).length - 1;
        if (swapPlay) {
            dispatch(onPlaylistSwitch(newPlaylistIndex));
        }
        if (select) {
            dispatch(onPlaylistSelectedChange([], newPlaylistIndex));
        }
    }
}

export function onPlaylistMove(startIndex, endIndex) {
    return {
        type: ON_PLAYLIST_MOVE,
        playlistIndex: startIndex,
        startIndex,
        endIndex
    }
}

export function onPlaylistRemove(index) {
    return {
        type: ON_PLAYLIST_REMOVE,
        playlistIndex: index
    }
}

export function onPlayerReload() {
    return {
        type: ON_PLAYER_RELOAD
    }
}