/**
 * Created by cqian19 on 5/20/2017.
 */

import { combineReducers } from 'redux';

import { headerReducer } from './header';
import { importbarReducer } from './importbar';
import { navbarReducer } from './navbar';
import { playlistReducer } from './playlist';
import { playlistSelectorReducer } from './playlistselector';
import { sidebarReducer } from './sidebar';
import { videoplayerReducer } from './videoplayer';

export default combineReducers({
    header: headerReducer,
    navbar: navbarReducer,
    importbar: importbarReducer,
    playlist: playlistReducer,
    playlistSelector: playlistSelectorReducer,
    sidebar: sidebarReducer,
    videoplayer: videoplayerReducer
})