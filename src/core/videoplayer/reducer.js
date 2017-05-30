/**
 * Created by cqian19 on 5/29/2017.
 */

import { BASE_VIDEO_HEIGHT, BASE_VIDEO_WIDTH, ON_VIDEO_SAVE_SIZE } from '../constants';

const defaultState = {
    width: BASE_VIDEO_WIDTH,
    height: BASE_VIDEO_HEIGHT
};

export function videoplayerReducer(state=defaultState, action) {
    switch(action.type) {
        case ON_VIDEO_SAVE_SIZE:
            return {...state, width: action.width, height: action.height};
        default:
            return state;
    }
}