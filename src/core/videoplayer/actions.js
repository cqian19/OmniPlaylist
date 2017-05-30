/**
 * Created by cqian19 on 5/29/2017.
 */
import { ON_VIDEO_SAVE_SIZE } from '../constants';

export function saveVideoSize({width, height}) {
    return {
        type: ON_VIDEO_SAVE_SIZE,
        width: width,
        height: height
    }
}