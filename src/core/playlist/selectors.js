/**
 * Created by cqian19 on 5/22/2017.
 */

export function getPlaylistReducer(store){
    return store.playlist;
}

export function getVideos(store) {
    return getPlaylistReducer(store).videos;
}

export function getPlaylistIndex(store) {
    return getPlaylistReducer(store).playlistIndex
}

export function getIndex(store) {
    return getPlaylistReducer(store).index;
}

export function getPlaylists(store) {
    return getPlaylistReducer(store).playlists;
}

export function getStateIndex(state) {
    return state.index;
}

export function getStateVideos(state) {
    return state.videos;
}

export function getStatePlaylists(state) {
    return state.playlists;
}