/**
 * Created by cqian19 on 7/13/2017.
 */

export function getPlaylistSelectorReducer(store) {
    return store.playlistSelector;
}

export function getSelectedPlaylistIndex(store) {
    return getPlaylistSelectorReducer(store).playlistIndex;
}

export function getPlaylistValid(store) {
    return getPlaylistSelectorReducer(store).indexValid;
}

export function getStateSelectedPlaylistIndex(state) {
    return state.playlistIndex;
}