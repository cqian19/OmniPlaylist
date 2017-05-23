/**
 * Created by cqian19 on 5/21/2017.
 */

import { LINK_FAILED, IMPORT_SUCCESS, IMPORT_FAILED, RESET_IMPORT_FORM } from '../constants';

const defaultState = {
    'error': '',
    'validationState': null
};

export function importbarReducer(state = defaultState, action) {

    switch(action.type) {
        case LINK_FAILED:
            return {...state, error: 'Playlist link is invalid.', validationState: 'error'};
        case IMPORT_SUCCESS:
            return {...state, error: '', validationState: 'success'};
        case IMPORT_FAILED:
            return {...state, error: 'Playlist retrieval failed. Does the playlist exist?', validationState: 'error'};
        case RESET_IMPORT_FORM:
            return {...state, error: '', validationState: null};
        default:
            return state;
    }
}