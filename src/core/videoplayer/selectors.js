/**
 * Created by cqian19 on 5/29/2017.
 */

export function getVideoPlayer(store) {
    return store.videoplayer;
}

export function getVideoWidth(store) {
    return getVideoPlayer(store).width;
}

export function getVideoHeight(store) {
    return getVideoPlayer(store).height;
}