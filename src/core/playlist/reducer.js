/**
 * Created by cqian19 on 5/22/2017.
 */

import {
    ADD_PLAYLIST_SUCCESS,
    ADD_VIDEO_SUCCESS,
    ON_PLAYLIST_CHANGE,
    ON_VIDEO_UP_CLICK,
    ON_VIDEO_DOWN_CLICK,
    ON_VIDEO_SWITCH,
    ON_VIDEO_END,
    ON_VIDEO_SKIP,
    ON_VIDEO_PREV,
    ON_VIDEO_ACTION_FAILED
} from '../constants';
import { getStateVideos, getStateIndex } from '.';

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

function swapUp(state, action) {
    const videos = getStateVideos(state).slice(); // Copy of videos
    const index = action.index; // Index of video to swap up
    [videos[index], videos[index-1]] = [videos[index-1], videos[index]];
    return videos;
}

function swapDown(state, action) {
    const videos = getStateVideos(state).slice(); // Copy of videos
    const index = action.index; // Index of video to swap down
    [videos[index], videos[index+1]] = [videos[index+1], videos[index]];
    return videos;
}

function chooseUpIndex(state, action) {
    const swapIndex = action.index;
    const currentIndex = getStateIndex(state);
    if (swapIndex === currentIndex) {
        // Video has been moved up playlist
        return currentIndex - 1;
    } else if (swapIndex === currentIndex + 1) {
        // The next video has been moved up, so our index for this video increases
        return currentIndex + 1;
    }
    return currentIndex;
}

function chooseDownIndex(state, action) {
    const swapIndex = action.index;
    const currentIndex = getStateIndex(state);
    if (swapIndex === currentIndex) {
        // Video has been moved down
        return currentIndex + 1;
    } else if (swapIndex === currentIndex - 1) {
        // The previous video has been moved down, so our index for this video decreases
        return currentIndex - 1;
    }
    return currentIndex;
}

export function playlistReducer(state = defaultState, action) {
    let videos, index;
    switch(action.type) {
        case ADD_PLAYLIST_SUCCESS:
            return {...state, videos: action.videos, index: action.index};
        case ADD_VIDEO_SUCCESS:
            /* Current behavior is to push video to playlist, go to index of pushed video */
            videos = getStateVideos(state);
            return {...state, videos: videos.concat([action.video]), index: videos.length};
        case ON_PLAYLIST_CHANGE:
        case ON_VIDEO_UP_CLICK:
            videos = swapUp(state, action);
            index = chooseUpIndex(state, action);
            return {...state, videos, index:index};
        case ON_VIDEO_DOWN_CLICK:
            videos = swapDown(state, action);
            index = chooseDownIndex(state, action);
            return {...state, videos, index:index};
        case ON_VIDEO_SWITCH:
            return {...state, index: action.index};
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            index = nextVideoIndex(state, action);
            return {...state, index};
        case ON_VIDEO_PREV:
            index = prevVideoIndex(state, action);
            return {...state, index};
        case ON_VIDEO_ACTION_FAILED:
        default:
            return state;
    }
}