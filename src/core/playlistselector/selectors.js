/**
 * Created by cqian19 on 7/13/2017.
 */

export function getPlaylistSelectorReducer(store) {
    return store.playlistSelector;
}

export function getSelectedPlaylist(store) {
    return getPlaylistSelectorReducer(store).selectedPlaylist;
}