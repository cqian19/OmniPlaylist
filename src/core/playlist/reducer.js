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

function generateStateItems(state, action) {
    const curIndex     = getStateIndex(state),
          curPlaylists = getStatePlaylists(state),
          curPlaylistIndex  = getStatePlaylistIndex(state),
          playlistIndex = action.playlistIndex !== undefined ? action.playlistIndex : curPlaylistIndex,
          curPlaylist = curPlaylists[playlistIndex],
          curVideos   = curPlaylist ? curPlaylist.videos : getStateVideos(state),
          isCurrentPlaylist = playlistIndex === curPlaylistIndex;
    return {
        curIndex, curPlaylists, curPlaylist, curVideos, curPlaylistIndex, isCurrentPlaylist
    }
}

function onAddPlaylistSuccess(state, stateItems, action) {
    let playlists, playlistIndex;
    const { curPlaylists } = stateItems;
    const { index, playlist, videos } = action;
    playlists = curPlaylists.concat([playlist]);
    playlistIndex = playlists.length - 1;
    return {...state, videos, index, playlists, playlistIndex, reload: true};
}

function onAddVideoSuccess(state, stateItems, action) {
    // Current behavior is to push video to playlist, go to index of pushed video
    let index, videos, playlists;
    const { curVideos, curPlaylists } = stateItems;
    const { playlistIndex } = action;
    videos = curVideos.concat([action.video]);
    index = videos.length - 1;
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
    return {...state, videos, index, playlists, reload: true};
}

function onVideoAdd(state, stateItems, action) {
    let index, playlists, videos;
    const { curVideos, curIndex, curPlaylists, isCurrentPlaylist } = stateItems;
    const { video, addIndex, playlistIndex } = action;
    // Copy playlist and insert video into spot
    videos = curVideos.slice();
    videos.splice(addIndex, 0 , video);
    index = rfuncs.chooseAfterAddIndex(curIndex, addIndex);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
    return {...state, playlists, ...isCurrentPlaylist && { index, videos }};
}

function onVideoMove(state, stateItems, action) {
    let   index, videos, playlists;
    const { curIndex, curPlaylists, curVideos, isCurrentPlaylist } = stateItems;
    const { startIndex, endIndex, playlistIndex } = action;
    // Update the current playing video's index if current playlist is modified
    if (isCurrentPlaylist) {
        index = rfuncs.chooseAfterMoveIndex(startIndex, endIndex, curIndex);
    }
    videos = rfuncs.makeNewVideoOrdering(startIndex, endIndex, curVideos);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
    return {...state, index, playlists, ...isCurrentPlaylist && { index, videos }};
}

function onVideoRemove(state, stateItems, action) {
    let index, playlists, reload, videos;
    const { curVideos, curIndex, curPlaylists, curPlaylistIndex, isCurrentPlaylist } = stateItems;
    const { playlistIndex } = action;
    const removeIndex = action.index;
    index  = rfuncs.chooseAfterRemoveIndex(curVideos, removeIndex, curIndex);
    reload = curIndex === removeIndex;
    videos = rfuncs.removeAtIndex(curVideos, removeIndex);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, curPlaylistIndex, videos);
    return {...state, playlists, reload, ...isCurrentPlaylist && { index, videos }};
}

function onVideoSwitch(state, stateItems, action) {
    const { index }= action;
    return {...state, index, reload: true};
}

function onVideoNext(state, stateItems, action) {
    const { curVideos, curIndex } = stateItems;
    const index = rfuncs.nextVideoIndex(curVideos, curIndex);
    return {...state, index};
}

function onVideoPrev(stateItems, action) {
    const { curVideos, curIndex } = stateItems;
    const index = rfuncs.prevVideoIndex(curVideos, curIndex);
    return {...state, index};
}

function onPlayerReload(state, stateItems, action) {
    return {...state, reload: false};
}

function onPlaylistMake(stateItems, action) {
    let index, playlists, playlistIndex, videos;
    const { curPlaylists } = stateItems;
    index = 0;
    playlists = curPlaylists.concat([[]]);
    playlistIndex = playlists.length - 1;
    videos = [];
    return {...state, index, playlists, videos, reload: true};
}

function onPlaylistRemove(state, stateItems, action) {
    let playlists, playlistIndex, reload, videos;
    const { curPlaylists, curPlaylistIndex, isCurrentPlaylist } = stateItems;
    const removePlaylistIndex = action.playlistIndex;
    reload = isCurrentPlaylist;
    playlists = rfuncs.removeAtIndex(curPlaylists, removePlaylistIndex);
    playlistIndex = rfuncs.chooseAfterRemoveIndex(curPlaylists, removePlaylistIndex, curPlaylistIndex);
    videos = (playlists.length ? playlists[playlistIndex].videos : []);
    return {...state, playlists, playlistIndex, reload, ...isCurrentPlaylist && { videos }};
}

function onPlaylistChange(state, stateItems, action) {
    let index, videos;
    const { curPlaylists } = stateItems;
    const { playlistIndex } = action;
    index  = 0;
    videos = curPlaylists[playlistIndex].videos;
    return {...state, videos, index, playlistIndex, reload: true};
}

function onPlaylistNameChange(state, stateItems, action) {
    let playlists;
    const { curPlaylists } = stateItems;
    const { playlistIndex, playlistName } = action;
    playlists = rfuncs.changePlaylistName(curPlaylists, playlistIndex, playlistName);
    return {...state, playlists};
}

export function playlistReducer(state = defaultState, action) {
    const stateItems = generateStateItems(state, action);
    switch(action.type) {
        case ADD_PLAYLIST_SUCCESS:
            return onAddPlaylistSuccess(state, stateItems, action);
        case ADD_VIDEO_SUCCESS:
            return onAddVideoSuccess(state, stateItems, action);
        case ON_VIDEO_ADD:
            return onVideoAdd(state, stateItems, action);
        case ON_VIDEO_MOVE:
            return onVideoMove(state, stateItems, action);
        case ON_VIDEO_REMOVE:
            return onVideoRemove(state, stateItems, action);
        case ON_VIDEO_SWITCH:
            return onVideoSwitch(state, stateItems, action);
        case ON_VIDEO_SKIP : case ON_VIDEO_END:
            return onVideoNext(state, stateItems, action);
        case ON_VIDEO_PREV:
            return onVideoPrev(state, stateItems, action);
        case ON_PLAYER_RELOAD:
            return onPlayerReload(state, stateItems, action);
        case ON_PLAYLIST_MAKE:
            return onPlaylistMake(state, stateItems, action);
        case ON_PLAYLIST_REMOVE:
            return onPlaylistRemove(state, stateItems, action);
        case ON_PLAYLIST_CHANGE:
            return onPlaylistChange(state, stateItems, action);
        case ON_PLAYLIST_NAME_CHANGE:
            return onPlaylistNameChange(state, stateItems, action);
        case ON_VIDEO_ACTION_FAILED:
        default:
            return state;
    }
}