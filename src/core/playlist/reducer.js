/**
 * Created by cqian19 on 5/22/2017.
 */

import { IMPORT_SUCCESS } from '../constants';

const defaultState = {
    videos: []
};

export function playlistReducer(state = defaultState, action) {
    switch(action.type) {
        case IMPORT_SUCCESS:
            return {...state, videos: action.videos};
        default:
            return state;
    }
}