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
    ON_VIDEO_MOVE,
    ON_VIDEO_ACTION_FAILED
} from '../constants';
import { getStateVideos, getStateIndex, getStatePlaylists } from '.';

const defaultState = {
    playlists: [],
    videos: [],
    index: 0,
    playlistIndex: 0
};

function nextVideoIndex(state, action) {
    const videoIndex = getStateIndex(state);
    const videoLength = getStateVideos(state).length;
    return videoLength === 0 ? 0 : (videoIndex + 1) % videoLength;
}

function prevVideoIndex(state, action) {
    const videoIndex = getStateIndex(state);
    const videoLength = getStateVideos(state).length;
    return videoLength === 0 ? 0 : (videoIndex + videoLength - 1) % videoLength;
}

function swapUp(state, action) {
    const videos = getStateVideos(state).slice(); // Copy
    const index = action.startIndex; // Index of video to swap up
    [videos[index], videos[index - 1]] = [videos[index-1], videos[index]];
    return videos;
}

function swapDown(state, action) {
    const videos = getStateVideos(state).slice();
    const index = action.startIndex; // Index of video to swap down
    [videos[index], videos[index + 1]] = [videos[index + 1], videos[index]];
    return videos;
}

function chooseAfterMoveIndex(state, action) {
    const [startIndex, endIndex] = [action.startIndex, action.endIndex];
    const currentIndex = getStateIndex(state);
    if (startIndex === currentIndex) {
        // The current playing video was reordered, return its new index
        return endIndex;
    } else if (startIndex < currentIndex && endIndex >= currentIndex) {
        // The moved video was moved down past the currently playing video, move current playing video up
        return currentIndex - 1;
    } else if (startIndex > currentIndex && endIndex <= currentIndex) {
        // The moved video was moved up past the currently playing video, shift current playing video down
        return currentIndex + 1
    } else {
        // Current playing video index not affected
        return currentIndex;
    }
}

function makeNewVideoOrdering(state, action) {
    // Video moved from startIndex position to endIndex position
    const [startIndex, endIndex] = [action.startIndex, action.endIndex];
    const videos = getStateVideos(state);
    let newVideos;
    // Video moved down on playlist
    if(startIndex < endIndex) {
        newVideos = [].concat(
            videos.slice(0, startIndex), // Keep all videos up to where the video used to be
            videos.slice(startIndex + 1, endIndex + 1),  // Move these videos down
            [videos[startIndex]], // Insert moved video here
            videos.slice(endIndex + 1)); // Keep all remaining videos in their spot
    } else {
    // Video moved up on playlist
        newVideos = [].concat(
            videos.slice(0, endIndex), // Keep all videos up to the spot the video moved to
            [videos[startIndex]], // Insert video here
            videos.slice(endIndex, startIndex), // Insert all videos after, skipping the video that just moved
            videos.slice(startIndex+1)
        );
    }
    return newVideos;
}

export function playlistReducer(state = defaultState, action) {
    let videos, index, playlistIndex, playlists;
    switch(action.type) {
        case ADD_PLAYLIST_SUCCESS:
            videos = action.videos;
            index = action.index;
            playlists = getStatePlaylists(state).concat([action.playlist]);
            playlistIndex = playlists.length - 1;
            return {...state, videos, index, playlists, playlistIndex};
        case ADD_VIDEO_SUCCESS:
            // Current behavior is to push video to playlist, go to index of pushed video
            videos = getStateVideos(state).concat([action.video]);
            index = videos.length - 1;
            return {...state, videos, index};
        case ON_PLAYLIST_CHANGE:
            playlistIndex = action.playlistIndex;
            videos = getStatePlaylists(state)[playlistIndex].videos;
            index = 0;
            return {...state, videos, index, playlistIndex};
        case ON_VIDEO_UP_CLICK:
            videos = swapUp(state, action);
            index = chooseAfterMoveIndex(state, action);
            return {...state, videos, index};
        case ON_VIDEO_DOWN_CLICK:
            videos = swapDown(state, action);
            index = chooseAfterMoveIndex(state, action);
            return {...state, videos, index};
        case ON_VIDEO_SWITCH:
            return {...state, index: action.index};
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            index = nextVideoIndex(state, action);
            return {...state, index};
        case ON_VIDEO_PREV:
            index = prevVideoIndex(state, action);
            return {...state, index};
        case ON_VIDEO_MOVE:
            videos = makeNewVideoOrdering(state, action);
            index = chooseAfterMoveIndex(state, action);
            return {...state, videos, index};
        case ON_VIDEO_ACTION_FAILED:
        default:
            return state;
    }
}