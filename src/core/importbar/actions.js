/**
 * Created by cqian19 on 5/21/2017.
 */

import axios from 'axios';
import { LINK_FAILED, IMPORT_PLAYLIST } from '../constants';

export function linkFailed() {
    return {
        type: LINK_FAILED
    }
}

export function importPlaylist(link) {
    return {
        type: IMPORT_PLAYLIST,
        link
    }
}