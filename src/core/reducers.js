/**
 * Created by cqian19 on 5/20/2017.
 */

import { combineReducers } from 'redux';

import { appReducer } from './app';
import { importbarReducer } from './importbar';
import { navbarReducer } from './navbar';
import { playlistReducer } from './playlist';
import { playlistSelectorReducer } from './playlistselector';
import { sidebarReducer } from './sidebar';
import { videoplayerReducer } from './videoplayer';

export default combineReducers({
    app: appReducer,
    navbar: navbarReducer,
    importbar: importbarReducer,
    playlist: playlistReducer,
    playlistSelector: playlistSelectorReducer,
    sidebar: sidebarReducer,
    videoplayer: videoplayerReducer
})