/**
 * Created by cqian19 on 5/22/2017.
 */

export function getPlaylist(store){
    return store.playlist;
}

export function getVideos(store) {
    return getPlaylist(store).videos;
}

export function getIndex(store) {
    return getPlaylist(store).index;
}

export function getStateVideos(state) {
    console.log(state);
    return state.videos;
}