/**
 * Created by cqian19 on 7/28/2017.
 */

import store from '../store';
import PlaylistFactory from '../classes/PlaylistFactory';
import { onPlaylistsLoad } from './actions';
import { getDb } from '../../database';

export function initializePlaylists() {
    getDb().then((db) => {
        db.playlist.find().sort({ playlistIndex: 1 }).exec().then((playlistDocs) => {
            store.dispatch(onPlaylistsLoad(
                playlistDocs.map(PlaylistFactory.createPlaylistFromDbObject))
            );
        });
    });
    return [];
}