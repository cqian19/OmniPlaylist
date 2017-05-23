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
import { getVideos } from '.';

const defaultState = {
    videos: [],
    index: 0
};

function nextVideoIndex(index) {
    return index + 1;
}

function prevVideoIndex(index) {
    return Math.max(0, index - 1);
}

export function playlistReducer(state = defaultState, action) {
    switch(action.type) {
        case IMPORT_SUCCESS:
            return {...state, videos: action.videos};
        case ON_PLAYLIST_CHANGE:
        case ON_VIDEO_SWITCH:
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            return {...state, index: nextVideoIndex(action.index)};
        case ON_VIDEO_PREV:
            return {...state, index: prevVideoIndex(action.index)};
        default:
            return state;
    }
}