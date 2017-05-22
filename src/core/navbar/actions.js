/**
 * Created by cqian19 on 5/21/2017.
 */

import { IMPORT_PLAYLIST } from '../constants';

export function importPlaylist(link) {
    return {
        type: IMPORT_PLAYLIST,
        data: link
    }
}