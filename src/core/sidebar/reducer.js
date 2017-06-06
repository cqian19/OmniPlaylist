/**
 * Created by cqian19 on 6/5/2017.
 */

import { ON_SIDEBAR_TOGGLE } from '../constants';
import { getStateToggled } from '.';

const defaultState = {
    toggled: false
};

export function sidebarReducer(state=defaultState, action) {
    switch(action.type) {
        case ON_SIDEBAR_TOGGLE:
            console.log(getStateToggled(state));
            return {...state, toggled: !getStateToggled(state)};
        default:
            return state
    }
}