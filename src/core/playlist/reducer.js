/**
 * Created by cqian19 on 5/22/2017.
 */

import {
    IMPORT_SUCCESS,
    ON_PLAYLIST_CHANGE,
    ON_VIDEO_SWITCH,
    ON_VIDEO_END,
    ON_VIDEO_SKIP,
    ON_VIDEO_PREV
} from '../constants';
import { getStateVideos } from '.';

const defaultState = {
    videos: [],
    index: 0
};

function nextVideoIndex(state, action) {
    const videoIndex = action.index;
    const videoLength = getStateVideos(state).length;
    return videoLength === 0 ? 0 : (videoIndex + 1) % videoLength;
}

function prevVideoIndex(state, action) {
    const videoIndex = action.index;
    const videoLength = getStateVideos(state).length;
    return videoLength === 0 ? 0 : (videoIndex + videoLength - 1);
}

export function playlistReducer(state = defaultState, action) {
    switch(action.type) {
        case IMPORT_SUCCESS:
            return {...state, videos: action.videos, index: action.index};
        case ON_PLAYLIST_CHANGE:
        case ON_VIDEO_SWITCH:
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            return {...state, index: nextVideoIndex(state, action)};
        case ON_VIDEO_PREV:
            return {...state, index: prevVideoIndex(state, action)};
        default:
            return state;
    }
}