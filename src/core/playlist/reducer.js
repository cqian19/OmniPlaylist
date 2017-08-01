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
    ON_PLAYLIST_MOVE,
    ON_PLAYLIST_REMOVE,
    ON_PLAYLIST_CHANGE,
    ON_PLAYLIST_NAME_CHANGE,
    ON_PLAYLISTS_LOAD
} from '../constants';
import Playlist from '../classes/Playlist';
import {
    getStateVideos,
    getStateIndex,
    getStatePlaylists,
    getStatePlaylistIndex,
} from '.';
import { initializePlaylists } from './database';
import * as rfuncs from './utils';

const defaultState = {
    index: 0,
    playlists: initializePlaylists() && [],
    playlistIndex: 0,
    reload: false,
    videos: [],
};

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
        case ON_PLAYLIST_MOVE:
            return onPlaylistMove(state, stateItems, action);
        case ON_PLAYLIST_REMOVE:
            return onPlaylistRemove(state, stateItems, action);
        case ON_PLAYLIST_CHANGE:
            return onPlaylistChange(state, stateItems, action);
        case ON_PLAYLIST_NAME_CHANGE:
            return onPlaylistNameChange(state, stateItems, action);
        case ON_PLAYLISTS_LOAD:
            return onPlaylistsLoad(state, stateItems, action);
        case ON_VIDEO_ACTION_FAILED:
        default:
            return state;
    }
}

function generateStateItems(state, action) {
    const curIndex = getStateIndex(state),
          curPlaylists = getStatePlaylists(state),
          curPlaylistIndex = getStatePlaylistIndex(state),
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
    const { curPlaylistIndex, curVideos, curPlaylists } = stateItems;
    const { video } = action;
    // Create a new playlist if none
    if (!curPlaylists.length) {
        const newPlaylist = new Playlist([video], 0);
        videos = newPlaylist.videos;
        playlists = curPlaylists.concat([newPlaylist]);
    } else {
        videos = curVideos.concat([video]);
        playlists = rfuncs.changePlaylistVideos(curPlaylists, curPlaylistIndex, videos);
    }
    index = videos.length - 1;
    return {...state, videos, index, playlists, reload: true};
}

function onVideoAdd(state, stateItems, action) {
    let index, playlists, videos;
    const { curVideos, curIndex, curPlaylists, isCurrentPlaylist } = stateItems;
    const { video, addIndex, playlistIndex } = action;
    // Copy playlist and insert video into spot
    videos = curVideos.slice();
    videos.splice(addIndex, 0, video);
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
    videos = rfuncs.makeNewListOrdering(startIndex, endIndex, curVideos);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
    return {...state, playlists, ...isCurrentPlaylist && { index, videos }};
}

function onVideoRemove(state, stateItems, action) {
    let index, playlists, reload, videos;
    const { curVideos, curIndex, curPlaylists, curPlaylistIndex, isCurrentPlaylist } = stateItems;
    const { playlistIndex } = action;
    const removeIndex = action.index;
    index  = rfuncs.chooseAfterRemoveIndex(curVideos, removeIndex, curIndex);
    reload = curIndex === removeIndex;
    videos = rfuncs.removeAtIndex(curVideos, removeIndex);
    playlists = rfuncs.changePlaylistVideos(curPlaylists, playlistIndex, videos);
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

function onVideoPrev(state, stateItems, action) {
    const { curVideos, curIndex } = stateItems;
    const index = rfuncs.prevVideoIndex(curVideos, curIndex);
    return {...state, index};
}

function onPlayerReload(state, stateItems, action) {
    return {...state, reload: false};
}

function onPlaylistMake(state, stateItems, action) {
    let index, playlists, playlistIndex, videos;
    const { select } = action;
    const { curPlaylists } = stateItems;
    index = 0;
    playlists = curPlaylists.concat([new Playlist([], curPlaylists.length)]);
    playlistIndex = playlists.length - 1;
    videos = [];
    return {...state, playlists, ...select && {index, videos, reload: true}};
}

function onPlaylistMove(state, stateItems, action) {
    let playlistIndex, playlists;
    const { startIndex, endIndex } = action;
    const { curPlaylists, curPlaylistIndex, isCurrentPlaylist } = stateItems;
    if (isCurrentPlaylist) {
        playlistIndex = rfuncs.chooseAfterMoveIndex(startIndex, endIndex, curPlaylistIndex);
    }
    playlists = rfuncs.makeNewListOrdering(startIndex, endIndex, curPlaylists);
    rfuncs.updatePlaylistIndexes(playlists, startIndex, endIndex);
    return {...state, playlists, ...isCurrentPlaylist && { playlistIndex }};
}
function onPlaylistRemove(state, stateItems, action) {
    let playlists, playlistIndex, reload, videos;
    const { curPlaylists, curPlaylistIndex, isCurrentPlaylist } = stateItems;
    const removePlaylistIndex = action.playlistIndex;
    const playlist = curPlaylists[removePlaylistIndex];
    reload = isCurrentPlaylist;
    playlist.removeFromDb();
    playlists = rfuncs.removeAtIndex(curPlaylists, removePlaylistIndex);
    rfuncs.updatePlaylistIndexes(playlists, removePlaylistIndex, playlists.length - 1);
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

function onPlaylistsLoad(state, stateItems, action) {
    const { playlists } = action;
    return {...state, playlists, ...playlists.length && { videos: playlists[0].videos  }}
}