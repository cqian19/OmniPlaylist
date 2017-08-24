/**
 * Created by cqian19 on 5/21/2017.
 */

import { APP_LOAD, TOGGLE_HIDE_EXTRA } from '../constants';

const defaultState = {
    hideExtra: false
};

export function appReducer (state=defaultState, action) {
    switch(action.type) {
        case TOGGLE_HIDE_EXTRA:
            return {...state, hideExtra: !state.hideExtra};
        default:
            return state;
    }
}