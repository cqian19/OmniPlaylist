/**
 * Created by cqian19 on 5/21/2017.
 */

import { LINK_FAILED, IMPORT_PLAYLIST } from '../constants';

const defaultState = {
    'error': null
};

export function importbarReducer(state = defaultState, action) {
    switch(action.type) {
        case LINK_FAILED:
            return {...state, error: 'Playlist link is invalid.'};
        case IMPORT_PLAYLIST:
            return {...state, link: action.link};
        default:
            return state;
    }
}