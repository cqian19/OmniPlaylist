/**
 * Created by cqian19 on 7/13/2017.
 */

import { ON_PLAYLIST_SELECTED_CHANGE } from '../constants';

const defaultState = {
    selectedPlaylist: null
};

export function playlistSelectorReducer(state=defaultState, action) {
    switch(action.type) {
        case ON_PLAYLIST_SELECTED_CHANGE:
            return {...state, selectedPlaylist: action.playlist};
        default:
            return state;
    }
}