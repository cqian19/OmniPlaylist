/**
 * Created by cqian19 on 5/23/2017.
 */

import {
    ON_PLAYLIST_CHANGE,
    ON_VIDEO_END,
    ON_VIDEO_PREV,
    ON_VIDEO_SKIP,
    ON_VIDEO_SWITCH
} from '../constants';
import { getStateIndex } from '.';

export function onVideoClick(index) {
    return (dispatch, getState) => {
        // Video clicked in playlist is not currently playing
        if (getStateIndex(getState()) !== index) {
            dispatch(onVideoSwitch(index));
        }
    }
}
function onVideoSwitch(index) {
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