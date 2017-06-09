/**
 * Created by cqian19 on 6/5/2017.
 */

import { ON_SIDEBAR_TOGGLE } from '../constants';
import { getPlaylistIndex, onPlaylistSwitch } from '../playlist';

export function onSidebarToggle() {
    return {
        type: ON_SIDEBAR_TOGGLE
    }
}

export function onSidebarItemClick(index) {
    return (dispatch, getState) => {
        if (getPlaylistIndex(getState()) !== index) {
            dispatch(onPlaylistSwitch(index));
        }
    }
}