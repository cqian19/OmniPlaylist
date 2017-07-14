/**
 * Created by cqian19 on 7/13/2017.
 */

import { ON_PLAYLIST_SELECTED_CHANGE } from '../constants';

export function onPlaylistSelectedChange(playlist) {
    return {
        type: ON_PLAYLIST_SELECTED_CHANGE,
        playlist
    };
}