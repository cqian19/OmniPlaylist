/**
 * Created by cqian19 on 5/29/2017.
 */
import { ON_VIDEO_SAVE_SIZE, ON_VIDEO_COLLAPSE_TOGGLE } from '../constants';

export function saveVideoSize({width, height}) {
    return {
        type: ON_VIDEO_SAVE_SIZE,
        width: width,
        height: height
    }
}

export function togglePlaylistCollapse(collapse) {
    return {
        type: ON_VIDEO_COLLAPSE_TOGGLE,
        collapse
    }
}