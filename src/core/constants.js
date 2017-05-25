/**
 * Created by cqian19 on 5/21/2017.
 */


/* ENUMS */

// Determines domain of video and how it should be played
export const DOMAIN_TYPES = {
    'YOUTUBE': 'YOUTUBE'
};



// Determines if link is to a playlist or to a video, or to neither
export const RENDER_TYPES = {
    'INVALID': 'INVALID',
    'VIDEO': 'VIDEO',
    'PLAYLIST': 'PLAYLIST'
};

/* CONSTANTS */
export const APP_TITLE = 'Youtube Playlist Manager';
export const NAVS = ["Play", "Playlists"];


/* ACTION TYPES */
export const APP_LOAD = 'APP_LOAD';

export const LINK_FAILED = 'LINK_FAILED';
export const ADD_PLAYLIST_SUCCESS = 'ADD_PLAYLIST_SUCCESS';
export const ADD_VIDEO_SUCCESS = 'ADD_VIDEO_SUCCESS';
export const IMPORT_SUCCESS = 'IMPORT_SUCCESS';
export const IMPORT_FAILED = 'IMPORT_FAILED';
export const RESET_IMPORT_FORM ='RESET_IMPORT_FORM';

export const ON_VIDEO_PREV = 'ON_VIDEO_PREV';
export const ON_VIDEO_SKIP = 'ON_VIDEO_SKIP';
export const ON_VIDEO_END = 'ON_VIDEO_END';
export const ON_VIDEO_SWITCH = 'ON_VIDEO_SWITCH';
export const ON_PLAYLIST_CHANGE = 'ON_PLAYLIST_CHANGE';