/**
 * Created by cqian19 on 5/21/2017.
 */

import { initializeNavs } from './utils'

const defaultState = {
    navs: initializeNavs()
};

export function navbarReducer(state = defaultState, action) {
    switch (action.type) {
        default :
            return state;
    }
}