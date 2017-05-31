/**
 * Created by cqian19 on 5/23/2017.
 */

import {
    ON_PLAYLIST_CHANGE,
    ON_VIDEO_UP_CLICK,
    ON_VIDEO_DOWN_CLICK,
    ON_VIDEO_END,
    ON_VIDEO_PREV,
    ON_VIDEO_SKIP,
    ON_VIDEO_SWITCH,
    ON_VIDEO_ACTION_FAILED
} from '../constants';
import { getIndex, getVideos } from '.';

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

export function onPlaylistSwitch(){
    return {
        type: ON_PLAYLIST_CHANGE
    }
}

export function onVideoUpClick(index) {
    /* Up button on video is clicked, move this video before the previous one on the playlist */
    if (index !== 0) {
        return {
            type: ON_VIDEO_UP_CLICK,
            index
        }
    } else {
        return {
            type: ON_VIDEO_ACTION_FAILED
        }
    }
}

export function onVideoDownClick(index) {
    /* Down button on video is clicked, move this video after the next video */
    return (dispatch, getState) => {
        const playlistLength = getVideos(getState()).length;
        // Video is not last on the playlist, can be shifted down
        if (index !== playlistLength - 1) {
            dispatch({
                type: ON_VIDEO_DOWN_CLICK,
                index
            });
        } else {
            dispatch({
                type: ON_VIDEO_ACTION_FAILED
            });
        }
    };
}

export function onVideoSkip(index) {
    return {
        type: ON_VIDEO_SKIP,
        index
    }
}

export function onVideoPrev(index) {
    return {
        type: ON_VIDEO_PREV,
        index
    }
}

export function onVideoEnd(index) {
    // @param index: the index of the video in the playlist that just ended
    return {
        type: ON_VIDEO_END,
        index
    }
}