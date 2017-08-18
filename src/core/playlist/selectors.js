/**
 * Created by cqian19 on 5/22/2017.
 */

export function getPlaylistReducer(store){
    return store.playlist;
}

export function getIndex(store) {
    return getPlaylistReducer(store).index;
}

export function getPlaylists(store) {
    return getPlaylistReducer(store).playlists;
}

export function getPlaylistIndex(store) {
    return getPlaylistReducer(store).playlistIndex;
}

export function getVideos(store) {
    return getPlaylistReducer(store).videos;
}

export function getPlaylistCollapsed(store) {
    return getPlaylistReducer(store).collapsed;
}

export function getReload(store) {
    return getPlaylistReducer(store).reload;
}

export function getStateIndex(state) {
    return state.index;
}

export function getStatePlaylists(state) {
    return state.playlists;
}

export function getStatePlaylistIndex(state) {
    return state.playlistIndex;
}

export function getStateVideos(state) {
    return state.videos;
}