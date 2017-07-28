/**
 * Created by cqian19 on 7/13/2017.
 */

import {
    getStateSelectedPlaylistIndex
} from './selectors';
import {
    ON_PLAYLIST_MOVE,
    ON_PLAYLIST_MAKE,
    ON_PLAYLIST_REMOVE,
    ON_PLAYLIST_SELECTED_CHANGE
} from '../constants';

const defaultState = {
    playlistIndex: null,
    indexValid: false,
};


export function playlistSelectorReducer(state=defaultState, action) {
    switch(action.type) {
        case ON_PLAYLIST_MOVE:
            return onPlaylistMove(state, action);
        case ON_PLAYLIST_REMOVE:
            return onPlaylistRemove(state, action);
        case ON_PLAYLIST_SELECTED_CHANGE:
            return onPlaylistSelectedChange(state, action);
        default:
            return state;
    }
}

function onPlaylistMove(state, action) {
    let playlistIndex;
    const curPlaylistIndex = getStateSelectedPlaylistIndex(state);
    const { startIndex, endIndex } = action;
    // Moved playlist was selected
    if (curPlaylistIndex === startIndex) {
        playlistIndex = endIndex;
    // Playlist before selected playlist moved after selected playlist
    } else if (startIndex < curPlaylistIndex && endIndex >= curPlaylistIndex) {
        playlistIndex = curPlaylistIndex - 1;
    // Playlist after selected playlist moved before selected playlist
    } else if (startIndex > curPlaylistIndex && endIndex <= curPlaylistIndex) {
        playlistIndex = curPlaylistIndex + 1;
    } else {
        playlistIndex = curPlaylistIndex;
    }
    return {...state, playlistIndex}
}

function onPlaylistRemove(state, action) {
    let indexValid, playlistIndex;
    const removedPlaylistIndex = action.playlistIndex;
    const curPlaylistIndex = getStateSelectedPlaylistIndex(state);
    // Selected playlist index doesn't change
    if (curPlaylistIndex === null || removedPlaylistIndex > curPlaylistIndex) {
        return {...state};
    // Selected playlist is removed
    } else if (removedPlaylistIndex === curPlaylistIndex) {
        indexValid = false;
        playlistIndex = null;
    // Removed playlist is before selected playlist, subtract 1 from playlistIndex
    } else {
        indexValid = true;
        playlistIndex = curPlaylistIndex - 1;
    }
    return {...state, indexValid, playlistIndex};
}

function onPlaylistSelectedChange(state, action) {
    let indexValid;
    const { playlist, playlistIndex } = action;
    indexValid = playlist !== null;
    return {...state, indexValid, playlistIndex};
}