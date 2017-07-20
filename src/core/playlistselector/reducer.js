/**
 * Created by cqian19 on 7/13/2017.
 */

import {
    getStateSelectedPlaylistIndex
} from './selectors';
import {
    ON_PLAYLIST_REMOVE,
    ON_PLAYLIST_SELECTED_CHANGE
} from '../constants';

const defaultState = {
    playlistIndex: null,
    indexValid: false,
};


export function playlistSelectorReducer(state=defaultState, action) {
    switch(action.type) {
        case ON_PLAYLIST_REMOVE:
            return onPlaylistRemove(state, action);
        case ON_PLAYLIST_SELECTED_CHANGE:
            return onPlaylistSelectedChange(state, action);
        default:
            return state;
    }
}

function onPlaylistRemove(state, action) {
    let indexValid, playlistIndex;
    const removedPlaylistIndex = action.playlistIndex;
    const curPlaylistIndex = getStateSelectedPlaylistIndex(state);
    console.log(curPlaylistIndex);
    if (curPlaylistIndex === null || removedPlaylistIndex > curPlaylistIndex) {
        return {...state};
    } else if (removedPlaylistIndex === curPlaylistIndex) {
        indexValid = false;
        playlistIndex = null;
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