/**
 * Created by cqian19 on 5/22/2017.
 */

import {
    ADD_PLAYLIST_SUCCESS,
    ADD_VIDEO_SUCCESS,
    ON_VIDEO_ADD,
    ON_VIDEO_MOVE,
    ON_VIDEO_REMOVE,
    ON_VIDEO_SWITCH,
    ON_VIDEO_END,
    ON_VIDEO_SKIP,
    ON_VIDEO_PREV,
    ON_VIDEO_ACTION_FAILED,
    ON_PLAYER_RELOAD,
    ON_PLAYLIST_MAKE,
    ON_PLAYLIST_REMOVE,
    ON_PLAYLIST_CHANGE,
    ON_PLAYLIST_NAME_CHANGE
} from '../constants';
import Playlist from '../classes/Playlist';
import {
    getStateVideos,
    getStateIndex,
    getStatePlaylists,
    getStatePlaylistIndex,
} from '.';
import * as rfuncs from './utils';

const defaultState = {
    index: 0,
    playlists: [],
    playlistIndex: 0,
    reload: false,
    videos: [],
};

function onAddPlaylistSuccess(state, action) {
    let playlists, playlistIndex;
    const { index, playlist, videos } = action;
    playlists = getStatePlaylists(state).concat([playlist]);
    playlistIndex = playlists.length - 1;
    return {...state, videos, index, playlists, playlistIndex, reload: true};
}

function onAddVideoSuccess(state, action) {
    // Current behavior is to push video to playlist, go to index of pushed video
    let index, videos, playlists;
    const { playlistIndex } = action;
    videos = getStateVideos(state).concat([action.video]);
    index = videos.length - 1;
    playlists = rfuncs.changePlaylistVideos(getStatePlaylists(state), playlistIndex, videos);
    return {...state, videos, index, playlists, reload: true};
}

function onVideoAdd(state, action) {
    return {...state};
}

function onVideoMove(state, action) {
    let   index, videos, playlists;
    const { startIndex, endIndex, playlistIndex } = action;
    const curIndex      = getStateIndex(state),
          curPlaylists  = getStatePlaylists(state),
          curPlaylist   = curPlaylists[playlistIndex],
          curVideos     = curPlaylist.videos,
          curPlaylistIndex  = getStatePlaylistIndex(state),
          isCurrentPlaylist = playlistIndex === curPlaylistIndex;
    // Update the current playing video's index if current playlist is modified
    if (isCurrentPlaylist) {
        index = rfuncs.chooseAfterMoveIndex(startIndex, endIndex, curIndex);
    }
    videos = rfuncs.makeNewVideoOrdering(startIndex, endIndex, curVideos);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
    return {...state, index, playlists, ...isCurrentPlaylist && { index, videos }};
}

function onVideoRemove(state, action) {
    let index, playlists, reload, videos;
    const { playlistIndex } = action;
    const curIndex     = getStateIndex(state),
          curPlaylists = getStatePlaylists(state),
          curPlaylist  = curPlaylists[playlistIndex],
          curVideos    = getStateVideos(state),
          removeIndex  = action.index,
          curPlaylistIndex  = getStatePlaylistIndex(state),
          isCurrentPlaylist = playlistIndex === curPlaylistIndex;
    index  = rfuncs.chooseAfterRemoveIndex(curVideos, removeIndex, curIndex);
    reload = curIndex === removeIndex;
    videos = rfuncs.removeAtIndex(curVideos, removeIndex);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, curPlaylistIndex, videos);
    return {...state, playlists, reload, ...isCurrentPlaylist && { index, videos }};
}

function onVideoSwitch(state, action) {
    const { index }= action;
    return {...state, index, reload: true};
}

function onVideoNext(state, action) {
    const curVideos = getStateVideos(state),
          curIndex  = getStateIndex(state),
          index = rfuncs.nextVideoIndex(curVideos, curIndex);
    return {...state, index};
}

function onVideoPrev(state, action) {
    const curVideos = getStateVideos(state),
          curIndex  = getStateIndex(state),
          index = rfuncs.prevVideoIndex(curVideos, curIndex);
    return {...state, index};
}

function onPlayerReload(state, action) {
    return {...state, reload: false};
}

function onPlaylistMake(state, action) {
    let index, playlists, playlistIndex, videos;
    const curPlaylists = getStatePlaylists(state);
    index = 0;
    playlists = curPlaylists.concat([[]]);
    playlistIndex = playlists.length - 1;
    videos = [];
    return {...state, index, playlists, videos, reload: true};
}

function onPlaylistRemove(state, action) {
    let playlists, playlistIndex, reload, videos;
    const curPlaylists        = getStatePlaylists(state),
          curPlaylistIndex    = getStatePlaylistIndex(state),
          removePlaylistIndex = action.playlistIndex,
          isCurrentPlaylist   = removePlaylistIndex === curPlaylistIndex;
    reload = isCurrentPlaylist;
    playlists = rfuncs.removeAtIndex(curPlaylists, removePlaylistIndex);
    playlistIndex = rfuncs.chooseAfterRemoveIndex(curPlaylists, removePlaylistIndex, curPlaylistIndex);
    videos = (playlists.length ? playlists[playlistIndex].videos : []);
    return {...state, playlists, playlistIndex, reload, ...isCurrentPlaylist && { videos }};
}

function onPlaylistChange(state, action) {
    let index, videos;
    const { playlistIndex } = action;
    const curPlaylists = getStatePlaylists(state);
    index  = 0;
    videos = curPlaylists[playlistIndex].videos;
    return {...state, videos, index, playlistIndex, reload: true};
}

function onPlaylistNameChange(state, action) {
    let playlists;
    const { playlistIndex, playlistName } = action;
    const curPlaylists = getStatePlaylists(state);
    playlists = rfuncs.changePlaylistName(curPlaylists, playlistIndex, playlistName);
    return {...state, playlists};
}

export function playlistReducer(state = defaultState, action) {
    switch(action.type) {
        case ADD_PLAYLIST_SUCCESS:
            return onAddPlaylistSuccess(state, action);
        case ADD_VIDEO_SUCCESS:
            return onAddVideoSuccess(state, action);
        case ON_VIDEO_ADD:
            return onVideoAdd(state, action);
        case ON_VIDEO_MOVE:
            return onVideoMove(state, action);
        case ON_VIDEO_REMOVE:
            return onVideoRemove(state, action);
        case ON_VIDEO_SWITCH:
            return onVideoSwitch(state, action);
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            return onVideoNext(state, action);
        case ON_VIDEO_PREV:
            return onVideoPrev(state, action);
        case ON_PLAYER_RELOAD:
            return onPlayerReload(state, action);
        case ON_PLAYLIST_MAKE:
            return onPlaylistMake(state, action);
        case ON_PLAYLIST_REMOVE:
            return onPlaylistRemove(state, action);
        case ON_PLAYLIST_CHANGE:
            return onPlaylistChange(state, action);
        case ON_PLAYLIST_NAME_CHANGE:
            return onPlaylistNameChange(state, action);
        case ON_VIDEO_ACTION_FAILED:
        default:
            return state;
    }
}