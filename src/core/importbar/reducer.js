/**
 * Created by cqian19 on 5/21/2017.
 */

import {
    LINK_FAILED,
    IMPORT_SUCCESS,
    IMPORT_FAILED,
    IMPORT_START,
    RESET_IMPORT_FORM,
} from '../constants';

const defaultState = {
    'error': '',
    'importing': false,
    'validationState': null
};

export function importbarReducer(state = defaultState, action) {

    switch(action.type) {
        case LINK_FAILED:
            return {...state, error: 'URL not matched to any supported websites.', validationState: 'error'};
        case IMPORT_START:
            return {...state, importing: true};
        case IMPORT_SUCCESS:
            return {...state, error: 'Import success', importing: false, validationState: 'success'};
        case IMPORT_FAILED:
            return {...state, error: 'Website recognized but playlist/video retrieval failed. Double check the URL.',
                        importing: false, validationState: 'error'};
        case RESET_IMPORT_FORM:
            return {...state, error: '', importing: false, validationState: null};
        default:
            return state;
    }
}